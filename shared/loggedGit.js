const { git } = require('../shared/git')
const chalk = require('chalk')

exports.loggedGit = function loggedGit(args, options, isDryRun = false) {
	console.log(chalk.dim('+', 'git', ...args))
	if (isDryRun) {
		return
	}
	options = options || {}
	return git(args, { fatal: false, ...options })
}
