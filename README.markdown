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

#### Arguments

* _optional_ `--name=` override the author/committer name
* _optional_ `--email=` override the author/committer email

---

### branches

Lists all local branches with their sha1 and the last time they were updated, sorted from oldest to newest.

---

### continue

~= `git rebase --continue`

Maintains the original author/date when editing commits during a rebase, rather than resetting the date and author.

#### Arguments

* _optional_ `--name=` override the author/committer name
* _optional_ `--email=` override the author/committer email

---

### follow

[A better `git blame`](https://blog.andrewray.me/a-better-git-blame/) that allows you to follow changes in a file throughout it’s history.

---

### log-short / ls

An abbreviated output of `git log` that displays a single line per-commit with the sha1, author, message and age.

#### Aliases

* log-short
* ls

---

### pick

~= `git cherry-pick`

Maintains the original author/date when cherry-picking commits, rather than resetting the date and author.

#### Arguments

* **required** `sha1` hash to cherry-pick
* or **required** `--continue` if the previous `git pick` command failed due to conflict, once resolved, you can use `git pick --continue`
* _optional_ `--name=` override the author/committer name
* _optional_ `--email=` override the author/committer email

---

### release-notes

Lists commits in release note format from oldest to newest.

---

### undo-commit

~= `git reset --soft HEAD~1`

Reverts the last commit without losing any changes.
