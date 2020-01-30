#!/usr/bin/env node

const { git } = require('../shared/git')

let commit = null
let continuing = false

if (process.argv.includes('--continue')) {
	const result = git(['status'])
	const match = result.match(/cherry-picking commit (.+?)\./)

	if (!match) {
		console.error('cherry-pick not in progress')
		process.exit(1)
	}

	commit = match[1]
	continuing = true
} else {
	commit = process.argv[2]
}

const env = require('../shared/env').env(false, commit)

if (continuing) {
	git(['-c', 'core.editor=true', 'cherry-pick', '--continue'], { env })
} else {
	git(['cherry-pick', commit], { env })
}

process.exit(0)
