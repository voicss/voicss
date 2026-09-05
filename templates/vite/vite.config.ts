import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import voicss from 'voicss/vite'

export default defineConfig({
	resolve: { alias: {	'@': resolve('src') } },
	plugins: [react(), voicss()],
})