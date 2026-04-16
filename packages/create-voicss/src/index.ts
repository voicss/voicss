import { intro, select, spinner, text, outro } from '@clack/prompts'
import { downloadTemplate } from 'giget'
import { handleCancel, resolveWorkspaceDeps } from './utils'

void (async () => {
	console.log()
	intro('Create a new Voicss project')

	const platform = await select({ message: 'Pick a platform:', options: [
		{ label: 'Next.js', value: 'next' },
		{ label: 'Vite', value: 'vite' },
		{ label: 'tsdown', value: 'tsdown' },
	] })
	handleCancel(platform)

	const projectName = await text({
		message: 'Project name:',
		defaultValue: `voicss-${platform}`,
		placeholder: `voicss-${platform}`,
	})
	handleCancel(projectName)

	const s = spinner()
	s.start('Scaffolding project...')
	await downloadTemplate(`gh:voicss/voicss/templates/${platform}`, { dir: projectName })
	await resolveWorkspaceDeps(projectName)
	s.stop('Project scaffolded successfully!')

	outro('Done')
})()