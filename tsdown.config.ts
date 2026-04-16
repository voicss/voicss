import type { UserConfig } from 'tsdown'

const isProd = process.argv.includes('-p')

export default {
	minify: isProd,
	sourcemap: isProd ? false : 'inline',
	fixedExtension: false,
} satisfies UserConfig