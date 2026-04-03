import { describe, it, expect } from 'bun:test'
import { transform } from './transformer'
import { dedent } from './utils'

describe('transformer', () => {
	it('should transform correctly', () => {
		const source = dedent`
		export const Component = ({ theme }: { theme: string }) => (
			<div className={cn('class', theme === 'dark' && card)}>
				Hello, World!
			</div>
		)
		const card = css\`
			padding: 1rem;
			color: var(--primary);
			&:hover { box-shadow: 0 4px 12px black; }
		\`
		void css\`
			:root { --primary: #303030; }
			body { margin: 0; background: #ebebeb; }
		\``

		const { transformed, css } = transform('test.tsx', source)

		expect(transformed).toMatchInlineSnapshot(`
			"export const Component = ({ theme }: { theme: string }) => (
				<div className={['class', theme === 'dark' && card].filter(Boolean).join(' ')}>
					Hello, World!
				</div>
			)
			const card = 'card_1cabf'
			void ''"
		`)
		expect(css).toMatchInlineSnapshot(`
			".card_1cabf {
				padding: 1rem;
				color: var(--primary);
				&:hover { box-shadow: 0 4px 12px black; }
			}
			:root { --primary: #303030; }
			body { margin: 0; background: #ebebeb; }"
		`)
	})
})