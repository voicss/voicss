import { defineConfig } from 'tsdown'

export default defineConfig({
	entry: 'src/{client,server}.ts',
	alias: {
		'vscode-css-languageservice': 'vscode-css-languageservice/lib/esm/cssLanguageService.js',
		'jsonc-parser': 'jsonc-parser/lib/esm/main.js',
	},
	deps: { onlyBundle: false, neverBundle: 'vscode' },
})