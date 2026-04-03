import { intro, select, spinner, text, outro } from '@clack/prompts'
import { downloadTemplate } from 'giget'
import { handleCancel, resolveLinkedDeps } from './utils'

void (async () => {
	console.log()
	intro('Create a Rawstyle project')

	const platform = await select({ message: 'Pick a platform:', options: [
		{ label: 'Next.js', value: 'next' },
		{ label: 'Vite', value: 'vite' },
	] })
	handleCancel(platform)

	const projectName = await text({
		message: 'Project name:',
		defaultValue: `rawstyle-${platform}`,
		placeholder: `rawstyle-${platform}`,
	})
	handleCancel(projectName)

	const s = spinner()
	s.start('Scaffolding project...')
	await downloadTemplate(`gh:rawstylecss/rawstyle/examples/${platform}`, { dir: projectName })
	await resolveLinkedDeps(projectName)
	s.stop('Project scaffolded successfully!')

	outro('Done')
})()