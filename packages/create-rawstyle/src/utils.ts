import { cancel, isCancel } from '@clack/prompts'
import { readFileSync, writeFileSync } from 'node:fs'

export const handleCancel: <T>(value: T | symbol) => asserts value is T = value => {
	if (!isCancel(value)) return
	cancel('Operation cancelled')
	process.exit(0)
}

export const resolveLinkedDeps = async (dir: string) => {
	const pkgJson = readFileSync(`${dir}/package.json`, 'utf8')
	let updated = pkgJson
	for (const [match, pkg] of pkgJson.matchAll(/"(.*)": "\.\.\/.*/g)) {
		const latestPkgVersion = await getLatestPkgVersion(pkg)
		updated = updated.replace(match, `"${pkg}": "^${latestPkgVersion}",`)
	}
	writeFileSync(`${dir}/package.json`, updated, 'utf8')
}

const getLatestPkgVersion = async (pkgName: string): Promise<string> => {
	const res = await fetch(`https://registry.npmjs.org/${pkgName}`)
	const data = await res.json() as { 'dist-tags': { latest: string } }
	return data['dist-tags'].latest
}