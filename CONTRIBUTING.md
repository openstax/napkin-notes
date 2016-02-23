- [Git Hygiene](#git-hygiene)
  - [Use a Good Commit Message](#use-a-good-commit-message)
  - [Squash Commits](#squash-commits)
  - [Handling Merge Conflicts](#handling-merge-conflicts)
- [Testing](#testing)
  - [JavaScript](#javascript)

# Git Hygiene

Some guidelines for keeping your code in shape


## Use a Good Commit Message

[Use a good commit message](https://github.com/spring-projects/spring-framework/blob/30bce7/CONTRIBUTING.md#format-commit-messages)


## Squash Commits

The project doesn't need a record of you fixing whitespace and spelling mistakes in your PR. As a general rule of thumb, if a commit modifies a previous commit in the same PR, it probably needs to be squashed. That means that a PR may often only be a single commit. This makes rebasing (see below) easier, and keeps the history clean, which can make debugging infinitely easier in the long run.

- It's fine to make as many commits as you need while you're working on your local branch. Keeping your history clean as you work will probably be much easier than trying to do it all at the end, though.

- If you just want to make a change and have it apply to your last commit, you can use `git commit --amend`. If you want a change to be associated with an older commit, you can use `git commit -i HEAD~3` (where `3` is the number of commits to rebase). You can also use `git log` to find a commit's hash and `git rebase -i <commit hash>` (the commit should be the one PRIOR to the commit you want to modify).

- Interactive rebase (`git rebase -i`) will open your default editor in which you can replace `pick` with `fixup` or `f` to combine commits (you can also use this to reorder commits, mark commits to edit their commit messages, and other powerful tools which are explained in the file itself). Save the changes, and git will execute the rebase.

After rebasing, if your branch is already pushed up to GitHub, you'll have to force push the changes using `git push -f`, since the history has changed.

**Warning:** Only rebase your own branches.

**Warning:** **DO NOT REBASE HOTFIXES** Otherwise :bomb: :sparkles:



## Handling Merge Conflicts

Occasionally a Pull Request will have Merge Conflicts. **Do not merge master into your branch.** Instead, make sure your `master` branch is up to date:

```sh
git checkout master
git pull
```

Then rebase your branch on `master`:

```sh
git checkout _my-branch_
git rebase master
```

If there are any conflicts you need to resolve, it will suspend the rebase for you to fix them. Then do:

```sh
git add .
git rebase --continue
```

It will do one round of conflict-checking for each commit in your branch, so keeping your history clean will make rebasing much easier. When the rebase is done, your branch will be up to date with master and ready to issue a PR if you are.


# Testing

This section contains testing practices for the various languages used in openstax

## JavaScript

Use the diagnostics from `npm test` (tests are also run as part of `npm start` and any changes to a file are also tested if `npm start` is currently running). 
It's much easier to stay on top of issues as you make changes than trying to fix everything later. 
If you have `npm start` running, it can also sometimes be useful to run `npm test` in a separate process, which will analyze every file, and is the same tests that Travis CI runs on commits and PRs.
