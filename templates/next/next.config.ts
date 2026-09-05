import { voicssTurboRule } from 'voicss/next'
import type { NextConfig } from 'next'

export default {
	turbopack: { rules: { ...voicssTurboRule } },
} satisfies NextConfig