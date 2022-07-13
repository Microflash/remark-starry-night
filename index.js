/**
 * @typedef {import('mdast').Root} Root
 */
import { createStarryNight, all } from '@wooorm/starry-night'
import fenceparser from '@microflash/fenceparser'
import { toHtml } from 'hast-util-to-html'
import { visit } from 'unist-util-visit'

const defaults = {
	showLanguage: true,
	showLineNumbers: true,
	highlightLines: true,
	showCaption: true,
	aliases: {}
}

function decorate(code, scope, lang, options, metadata) {
	const lines = code.split(/\r\n|\r|\n/)

	const prompts = metadata && metadata.prompt ? metadata.prompt.trim().split(',').map(p => parseInt(p)) : null

	if (options.showLineNumbers && lines && lines.length > 1) {
		const maxWidth = `${lines.length}`.length
		const highlightLines = options.highlightLines && metadata && metadata.highlight && metadata.highlight.length
		
		code = lines.map((line, index) => {
				const lineClasses = highlightLines && metadata.highlight.includes(index + 1) ? `line line-highlighted` : 'line'
				const lineNumber = `${index + 1}`.padStart(maxWidth)

				let decoratedLine = `<span class="${lineClasses}">`
				decoratedLine += `<span class="line-number" aria-hidden="true">${lineNumber}</span>`

				if (prompts && prompts.includes(index + 1)) {
					decoratedLine += `<span class="line-prompt" aria-hidden="true">$</span>`
				}
				
				decoratedLine += line
				decoratedLine += `</span>`

				return decoratedLine
			})
			.join('\r\n')
	} else {
		let decoratedLine = `<span class="line line-standalone">`

		if (prompts && prompts.includes(1)) {
			decoratedLine += `<span class="line-prompt" aria-hidden="true">$</span>`
		}

		decoratedLine += code
		decoratedLine += `</span>`

		code = decoratedLine
	}

	const langToken = scope ? scope.replace(/^source\./, '').replace(/\./g, '-') : lang
	let template = ''
	template += `<div class="highlight highlight-${langToken}">`

	const showCaption = options.showCaption && metadata && metadata.caption
	const showHeader = options.showLanguage || showCaption

	if (showHeader) {
		template += `<div class="highlight-header">`

		if (options.showLanguage && lang) {
			template += `<div class="highlight-language">${lang}</div>`
		}

		if (showCaption) {
			template += `<div class="highlight-caption">${metadata.caption}</div>`
		}

		template += `</div>`
	}

	template += `<pre><code tabindex="0">${code}</code></pre>`

	template += `</div>`
	return template
}

/**
 * Plugin to highlight codeblocks with Starry Night
 *
 * @type {import('unified').Plugin<Array<void>, Root>}
 */
export default function remarkStarryNight(userOptions) {
	const options = Object.assign({}, defaults, userOptions)
	const { aliases } = options

	const grammars = options.grammars || all
	const starryNightPromise = createStarryNight(grammars)

	return async function (tree) {
		const starryNight = await starryNightPromise

		visit(tree, 'code', function (node) {
			const { value, lang = 'text', meta } = node

			if (!value) {
				return
			}

			const metadata = meta ? fenceparser(meta).metadata : null
			const langId = aliases && aliases[lang] ? aliases[lang] : lang
			const scope = starryNight.flagToScope(langId)

			let code = value

			if (scope) {
				const highlighted = starryNight.highlight(value, scope)
				code = toHtml(highlighted)
					.replace(/[\r\n|\r|\n]*$/, '')	// remove the last newline character
			} else {
				console.warn(`Grammar unavailable for ${langId}; rendering the code fence as text`)
			}

			let codeblock

			if (options.disableDecorations) {
				codeblock = `<div class="highlight highlight-${langToken}"><pre><code tabindex="0">${code}</code></pre></div>`
			} else {
				codeblock = decorate(code, scope, lang, options, metadata)
			}

			node.type = 'html'
			node.value = codeblock
		})
	}
}
