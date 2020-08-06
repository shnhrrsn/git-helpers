const { execFileSync } = require('child_process')

module.exports = {
	git(args, { quiet, fatal, ...options } = {}) {
		try {
			return execFileSync(
				'git',
				(args || []).filter(value => value !== undefined),
				{
					stdio: ['inherit', 'pipe', quiet ? 'ignore' : 'inherit'],
					...options,
				},
			).toString()
		} catch (err) {
			if (fatal !== false) {
				console.error(err.message)
				process.exit(1)
			} else {
				throw err
			}
		}
	},
}
