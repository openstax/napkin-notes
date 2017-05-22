Intro to GitHub & Git

# GitHub for folks

It's not just for code!

## Overview
- it stores files in folders
- has **Issues** for tracking bugs/features (and Milestones)
- you can "suggest changes" (**Pull Request**) for people to review
- uses **Markdown** to write
- has **hooks** for other services to run when you change files
- change your email notifications at https://github.com/settings/notifications and https://github.com/watching


## Workflows

### Edit a file

1. find the file (or create a new one)
2. click edit (I will link to another document)
3. Preview changes
4. create a suggestion (**Pull Request**)
5. add **Reviewers**

### Comment on a file/Issue

1. **Checklists** (`- [ ] my item`)
1. Take a **Screenshot** (suuper easy)
2. link to another Issue/Pull Request (`#123`)
    - on another repo (`openstax/tutor-js#123`)
    - this creates a backlink too!
3. write `fixes #123, #456` to automatically **close an Issue** when the Pull Request is merged
    - can be done in the Pull Request body *or* the commit message
4. Change the Issue Template (located in `/ISSUE_TEMPLATE.md` or `/.github/ISSUE_TEMPLATE.md`)


---

# GitHub for devs

- pushing branches (no one knows until you make a Pull Request)
- Pull Requests
    - make sure the comments are about the code
- Webhooks/CI triggers
    - not just for unit tests (deployable tarballs, updated style guides)
    - also tests as-if-the-commit-was-merged-to-master
- try to increase Code Coverage
- spend a little extra time to write Tests
    - your future self will thank you
- https://githubengineering.com/scripts-to-rule-them-all/
- When to merge?
    - could be after QA reproduces the feature/fix
- Hotfix procedure. Sometimes master has changed but you don't want to release it yet
    1. branch off the sha/tag and create a PR to master
    2. deploy the branch commit to production
    3. merge the PR
- Link Trello card to the Pull Request
    - just drag the PR URL on top of the trello card (in a different browser tab)


## Some suggestions

- Create Pull Requests **early** for a couple of reasons:
    - reviews can be async
    - lets people know what you are working on
- Add a reviewer(s) so they get notified
- Wait at least a few hours so people can comment/contribute before merging
- `@mention` people that might be affected/interested (in the PR description)


---

# Git

Analogy: it is like a tree; new growth (commits) occurs at the leaves, branches are ... branches in the tree, tags are like etched marks on the tree.

- a branch is just a pointer to a commit that changes (as you make commits)
- a tag is like a branch except that it does not change
- commit
- a **merge commit** creates a new commit at the leaf
- a **rebase** (from another branch) will "replay" those commits into your branch _as if you had started working on that branch
    - **(wonky if other people edit the Pull Request)** - Phil doesn't like rebase

- Try to make commits when the tests pass. Then later, it is easier to find when a bug occurred (by bisecting the commit history)


# :squirrel:

You made it this far! Have some links!

- http://philschatz.com/windmill/
- [Skipping Stones](http://www.puzzlescript.net/play.html?p=d6fd6fcf84de185e2584)
- [Beam Islands](http://www.puzzlescript.net/play.html?p=11359118)
- Message `@phil` in `#watercooler` for more (if that is your cup of :tea:)
