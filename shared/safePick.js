const prompts = require('prompts')

function safePick(git, commit) {
	return safe(git, commit, ['pick', commit])
}

function safeContinue(git, commit) {
	return safe(git, commit, ['pick', '--continue'])
}

async function safe(git, commit, cmd) {
	try {
		git(cmd)
	} catch (err) {
		let { value } = await prompts({
			type: 'select',
			name: 'value',
			message: `Unable to to pick ${commit}, how would you like to proceed?`,
			choices: [
				{ title: 'Edit', value: 'edit' },
				{ title: 'Retry', value: 'retry' },
				{ title: 'Abort', value: 'abort' },
			],
			initial: 0,
		})

		if (value === 'edit') {
			const result = await prompts({
				type: 'toggle',
				name: 'value',
				message: 'Please resolve issue in a different shell and then continue',
				initial: true,
				active: 'Continue',
				inactive: 'Abort',
			})

			if (result.value) {
				return safeContinue(git, commit, [])
			}
		}

		if (value === 'retry') {
			return safePick(git, commit)
		}

		git(['cherry-pick', '--abort'])
		throw err
	}
}

module.exports = { safePick, safeContinue }
