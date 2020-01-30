const { execFileSync } = require('child_process')

module.exports = {
	git(args, options) {
		try {
			return execFileSync('git', args, options).toString()
		} catch (err) {
			console.error(err.message)
			process.exit(1)
		}
	},
}
