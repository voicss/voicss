import { defineConfig, globalIgnores } from 'eslint/config'
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintReact from '@eslint-react/eslint-plugin'
import reactHooks from 'eslint-plugin-react-hooks'
import nextEslint from '@next/eslint-plugin-next'
import rawstyle from 'rawstyle-eslint'
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig([
	globalIgnores(['dist', '.next', 'next-env.d.ts'], 'Global Ignores'),
	{
		name: 'Base Rules',
		files: ['**/*.ts?(x)'],
		extends: [eslint.configs.recommended],
	},
	{
		name: 'Type-Aware Rules',
		files: ['**/*.ts?(x)'],
		extends: [tseslint.configs.strictTypeChecked, tseslint.configs.stylisticTypeChecked],
		languageOptions: { parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname } },
		rules: {
			'@typescript-eslint/no-confusing-void-expression': ['error', { ignoreArrowShorthand: true }],
			'@typescript-eslint/restrict-template-expressions': 'off',
		},
	},
	{
		name: 'React Rules',
		files: ['**/*.ts?(x)'],
		settings: { react: { version: 'detect' } },
		extends: [
			reactHooks.configs.flat.recommended,
			eslintReact.configs['recommended-type-checked'],
			rawstyle.configs.recommended,
		],
	},
	{
		name: 'Next.js Rules',
		files: ['**/*.ts?(x)'],
		extends: [nextEslint.configs.recommended, nextEslint.configs['core-web-vitals']],
	},
	{
		name: 'Stylistic Rules',
		files: ['**/*.ts?(x)'],
		extends: [stylistic.configs.recommended],
		rules: {
			'@stylistic/indent': ['error', 'tab'],
			'@stylistic/indent-binary-ops': ['error', 'tab'],
			'@stylistic/no-tabs': 'off',
			'@stylistic/eol-last': ['error', 'never'],
			'@stylistic/arrow-parens': ['error', 'as-needed'],
			'@stylistic/jsx-indent-props': ['error', 'tab'],
			'@stylistic/jsx-one-expression-per-line': 'off',
			'@stylistic/jsx-tag-spacing': ['error', { beforeSelfClosing: 'never' }],
		},
	},
])