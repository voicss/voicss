import type { RuleContext, RuleDefinition } from '@eslint/core'
import type { TSESLint, TSESTree } from '@typescript-eslint/utils'

const PREFIX = 'css\n'

export const noMultipleEmptyLines: RuleDefinition = {
	meta: { fixable: 'code', messages: { unexpected: 'More than 1 blank line is not allowed' } },
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
	const lineOffset = source.slice(0, charOffset).split('\n').length - 1
	const lines = raw.slice(PREFIX.length).split('\n')
	let emptyLineCount = 0

	for (const [index, line] of lines.entries()) {
		const isLastLine = index === lines.length - 1
		const isEmptyLine = line.trim() === ''

		if (isEmptyLine && !isLastLine) {
			emptyLineCount += 1

			if (emptyLineCount > 1) {
				context.report({
					messageId: 'unexpected',
					loc: {
						start: { line: lineOffset + index + 1, column: 0 },
						end: { line: lineOffset + index + 2, column: 0 },
					},
					fix: fixer => fixer.removeRange([charOffset, charOffset + line.length + 1]),
				})
			}
		} else {
			emptyLineCount = 0
		}

		charOffset += line.length + 1
	}
}