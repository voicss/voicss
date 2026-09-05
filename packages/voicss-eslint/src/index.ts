import type { Plugin, ConfigObject } from '@eslint/core'
import { indent, noMultipleEmptyLines, quoteStyle, spacing } from './rules'

interface VoicssEslintPlugin extends Plugin {
	configs: { recommended: ConfigObject }
}

const plugin: Plugin = {
	meta: { name: 'voicss-eslint', version: '0.0.0' },
	rules: {
		indent,
		spacing,
		'quote-style': quoteStyle,
		'no-multiple-empty-lines': noMultipleEmptyLines,
	},
}

plugin.configs = { recommended: {
	plugins: { voicss: plugin },
	rules: {
		'voicss/indent': 'error',
		'voicss/spacing': 'error',
		'voicss/quote-style': ['error', 'single'],
		'voicss/no-multiple-empty-lines': 'error',
		'@typescript-eslint/no-meaningless-void-operator': 'off',
	},
} }

export default plugin as VoicssEslintPlugin