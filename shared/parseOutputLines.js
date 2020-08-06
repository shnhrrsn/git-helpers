exports.parseOutputLines = function parseOutputLines(lines) {
	return lines
		.split(/\n/)
		.map(line => line.trim())
		.filter(line => line.length > 0)
}
