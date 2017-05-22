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

- pushing branches
- Webhooks/CI triggers
- Pull Requests
- https://githubengineering.com/scripts-to-rule-them-all/
- tags/releases

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
