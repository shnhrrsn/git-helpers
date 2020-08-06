# git-helpers

<!-- TOC -->

- [git-helpers](#git-helpers)
	- [Installation](#installation)
	- [Commands](#commands)
		- [amend](#amend)
					- [Arguments](#arguments)
		- [branches](#branches)
		- [continue](#continue)
			- [Arguments](#arguments)
		- [follow](#follow)
		- [log-short / ls](#log-short--ls)
			- [Aliases](#aliases)
		- [pick](#pick)
			- [Arguments](#arguments)
		- [release-notes](#release-notes)
		- [summary](#summary)
		- [undo-commit](#undo-commit)
		- [branch-from](#branch-from)
					- [Arguments](#arguments)
		- [pick-into](#pick-into)
					- [Arguments](#arguments)

<!-- /TOC -->

## Installation

```bash
cd ~
git clone git@github.com:shnhrrsn/git-helpers.git ~/.git-helpers
echo '[include]' >> ~/.gitconfig
echo '    path = ~/.git-helpers/gitconfig' >> ~/.gitconfig
```

## Commands

### amend

~= `git commit --amend`

Maintains the original author/date and doesn’t prompt for a commit message by default (you can optionally provide a new one via the standard `-m` flag).

#### Arguments

- _optional_ `--name=` override the author/committer name
- _optional_ `--email=` override the author/committer email

---

### branches

Lists all local branches with their sha1 and the last time they were updated, sorted from oldest to newest.

---

### continue

~= `git rebase --continue`

Maintains the original author/date when editing commits during a rebase, rather than resetting the date and author.

#### Arguments

- _optional_ `--name=` override the author/committer name
- _optional_ `--email=` override the author/committer email

---

### follow

[A better `git blame`](https://blog.andrewray.me/a-better-git-blame/) that allows you to follow changes in a file throughout it’s history.

---

### log-short / ls

An abbreviated output of `git log` that displays a single line per-commit with the sha1, author, message and age.

#### Aliases

- log-short
- ls

---

### pick

~= `git cherry-pick`

Maintains the original author/date when cherry-picking commits, rather than resetting the date and author.

#### Arguments

- **required** `sha1` hash to cherry-pick
- or **required** `--continue` if the previous `git pick` command failed due to conflict, once resolved, you can use `git pick --continue`
- _optional_ `--name=` override the author/committer name
- _optional_ `--email=` override the author/committer email

---

### release-notes

Lists commits in release note format from oldest to newest.

---

### summary

Total of lines of code in the current HEAD by author. Supports flags passed to `git blame` such as `-w`, `--indent-heuristic` and `--compaction-heuristic`.

---

### undo-commit

~= `git reset --soft HEAD~1`

Reverts the last commit without losing any changes.

---

### branch-from

`branch-from` creates a new branch from a set of commits. By default this branch will be created based on `origin/master`, however you can change the base branch via the `onto` argument.

All current changes, including untracked, will be stashed and then restored once this command finishes.

File times will also be snapshotted before any actions are taken and then restored after the command finishes.

#### Arguments

- _optional_ `--dry` test run to view commands, won’t actually modify git
- _optional_ `--push` push branch to origin
- _optional_ `--force` deletes branch if exists + force pushes to origin
- _required_ `--branch [name]` name of the branch to create
- _optional_ `--onto [branch]` defaults to `origin/master`
- _required_ `--pick [hash]` commit hash or range of hashes to pick into the new branch; can be used multiple times

---

### pick-into

`pick-into` is similar to [`branch-from`](#branch-from), however it works by using an existing branch rather than creating a new one.

All current changes, including untracked, will be stashed and then restored once this command finishes.

File times will also be snapshotted before any actions are taken and then restored after the command finishes.

#### Arguments

- _optional_ `--dry` test run to view commands, won’t actually modify git
- _optional_ `--push` push branch to origin
- _required_ `--branch [name]` name of the branch to pick commits into
- _required_ `--pick [hash]` commit hash or range of hashes to pick into the new branch; can be used multiple times
