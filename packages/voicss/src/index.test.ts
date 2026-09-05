import { expect, test } from 'bun:test'
import { extractCss } from './'

test('extractCss', () => {
	expect(extractCss(`
void \`css
	.test { color: red; }
\`
const other = 'text';
void \`css
	body { margin: 0; }
\`
`)).toBe(`\t.test { color: red; }
	body { margin: 0; }
`)
})