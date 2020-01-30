#!/usr/bin/env node

const { git } = require('../shared/git')
const env = require('../shared/env').env()

git(['commit', '--amend', '--reset-author', '--no-edit', '--no-verify'], { env })
git(['rebase', '--continue'], { env })
process.exit(0)
