const { parseOutputLines } = require('./parseOutputLines')

exports.parseStatusOutput = function parseStatusOutput(status) {
	return new Map(
		parseOutputLines(status).map(line => {
			line = line.replace(/\t/g, ' ')
			const index = line.indexOf(' ')
			return [line.substring(index + 1).trim(), line.substring(0, index).trim()]
		}),
	)
}
