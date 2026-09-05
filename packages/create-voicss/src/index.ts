import { readFileSync, writeFileSync } from 'node:fs'
import { intro, select, spinner, text, outro, cancel, isCancel } from '@clack/prompts'
import { downloadTemplate } from 'giget'

console.log()
intro('Create a new Voicss project')

const platform = await select({
	message: 'Pick a platform:',
	options: [
		{ label: 'Next.js', value: 'next' },
		{ label: 'Vite', value: 'vite' },
		{ label: 'tsdown', value: 'tsdown' },
	],
})
handleCancel(platform)

const projectName = await text({
	message: 'Project name:',
	defaultValue: `voicss-${platform}`,
	placeholder: `voicss-${platform}`,
})
handleCancel(projectName)

const s = spinner()
s.start('Scaffolding project...')
await downloadTemplate(`gh:kh4f/voicss/templates/${platform}`, { dir: projectName })
await resolveWorkspaceDeps(projectName)
s.stop('Project scaffolded successfully.')

outro('Done!')

function handleCancel<T>(value: T | symbol): asserts value is T {
	if (!isCancel(value)) return
	cancel('Operation cancelled')
	process.exit(0)
}

async function resolveWorkspaceDeps(dir: string) {
	const pkgJson = readFileSync(`${dir}/package.json`, 'utf8')
	let updated = pkgJson
	for (const [match, pkg] of pkgJson.matchAll(/"(.*)": "workspace.*/g)) {
		const latestPkgVersion = await getLatestPkgVersion(pkg)
		updated = updated.replace(match, `"${pkg}": "^${latestPkgVersion}",`)
	}
	writeFileSync(`${dir}/package.json`, updated, 'utf8')
}

async function getLatestPkgVersion(pkgName: string): Promise<string> {
	const res = await fetch(`https://registry.npmjs.org/${pkgName}`)
	const data = await res.json() as { 'dist-tags': { latest: string } }
	return data['dist-tags'].latest
}