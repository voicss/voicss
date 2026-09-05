import type { RuleContext, RuleDefinition } from '@eslint/core'
import type { TSESLint, TSESTree } from '@typescript-eslint/utils'

const PREFIX = 'css\n'
const IGNORE_REGEX = /(?:\/\*[\s\S]*?\*\/)|(?:\/\/.*)|("(?:\\.|[^"\\])*")|('(?:\\.|[^'\\])*')/g

export const indent: RuleDefinition = {
	meta: {
		fixable: 'code',
		messages: { incorrectIndentation: 'Incorrect indentation' },
	},
	create(context) {
		if (!('text' in context.sourceCode)) return {}
		const source = context.sourceCode.text
		return {
			UnaryExpression(node) {
				if (node.operator !== 'void' || (node.argument.type as string) !== 'TemplateLiteral') return
				const startLineOffset = source.lastIndexOf('\n', node.range[0]) + 1
				const outerIndent = getIndent(source.slice(startLineOffset, node.range[0])).length
				report(node.argument as TSESTree.TemplateLiteral, context, source, outerIndent)
			},
		} satisfies TSESLint.RuleListener
	},
}

function report(node: TSESTree.TemplateLiteral, context: RuleContext, source: string, outerIndent: number) {
	if (node.quasis.length !== 1) return
	const { value: { raw }, range } = node.quasis[0]

	if (!raw.startsWith(PREFIX)) return

	const [, firstRealLine = ''] = raw.split('\n', 2)
	const innerIndent = getIndent(firstRealLine).length

	let charOffset = range[0] + 1 + PREFIX.length
	const lineOffset = source.slice(0, charOffset).split('\n').length - 1

	const lines = raw.slice(PREFIX.length).split('\n')
	if (lines.length < 2) return

	const indentStyle = '\t'
	let level = innerIndent
	let parenLevel = 0
	let isMultilineDeclaration = false

	for (const [index, line] of lines.entries()) {
		const i = index + 1
		const isLastLine = i === lines.length
		const trimmed = line.trim()

		if ((!trimmed && !isLastLine) || trimmed.startsWith('//')) {
			charOffset += line.length + 1
			continue
		}

		const expectedLevel = isLastLine && trimmed === ''
			? outerIndent
			: (trimmed.startsWith('}') ? Math.max(innerIndent, level - 1) : level) + +isMultilineDeclaration

		const expectedIndent = indentStyle.repeat(expectedLevel)
		const actualIndent = getIndent(line)

		if (parenLevel === 0 && actualIndent !== expectedIndent) {
			context.report({
				messageId: 'incorrectIndentation',
				loc: {
					start: { line: lineOffset + i, column: 0 },
					end: { line: lineOffset + i, column: actualIndent.length },
				},
				fix: fixer => fixer.replaceTextRange([charOffset, charOffset + actualIndent.length], expectedIndent),
			})
		}

		const cleanLine = line.replace(IGNORE_REGEX, '')
		const parenDelta = cleanLine.split('(').length - cleanLine.split(')').length
		parenLevel = Math.max(0, parenLevel + parenDelta)

		const braceDelta = cleanLine.split('{').length - cleanLine.split('}').length
		level = Math.max(innerIndent, level + braceDelta)
		isMultilineDeclaration = isMultilineDeclarationStart(cleanLine) || (isMultilineDeclaration && !cleanLine.includes(';'))

		charOffset += line.length + 1
	}
}

function getIndent(line: string) {
	return /^\s*/.exec(line)?.[0] ?? ''
}

function isMultilineDeclarationStart(line: string) {
	if (line.includes('{') || line.includes('}') || line.includes(';')) return false
	return /^\s*(?:--[\w-]+|[a-z-]+)\s*:/.test(line)
}