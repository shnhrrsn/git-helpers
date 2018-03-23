# git-helpers

## Installation

```bash
cd ~
git clone git@github.com:shnhrrsn/git-helpers.git ~/.git-helpers
echo '[include]' >> ~/.gitconfig
echo '    path = ~/.git-helpers/gitconfig' >> ~/.gitconfig
```

## Helpers

All helpers accept `--name=` and `--email=` as args to set the author/committer.

### amend

~= `git commit --amend`

Maintains the original author/date and doesn’t prompt for a commit message by default (you can optionally provide a new one via the standard `-m` flag).

### continue

~= `git rebase --continue`

Maintains the original author/date when editing commits during a rebase, rather than resetting the date and author.

### pick

~= `git cherry-pick`

Maintains the original author/date when cherry-picking commits, rather than resetting the date and author.
