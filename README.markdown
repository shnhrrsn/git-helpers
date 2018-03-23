# git-helpers

## Installation

```bash
cd ~
git clone git@github.com:shnhrrsn/git-helpers.git ~/.git-helpers
echo '[include]' >> ~/.gitconfig
echo '    path = ~/.git-helpers/gitconfig' >> ~/.gitconfig
```

## Documentation

### amend

~= `git commit --amend`

Maintains the original author/date and doesn’t prompt for a commit message by default (you can optionally provide a new one via the standard `-m` flag).

Accepts optional `--name=` and `--email=` flags to override the author/committer.

### branches

Lists all local branches with their sha1 and the last time they were updated, sorted from oldest to newest.

### continue

~= `git rebase --continue`

Maintains the original author/date when editing commits during a rebase, rather than resetting the date and author.

Accepts optional `--name=` and `--email=` flags to override the author/committer.

### log-short / ls

An abbreviated output of `git log` that displays a single line per-commit with the sha1, author, message and age.

### pick

~= `git cherry-pick`

Maintains the original author/date when cherry-picking commits, rather than resetting the date and author.

Accepts optional `--name=` and `--email=` flags to override the author/committer.

### release-notes

Lists commits in release note format from oldest to newest.

### undo-commit

~= `git reset --soft HEAD~1`

Reverts the last commit without losing any changes.
