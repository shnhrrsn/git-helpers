const { parseStatusOutput } = require('./parseStatusOutput')
const { execFileSync } = require('child_process')
const fs = require('fs')

exports.freeze = function freeze(output) {
	const stats = {}

	const files = parseStatusOutput(output)
	for (const file of files.keys()) {
		if (stats[file]) {
			continue
		}

		try {
			stats[file] = fs.statSync(file)
		} catch (err) {
			if (err.code === 'ENOENT') {
				continue
			}

			throw err
		}
	}
	return { stats, files }
}

exports.restore = function restore(stats) {
	for (const [file, fileStats] of Object.entries(stats)) {
		fs.utimesSync(file, fileStats.atime, fileStats.mtime)
		try {
			const date = new Date(fileStats.birthtimeMs)
				.toLocaleString('en-US', {
					hour12: false,
					month: '2-digit',
					day: '2-digit',
					year: 'numeric',
					hour: '2-digit',
					minute: '2-digit',
					second: '2-digit',
				})
				.replace(/,/g, '')

			execFileSync('SetFile', ['-d', date, '-m', date, file])
		} catch (err) {
			console.log(err)
		}
	}
}
