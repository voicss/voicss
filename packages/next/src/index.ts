import { mkdirSync, writeFileSync } from 'node:fs'
import { join, resolve, relative, dirname } from 'node:path'
import { createHash } from 'node:crypto'
import { TRANSFORMABLE_EXT } from 'rawstyle'
import { transform } from 'rawstyle/transformer'
import type { NextConfig } from 'next'

export const rawstyleTurboRule: Required<Required<NextConfig>['turbopack']>['rules'] = {
	'*': {
		loaders: ['@rawstyle/next'],
		condition: { all: [{ not: 'foreign' }, { path: TRANSFORMABLE_EXT }] },
	},
}

export default function (this: { resourcePath: string }, source: string): string {
	const { transformed, css } = transform(this.resourcePath, source)
	if (!css) return transformed

	const fileHash = createHash('md5').update(this.resourcePath).digest('hex')
	const cacheDir = resolve('node_modules', '.rawstyle')
	const cssFilePath = join(cacheDir, `${fileHash}.css`)

	mkdirSync(cacheDir, { recursive: true })
	writeFileSync(cssFilePath, css, 'utf8')

	let importPath = relative(dirname(this.resourcePath), cssFilePath).replace(/\\/g, '/')
	if (!importPath.startsWith('.')) importPath = `./${importPath}`

	return transformed.replace(/^\w/m, `import '${importPath}';\n$&`)
}