import { defineConfig } from 'eslint/config'
import kh4f from '@kh4f/eslint-config'
import voicss from 'voicss-eslint'

export default defineConfig([
	await kh4f(),
	voicss.configs.recommended,
])