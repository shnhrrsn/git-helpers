#!/usr/bin/env node

const { git } = require('../shared/git')
const env = require('../shared/env').env()

git([ 'commit', '--amend', '--reset-author', '--no-edit' ], { env })
git([ 'rebase', '--continue' ], { env })
process.exit(0)
