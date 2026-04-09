# Changelog


## &ensp; [` 📦 @rawstyle/next@0.5.2  `](https://github.com/rawstylecss/rawstyle/compare/@rawstyle/next@0.5.1...@rawstyle/next@0.5.2)

### &emsp; 🩹 Fixes
- **Smooth Next.js HMR**: resolved styling flashes during hot module replacement. The loader now caches extracted CSS into physical files in `node_modules/.rawstyle` and injects stable relative imports instead of using base64 data URIs. [🡥](https://github.com/rawstylecss/rawstyle/commit/e1eea2e)

##### &emsp;&emsp; [Full Changelog](https://github.com/rawstylecss/rawstyle/compare/@rawstyle/next@0.5.1...@rawstyle/next@0.5.2) &ensp;•&ensp; Apr 9, 2026


## &ensp; [` 📦 @rawstyle/next@0.5.1  `](https://github.com/rawstylecss/rawstyle/compare/@rawstyle/next@0.5.0...@rawstyle/next@0.5.1)

### &emsp; 🩹 Fixes
- **Fixed published peer dependency**: the published package now resolves the `rawstyle` peer dependency to a regular semver range, so installation no longer fails with workspace lookup errors. [🡥](https://github.com/rawstylecss/rawstyle/commit/1e973f9)

##### &emsp;&emsp; [Full Changelog](https://github.com/rawstylecss/rawstyle/compare/@rawstyle/next@0.5.0...@rawstyle/next@0.5.1) &ensp;•&ensp; Apr 9, 2026


## &ensp; [` 📦 @rawstyle/next@0.5.0  `](https://github.com/rawstylecss/rawstyle/compare/@rawstyle/next@0.4.0...@rawstyle/next@0.5.0)

### &emsp; 🧨 BREAKING CHANGES
- **Rawstyle dependency update**: the plugin now requires `rawstyle` version `>=0.7` as a peer dependency. [🡥](https://github.com/rawstylecss/rawstyle/commit/580a1db)

##### &emsp;&emsp; [Full Changelog](https://github.com/rawstylecss/rawstyle/compare/@rawstyle/next@0.4.0...@rawstyle/next@0.5.0) &ensp;•&ensp; Apr 8, 2026


## &ensp; [` 📦 @rawstyle/next@0.4.0  `](https://github.com/rawstylecss/rawstyle/compare/@rawstyle/next@0.3.2...@rawstyle/next@0.4.0)

### &emsp; 🧨 BREAKING CHANGES
- **Rawstyle dependency update**: the minimum required version of `rawstyle` has been updated to 0.6. [🡥](https://github.com/rawstylecss/rawstyle/commit/ee2a9a4)

### &emsp; ⚙️ Internal
- **Package description**: improved package metadata to better reflect the package's purpose. [🡥](https://github.com/rawstylecss/rawstyle/commit/9f52fec)

##### &emsp;&emsp; [Full Changelog](https://github.com/rawstylecss/rawstyle/compare/@rawstyle/next@0.3.2...@rawstyle/next@0.4.0) &ensp;•&ensp; Feb 28, 2026


## &ensp; [` 📦 @rawstyle/next@0.3.2  `](https://github.com/rawstylecss/rawstyle/compare/@rawstyle/next@0.3.1...@rawstyle/next@0.3.2)

### &emsp; 🩹 Fixes
- **Correct CSS import placement**: CSS imports are now injected after directive prologues (such as `'use client'`), preventing errors about directive placement in Next.js. [🡥](https://github.com/rawstylecss/rawstyle/commit/11e8b70)

##### &emsp;&emsp; [Full Changelog](https://github.com/rawstylecss/rawstyle/compare/@rawstyle/next@0.3.1...@rawstyle/next@0.3.2) &ensp;•&ensp; Feb 15, 2026


## &ensp; [` 📦 @rawstyle/next@0.3.1  `](https://github.com/rawstylecss/rawstyle/compare/@rawstyle/next@0.3.0...@rawstyle/next@0.3.1)

### &emsp; 🩹 Fixes
- **Skip virtual CSS for empty output**: virtual CSS is now only imported when CSS is actually generated, preventing unnecessary imports for files without extracted CSS. [🡥](https://github.com/rawstylecss/rawstyle/commit/6092b8a)

##### &emsp;&emsp; [Full Changelog](https://github.com/rawstylecss/rawstyle/compare/@rawstyle/next@0.3.0...@rawstyle/next@0.3.1) &ensp;•&ensp; Feb 10, 2026


## &ensp; [` 📦 @rawstyle/next@0.3.0  `](https://github.com/rawstylecss/rawstyle/compare/@rawstyle/next@0.2.0...@rawstyle/next@0.3.0)

### &emsp; 🧨 BREAKING CHANGES
- **Rawstyle v0.4 peer update**: migrated to Rawstyle v0.4 API and bumped peer requirement to `rawstyle` >=0.4. [🡥](https://github.com/rawstylecss/rawstyle/commit/658ce92)

##### &emsp;&emsp; [Full Changelog](https://github.com/rawstylecss/rawstyle/compare/@rawstyle/next@0.2.0...@rawstyle/next@0.3.0) &ensp;•&ensp; Feb 2, 2026


## &ensp; [` 📦 @rawstyle/next@0.2.0  `](https://github.com/rawstylecss/rawstyle/compare/@rawstyle/next@0.1.0...@rawstyle/next@0.2.0)

### &emsp; 🧨 BREAKING CHANGES
- **Migrated to Rawstyle v0.2 API**: the plugin now works with the updated Rawstyle API and requires `rawstyle` >=0.2 as a peer dependency. [🡥](https://github.com/rawstylecss/rawstyle/commit/d1a91b7)

### &emsp; 🎁 Features
- **Turbopack rule wrapper**: added `rawstyleTurboRule` to streamline Next.js Turbopack config, allowing direct import and use in Next.js config without manual file type or loader conditions. [🡥](https://github.com/rawstylecss/rawstyle/commit/0d2d0bb)

##### &emsp;&emsp; [_Full Changelog_](https://github.com/rawstylecss/rawstyle/compare/@rawstyle/next@0.1.0...@rawstyle/next@0.2.0) &ensp;•&ensp; _Jan 26, 2026_


## &ensp; [` 📦 @rawstyle/next@0.1.0  `](https://github.com/rawstylecss/rawstyle/commits/@rawstyle/next@0.1.0)

### &emsp; 🎁 Features
- **Next.js integration**: implemented a Turbopack loader that extracts CSS via Rawstyle and injects it as a base64‑encoded data‑URL import. [🡥](https://github.com/rawstylecss/rawstyle/commit/0b30669)

##### &emsp;&emsp; [_Full Changelog_](https://github.com/rawstylecss/rawstyle/commits/@rawstyle/next@0.1.0) &ensp;•&ensp; _Jan 24, 2026_