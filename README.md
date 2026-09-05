<div align="center">
	<picture>
		<source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/kh4f/voicss/refs/heads/assets/logo-dark.png">
		<img alt="logo" src="https://raw.githubusercontent.com/kh4f/voicss/refs/heads/assets/logo-light.png">
	</picture>
	<br>
	A lightweight <b>zero-runtime CSS-in-TS</b> toolkit
	<br><br>
	<p>
		<a href="https://www.npmjs.com/package/voicss"><img src="https://img.shields.io/npm/v/voicss?style=flat-square&logo=npm&label=npm&labelColor=612838&color=D8C8C2" alt="npm version"/></a>&nbsp;
		<a href="https://github.com/kh4f/voicss/issues?q=is%3Aissue+is%3Aopen+label%3Abug"><img src="https://img.shields.io/github/issues/kh4f/voicss/bug?style=flat-square&label=%F0%9F%90%9B%20Bugs&labelColor=612838&color=D8C8C2" alt="bugs"></a>&nbsp;
		<a href="https://github.com/kh4f/voicss/blob/main/LICENSE"><img src="https://img.shields.io/github/license/kh4f/voicss?style=flat-square&label=%F0%9F%9B%A1%EF%B8%8F%20License&labelColor=612838&color=D8C8C2" alt="license"></a>&nbsp;
	</p>
	<p><b>
		<a href="#-overview">Overview</a>&nbsp; •&nbsp;
		<a href="#-quick-start">Quick Start</a>&nbsp; •&nbsp;
		<a href="#%EF%B8%8F-usage">Usage</a>
	</b></p>
	<img alt="demo" src="https://raw.githubusercontent.com/kh4f/voicss/refs/heads/assets/demo.png">
</div>

## 👀 Overview
**Voicss** is a bundler plugin that extracts `` void `css ...` `` blocks from `.ts(x)` files into native CSS.

### 🔥 Features
- **⚡ True zero-runtime:** styles are extracted at build time, no JS in production
- **💎 Native CSS:** write standard CSS with all modern features
- **📦 Modern bundlers:** first-class support for Next.js and Vite
- **🔥 HMR:** instant style updates during development
- **🧩 [VS Code extension](https://github.com/kh4f/voicss-vscode):** syntax highlighting, autocomplete, validation, and more
- **🧹 [ESLint plugin](https://github.com/kh4f/voicss-eslint):** CSS linting in template literals

## 🏁 Quick Start
Scaffold a [demo project](templates) for your platform (Next.js/Vite/tsdown):
```bash
bun create voicss
```

## 🕹️ Usage
### Vite
```bash
bun add -D voicss
```
```ts
// vite.config.ts
import type { UserConfig } from 'vite'
import voicss from 'voicss/vite'

export default {
	plugins: [voicss()],
} satisfies UserConfig
```

### Next.js
```bash
bun add -D voicss
```
```ts
// next.config.ts
import type { NextConfig } from 'next'
import { voicssTurboRule } from 'voicss/next'

export default {
	turbopack: { rules: { ...voicssTurboRule } },
} satisfies NextConfig
```