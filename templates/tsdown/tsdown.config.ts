import { defineConfig } from 'tsdown'
import voicss from 'voicss/vite'

export default defineConfig({
	plugins: [voicss()],
})