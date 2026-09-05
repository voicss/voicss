import type { Plugin } from 'vite'
import MagicString from 'magic-string'
import { extractCss } from './'

const CSS_EXTRACTABLE_FILES = /\.(ts|tsx)$/
const VIRTUAL_PREFIX = 'virtual:voicss/'
const RESOLVED_PREFIX = `\0${VIRTUAL_PREFIX}`
const styles = new Map<string, string>()

export default (): Plugin => ({
	name: 'voicss-vite',
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
		if (!CSS_EXTRACTABLE_FILES.test(id)) return
		const css = extractCss(code)
		if (!css) return
		const cssId = normalizePath(id + '.css')
		styles.set(cssId, css)
		const s = new MagicString(code)
		s.prepend(`import '${VIRTUAL_PREFIX}${cssId}';`)
		return { code: s.toString(), map: s.generateMap({ hires: true }) }
	},
	async handleHotUpdate({ file, server, modules, read }) {
		if (!CSS_EXTRACTABLE_FILES.test(file)) return
		const sourceCode = await read()
		const css = extractCss(sourceCode)
		if (!css) return
		const cssId = normalizePath(file + '.css')
		const virtualId = RESOLVED_PREFIX + cssId
		const mod = server.moduleGraph.getModuleById(virtualId)
		styles.set(cssId, css)
		if (mod) return [...modules, mod]
	},
})

const normalizePath = (p: string) => p.replace(/\\/g, '/')