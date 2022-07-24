import test from 'ava'
import { remark } from 'remark'
import remarkStarryNight from '../index.js'
import fixtures from './fixtures.js'

async function process(markdown) {
	const file = await remark()
		.use(remarkStarryNight, {
			aliases: {
				conf: 'ini'
			}
		})
		.process(markdown)
	
	return String(file)
}

for (const fixture of fixtures) {
	const { input, output, title } = fixture
	test(`test '${title}'`, async t => {
		const result = await process(input)
		t.is(output.replace(/[\n](?=.*[\n])/gm, '\r\n'), result)
	})
}
