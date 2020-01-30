const { git } = require('./git')

module.exports = {
	env(returnArgs = false, commit = 'HEAD') {
		const result = git(['show', '--quiet', commit])
		const info = result.trim().split(/\n/)
		const author = info[1].match(/.+?:\s*(.+?)\s*<(.+?)>/)

		if (!author) {
			console.error('Unable to find author.')
			process.exit(1)
		}

		let name = author[1].trim()
		let email = author[2].trim()
		const date = info[2].substring(6).trim()
		const args = []

		for (const value of process.argv.slice(2)) {
			if (value.startsWith('--name=')) {
				name = value.substring(7)
			} else if (value.startsWith('--email=')) {
				email = value.substring(8)
			} else {
				args.push(value)
			}
		}

		const env = {
			PATH: process.env.PATH,

			GIT_AUTHOR_DATE: date,
			GIT_AUTHOR_EMAIL: email,
			GIT_AUTHOR_NAME: name,

			GIT_COMMITTER_DATE: date,
			GIT_COMMITTER_EMAIL: email,
			GIT_COMMITTER_NAME: name,
		}

		if (returnArgs) {
			return { env, args }
		}

		return env
	},
}
