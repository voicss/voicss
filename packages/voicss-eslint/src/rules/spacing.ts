import type { RuleContext, RuleDefinition } from '@eslint/core'
import type { TSESLint, TSESTree } from '@typescript-eslint/utils'

const PREFIX = 'css\n'
const IGNORE_REGEX = /(?:\/\*[\s\S]*?\*\/)|(?:\/\/.*)|("(?:\\.|[^"\\])*")|('(?:\\.|[^'\\])*')/g
const MULTIPLE_SPACES_REGEX = / {2,}(?=\S)/g
const SPACE_BEFORE_SEMICOLON_REGEX = /[ \t]+(?=;)/g

export const spacing: RuleDefinition = {
	meta: {
		fixable: 'code',
		messages: {
			unexpectedMultipleSpaces: 'Unexpected multiple spaces',
			unexpectedSpaceBeforeSemicolon: 'Unexpected space before semicolon',
		},
	},
	create(context) {
		if (!('text' in context.sourceCode)) return {}
		const source = context.sourceCode.text

		return {
			UnaryExpression(node) {
				if (node.operator !== 'void' || (node.argument.type as string) !== 'TemplateLiteral') return
				report(node.argument as TSESTree.TemplateLiteral, context, source)
			},
		} satisfies TSESLint.RuleListener
	},
}

function report(node: TSESTree.TemplateLiteral, context: RuleContext, source: string) {
	if (node.quasis.length !== 1) return

	const { value: { raw }, range } = node.quasis[0]
	if (!raw.startsWith(PREFIX)) return

	let charOffset = range[0] + 1 + PREFIX.length
	const lines = raw.slice(PREFIX.length).split('\n')

	for (const line of lines) {
		const indentLength = getIndent(line).length
		const content = line.slice(indentLength)

		reportMatches(content, MULTIPLE_SPACES_REGEX, ignoredRanges(content), context, source, charOffset + indentLength, 'unexpectedMultipleSpaces', ' ')
		reportMatches(content, SPACE_BEFORE_SEMICOLON_REGEX, ignoredRanges(content), context, source, charOffset + indentLength, 'unexpectedSpaceBeforeSemicolon', '')

		charOffset += line.length + 1
	}
}

function reportMatches(
	line: string,
	regex: RegExp,
	ignored: [number, number][],
	context: RuleContext,
	source: string,
	startOffset: number,
	messageId: 'unexpectedMultipleSpaces' | 'unexpectedSpaceBeforeSemicolon',
	replacement: string,
) {
	for (const match of line.matchAll(regex)) {
		const { index } = match
		const end = index + match[0].length
		if (ignored.some(([start, finish]) => index < finish && end > start)) continue

		const absoluteStart = startOffset + index
		const absoluteEnd = startOffset + end

		context.report({
			messageId,
			loc: {
				start: getPosition(source, absoluteStart),
				end: getPosition(source, absoluteEnd),
			},
			fix: fixer => fixer.replaceTextRange([absoluteStart, absoluteEnd], replacement),
		})
	}
}

function ignoredRanges(line: string): [number, number][] {
	return Array.from(line.matchAll(IGNORE_REGEX), match => [match.index, match.index + match[0].length])
}

function getIndent(line: string) {
	return /^\s*/.exec(line)?.[0] ?? ''
}

function getPosition(source: string, index: number) {
	const lines = source.slice(0, index).split('\n')
	return { line: lines.length, column: lines[lines.length - 1].length }
}