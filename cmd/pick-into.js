#!/usr/bin/env node

const { loggedGit } = require('../shared/loggedGit')
const { parseStatusOutput } = require('../shared/parseStatusOutput')
const { parseOutputLines } = require('../shared/parseOutputLines')
const { git } = require('../shared/git')
const { safePick } = require('../shared/safePick')
const { promisify } = require('util')

const mtimes = require('../shared/mtimes')
const fs = require('fs')
const chalk = require('chalk')

const opts = require('nopt')(
	{
		dry: [Boolean, null],
		push: [Boolean, null],
		branch: String,
		update: [String, null],
		pick: [Array, String],
	},
	{
		//
	},
)

const isDryRun = opts.dry === true
const shouldPush = opts.push === true

function safeGit(args, options) {
	return loggedGit(args, options, isDryRun)
}

async function run() {
	const toBranch = opts.branch

	try {
		const output = loggedGit(['rev-parse', '--verify', toBranch], {
			quiet: true,
		}).trim()

		if (output.trim().length === 0) {
			console.error(chalk.red(`Branch does not exist exists: ${toBranch}`))
			process.exit(1)
		}
	} catch (err) {
		// Continue
	}

	console.log(chalk.cyan('Getting current branch'))
	const currentBranch = loggedGit(['rev-parse', '--abbrev-ref', 'HEAD'], { fatal: true }).trim()

	console.log(chalk.cyan('Checking for dirty files'))
	const dirtyFiles = loggedGit(['status', '--short', '--untracked-files=no'], { fatal: true })
	const stats = {}
	if (dirtyFiles.length > 0) {
		console.log(chalk.cyan('Storing dirty file mtimes'))
		Object.assign(stats, mtimes.freeze(dirtyFiles).stats)
		console.log(chalk.cyan('Stashing changes'))
		safeGit(['stash', '--include-untracked'])
	}

	console.log(
		chalk.cyan(`Storing mtimes of files changed between ${toBranch} and ${currentBranch}`),
	)
	Object.assign(
		stats,
		mtimes.freeze(loggedGit(['diff', '--name-status', `${toBranch}...HEAD`], { fatal: true }))
			.stats,
	)

	const commits = []

	for (let commit of opts.pick) {
		if (commit.indexOf('~') >= 0) {
			commit = `${commit}...${commit.split(/~/)[0]}`
		}

		if (commit.indexOf('..') >= 0) {
			commits.push(...parseOutputLines(git(['log', '--pretty=format:%h', commit])).reverse())
		} else {
			commits.push(commit)
		}
	}

	try {
		console.log(chalk.cyan('Switch to branch and adding selected commits'))
		safeGit(['checkout', toBranch])

		if (opts.update) {
			console.log(chalk.cyan(`Updating with origin/${opts.update}`))
			safeGit(['pull', 'origin', opts.update])
		}

		for (const commit of commits) {
			await safePick(safeGit, commit)
		}

		if (shouldPush) {
			console.log(chalk.cyan('Pushing updated branch'))
			safeGit(['push', 'origin', toBranch.trim(), opts.force ? '--force' : undefined])
		}
	} catch (err) {
		console.error(chalk.red('Failed to complete'), err)
	}

	console.log(chalk.cyan('Switching back to original branch'))
	safeGit(['checkout', currentBranch])

	if (dirtyFiles.length > 0) {
		try {
			console.log(chalk.cyan('Restoring dirty files'))
			safeGit(['stash', 'pop'])
		} catch (err) {
			console.error(chalk.red('Failed to restore dirty files'), err)
		}
	}

	console.log(chalk.cyan('Restoring mtimes'))
	mtimes.restore(stats)
}

run().catch(error => {
	console.error(error)
	process.exit(1)
})
