import type { RuleContext, RuleDefinition } from '@eslint/core'
import type { TSESLint, TSESTree } from '@typescript-eslint/utils'

type QuoteStyleOption = 'single' | 'double'
type QuoteChar = '"' | '\''

const PREFIX = 'css\n'
const DEFAULT_STYLE: QuoteStyleOption = 'single'
const QUOTES: Record<QuoteStyleOption, QuoteChar> = { single: '\'', double: '"' }
const QUOTE_REGEX = /(?:\/\*[\s\S]*?\*\/)|(?:\/\/.*)|("(?:\\.|[^"\\])*")|('(?:\\.|[^'\\])*')/g

export const quoteStyle: RuleDefinition = {
	meta: {
		fixable: 'code',
		schema: [{ enum: ['single', 'double'] }],
		defaultOptions: [DEFAULT_STYLE],
		messages: { unexpectedQuote: 'Expected {{expected}} quotes' },
	},
	create(context) {
		if (!('text' in context.sourceCode)) return {}

		const source = context.sourceCode.text
		const preferredStyle = (context.options[0] ?? DEFAULT_STYLE) as QuoteStyleOption
		const preferredQuote = QUOTES[preferredStyle]

		return {
			UnaryExpression(node) {
				if (node.operator !== 'void' || (node.argument.type as string) !== 'TemplateLiteral') return
				report(node.argument as TSESTree.TemplateLiteral, context, source, preferredStyle, preferredQuote)
			},
		} satisfies TSESLint.RuleListener
	},
}

function report(
	node: TSESTree.TemplateLiteral,
	context: RuleContext,
	source: string,
	preferredStyle: QuoteStyleOption,
	preferredQuote: QuoteChar,
) {
	if (node.quasis.length !== 1) return

	const { value: { raw }, range } = node.quasis[0]
	if (!raw.startsWith(PREFIX)) return

	const startOffset = range[0] + 1

	for (const match of raw.matchAll(QUOTE_REGEX)) {
		const text = match[1] || match[2]
		if (!text) continue

		if (text.startsWith(preferredQuote)) continue
		const inner = text.slice(1, -1)
		if (inner.includes(preferredQuote)) continue

		const absoluteStart = startOffset + match.index
		const absoluteEnd = absoluteStart + text.length

		context.report({
			messageId: 'unexpectedQuote',
			data: { expected: preferredStyle },
			loc: {
				start: getPosition(source, absoluteStart),
				end: getPosition(source, absoluteEnd),
			},
			fix: fixer => fixer.replaceTextRange([absoluteStart, absoluteEnd], `${preferredQuote}${inner}${preferredQuote}`),
		})
	}
}

function getPosition(source: string, index: number) {
	const lines = source.slice(0, index).split('\n')
	return { line: lines.length, column: lines[lines.length - 1].length }
}