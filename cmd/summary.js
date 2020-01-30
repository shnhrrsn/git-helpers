#!/usr/bin/env node

const { git } = require('../shared/git')

const { env, args } = require('../shared/env').env(true)
const files = git(['ls-files'], { env })
	.trim()
	.split(/\n/)
const length = files.length
let i = 0
const authors = {}

for (const file of files) {
	const lines = git(['blame', '--line-porcelain', 'HEAD', file, ...args], { env })
		.trim()
		.split(/\n/)

	for (const line of lines) {
		if (!line.startsWith('author ')) {
			continue
		}

		const author = line.substring(7).trim()
		authors[author] = (authors[author] || 0) + 1
	}

	process.stdout.write(`Processing ${i} of ${length}\r`)
	i++
}

process.stdout.write(`${' '.repeat(process.stdout.columns)}\r`)
process.stdout.write('\n')

const maxLength = Math.max(...Object.keys(authors).map(author => author.length))
const entries = Object.entries(authors).sort((a, b) => (a[1] > b[1] ? -1 : 1))

const formatNumber = num => {
	const str = num.toString()
	const { length } = str
	return [...Array(length)]
		.map((_, i) => str[length - 1 - i] + (i > 0 && i % 3 === 0 ? ',' : ''))
		.reverse()
		.join('')
}

for (const [name, count] of entries) {
	process.stdout.write(`  ${name.padStart(maxLength, ' ')}: ${formatNumber(count)}\n`)
}

process.stdout.write('\n')
process.exit(0)
