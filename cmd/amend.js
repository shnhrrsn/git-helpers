#!/usr/bin/env node

const { git } = require('../shared/git')
const { env, args } = require('../shared/env').env(true)

if (!args.includes('-m')) {
	args.push('--no-edit')
}

git(['commit', '--amend', '--reset-author', ...args], { env })
process.exit(0)
