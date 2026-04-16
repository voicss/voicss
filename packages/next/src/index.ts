import { mkdirSync, writeFileSync } from 'node:fs'
import { join, resolve, relative, dirname } from 'node:path'
import { createHash } from 'node:crypto'
import type { NextConfig } from 'next'
import { extractCss } from 'voicss'

export const voicssTurboRule: Required<Required<NextConfig>['turbopack']>['rules'] = {
	'*': {
		loaders: ['@voicss/next'],
		condition: { all: [{ not: 'foreign' }, { path: /\.(ts|tsx)$/ }] },
	},
}

export default function (this: { resourcePath: string }, source: string): string {
	const css = extractCss(source)
	if (!css) return source

	const fileHash = createHash('md5').update(this.resourcePath).digest('hex')
	const cacheDir = resolve('node_modules', '.voicss')
	const cssFilePath = join(cacheDir, `${fileHash}.css`)

	mkdirSync(cacheDir, { recursive: true })
	writeFileSync(cssFilePath, css, 'utf8')

	let importPath = relative(dirname(this.resourcePath), cssFilePath).replace(/\\/g, '/')
	if (!importPath.startsWith('.')) importPath = `./${importPath}`

	return source.replace(/^\w/m, `import '${importPath}';\n$&`)
}