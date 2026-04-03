import type { Plugin } from 'rolldown-vite'
import { TRANSFORMABLE_EXT, VIRTUAL_PREFIX, RESOLVED_PREFIX } from 'rawstyle'
import { transform } from 'rawstyle/transformer'

const styles = new Map<string, string>()

export default (): Plugin => ({
	name: 'rawstyle-vite',
	enforce: 'pre',

	resolveId(id) {
		if (id.startsWith(VIRTUAL_PREFIX))
			return RESOLVED_PREFIX + normalizePath(id.slice(VIRTUAL_PREFIX.length))
	},

	load(id) {
		if (id.startsWith(RESOLVED_PREFIX)) {
			const cssId = normalizePath(id.slice(RESOLVED_PREFIX.length))
			return styles.get(cssId)
		}
	},

	transform(code, id) {
		if (!TRANSFORMABLE_EXT.test(id)) return
		const { transformed, css } = transform(id, code)
		if (!css) return transformed
		const cssId = normalizePath(id + '.css')
		styles.set(cssId, css)
		return `import '${VIRTUAL_PREFIX}${cssId}';${transformed}`
	},

	async handleHotUpdate({ file, server, modules, read }) {
		if (!TRANSFORMABLE_EXT.test(file)) return
		const sourceCode = await read()
		const { css } = transform(file, sourceCode)
		if (!css) return
		const cssId = normalizePath(file + '.css')
		const virtualId = RESOLVED_PREFIX + cssId
		const mod = server.moduleGraph.getModuleById(virtualId)
		styles.set(cssId, css)
		if (mod) return [...modules, mod]
	},
})

const normalizePath = (path: string) => path.replace(/\\/g, '/')