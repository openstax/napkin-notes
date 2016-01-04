# Workflow: "Be Less Busy"

(we don't have to use all these steps; this is just a "vision" :smile:)

- [Tutor](#tutor)
  - [Happy Path (FE example)](#happy-path-fe-example)
  - [Change Request / Blocker](#change-request--blocker)
  - [Bug Report](#bug-report)
  - [Hotfix](#hotfix)
  - [Partially Complete a Story](#partially-complete-a-story)
  - [Multiple Repositories](#multiple-repositories)
- [Book Content / Exercise Editing](#book-content--exercise-editing)
  - [Happy Path for Content Editing](#happy-path-for-content-editing)
  - [Exercises](#exercises)
- [CNX](#cnx)
- [Textbooks](#textbooks)
- [Customer Support](#customer-support)
- [Gantt Chart Structure](#gantt-chart-structure)

# Tutor

Roles: **Leads**, **UX**, **DevLead**, **Dev**, **QA**, **CS** (Customer Support), **Devops**, **Anyone**

Kanban Columns: `Triage`, `Ready to Design`, `Ready to Code`, `WIP` (Work in Progress), `Ready to Review`, `Ready to QA`

**Notation:** Roles are **bold**, sequences that are the same as the happy path just have `...`, and steps that are the same in the Happy-Path but are listed _for context_ are in <sub>smaller text</sub>

## Happy Path (FE example)

First, all the steps of getting a story out to the users. No hangups here; those come later.

1. **Leads**
  - write stuff in GDocs
  - convert epics to Milestones
  - convert stories to Issues with label "Story"
    - Issue label is: `[CC1.04.001] Story Title Goes Here`
    - contains checklist of items that need to be done by UX/FE/BE
    - move to `Ready to Design`, or `Ready to Code` column
1. **UX**
  - claims Issue (`#123`)
  - adds mockups to the Issue body
  - checks the "UX" item in the TODO section of the Issue
  - moves to `Ready to Code` column
1. **DevLead** assigns owner
1. **Dev**
  - moves `#123` to `WIP` column
  - codes...
  - creates a PR (`#234`)
  - adds `fixes #123` to PR body
  - chats `/deploy tutor-js#234 to dev` to test
  - adds `<tt>4</tt>` to mark the hours worked
  - checks the "FE" item in the TODO section of the Issue
  - moves PR (and automatically the Issue) to `Ready to Review`
1. **Reviewer**
  - checks code
  - tests code by chatting `/deploy tutor-js#234 to dev`
  - moves PR (& Issue) to `Ready to QA`
1. **QA**
  - chats `/deploy tutor-js#234 to qa` to test
  - merges the PR and closes the issue
1. **PM**
  - checks the Gantt Chart and sees where to help
1. **QA**
  - chats `/deploy tutor-js/master to staging` to doomsday test
  - chatbot responds with link to see all Issues that are in the commit diff
  - determines which tests need to be run from ^^^
  - tells testers to create issues with the label "doomsday"


## Change Request / Blocker

Anyone can suggest changes to a story. It should be easy, but include discussion with all interested parties.

1. **Anyone**
  - adds `Change Request` or `BLOCKER` label on the Story Issue
  - adds a comment describing the change/problem (`/cc @people`)
  - (discussion happens)
  - Issue body is updated
  - label is removed


## Bug Report

Anyone can submit a bug report. It should have detailed info on what happened, things like browser, OS, screen size, steps that happened, what was sent/received from the server to help diagnose.

1. **Anyone**
  - tests on a machine
  - creates a screenshot in the clipboard (_not_ "Save to Desktop", find the file, drag it into the right tab, drop it into the area)
  - clicks "Create Issue" in recordo
    - (could be configured to add a specific label like `doomsday-jan`)
  - creates an Issue
    - pastes the screenshot (from the clipboard) into the text box; easy-peasy
    - moves to `Triage` column
1. **DevLead** ...
1. ...

## Hotfix

A Hotfix needs to be based on what is on production but should end up on master.

1. **Dev**
  - checks production rev.txt to get production commit
  - creates new branch based on the commit
  - writes fix
  - tests by chatting `/deploy tutor-js/hotfix-branch-name to dev`
  - creates PR to `#master`
    - adds label `HOTFIX`
1. **Reviewer** ...
1. **QA** ...
1. **Devops** deploys the new commit to production


## Partially Complete a Story

Often an entire story cannot be completed as one PR.

1. **Leads** ...
1. **UX** ...
1. **DevLead** ...
1. **Dev**
  - ...
  - <sub>creates a PR (`#234`)</sub>
  - adds `refs #123` to PR body (_instead of `fixes #123`_)
  - <sub>chats `/deploy tutor-js#234 to dev` to test</sub>
  - ...
  - moves PR (but **not** the Issue) to `Ready to Review`
1. **Reviewer**
  - ...
  - moves PR (but **not** the Issue) to `Ready to QA`
1. **QA**
  - <sub>chats `/deploy tutor-js#234 to qa` to test</sub>
  - merges the PR but does **not** close the Issue
1. **PM** ...
1. **QA** ...


## Multiple Repositories

Many Stories require BE and FE changes which require changes in multiple repositories.
This is similar to "Partially Complete a Story".

1. **Leads** ...
1. **UX** ...
1. **DevLead** ...
1. **Dev** (BE)
  - ...
  - <sub>creates a PR (`#234`)</sub>
  - adds `refs #123` to PR body
  - ...
  - moves PR (and but **not** the Issue) to `Ready to Review`
1. **Reviewer** (BE)
  - ...
  - moves PR (but **not** the Issue) to `Ready to QA`
1. **Dev** (FE) ... same as BE **Dev**
1. **Reviewer** (FE) ... same as BE **Reviewer**
1. **QA**
  - chats `/deploy tutor-js#234 tutor-server#345 to qa` to test
  - merges the PRs and closes the Issue
1. **PM** ...
1. **QA** ...


# Book Content / Exercise Editing

The content team works with the CNXML content for books and Exercise spreadsheets that come in from W&N.

Some of the tasks are to fix CNXML/Exercise markup, publish the book/Exercises, update the downloadable PDFs, and update various websites like openstaxcollege.org.

## Happy Path for Content Editing

DMS' need to edit many CNXML files, quickly verify their changes worked, and then publish them in batch into Legacy CNX.

The _"magic"_ to generate the PDFs is: use GitHub's webhooks and a _simple_ **TransformService** instance. This generates a PDF **and** provides a link to the PDF whenever changes are made in GitHub. _<small>ex: See the little green checkbox or "Show all Checks" link in https://github.com/openstax/tutor-js/pull/914 . The link would go to the PDF instead</small>_

1. **Alina**
  - uploads the book from W&N (`complete.zip`) into the `textbooks` repository on GitHub
  - creates Issues which have checklists of things that need to be done (ie `#123`)
1. **DMS**
  - creates a branch using the GitHub website
  - edits online or uses `git` to download the books locally
  - creates a PullRequest
  - adds the text `fixes #123` to the body of the PullRequest
    - use `refs #123` if all the checklist items will not be completed yet
1. **TransformService**
  - notices the PR and generates PDFs for the books that changed (via webhooks)
  - puts a link to the PDFs in the GitHub PullRequest
1. **Alina**
  - reviews the PDF and CNXML
  - merges the PullRequest _<small>(which may automatically close the Issue)</small>_
  - chats `/publish textbooks/master:col11406_physics to staging.cnx` (so other people like tutor BE folks will see)
    - this uploads the new content stored in the GitHub repo into staging.cnx
    - _<small>(this could also be done automatically when the PullRequest is merged; the bot would just say so in `#deployments` chat channel)</small>_

## Exercises


# CNX

CNX workflow should be similar to tutor's. Some differences:

- it may be able to merge BE changes without the corresponding FE changes yet
- bugs come from the Internet, rather than internally, so no recordo, but rest should be the same


# Textbooks

Textbook development usually occurs on a long-running PR where all the **Dev**'s contribute.

Usually, work is done on a single book, or a family of books.

Sometimes, refactoring work is done which involves all the books.


# Customer Support

CS Needs to know what features are coming up, what bugs are fixed, and workarounds to tell users.

# Gantt Chart Structure

Eacch bar should show how many Issues are completed and what state they are in. The state color corresponds to the color of the label in GitHub (similar to pivotal's progress bars).

Each bar should contain the following colored segments (from the kanban columns):

`[{COMPLETED}{BLOCKED}{NEEDS_DESIGN}{NEEDS_DEV}{WORK_IN_PROGRESS}{QA}{uncategorized}]``

<!--
---

---

---

# STOP READING!!! BELOW ARE NOTES AND SCRATCHWORK

---

---

---


# Requirements gathering questions

(with examples. bold is the type of user answering the question and what I think they might bring up)

I'm interested in streamlining our ux/dev/qa/deploy/mgmt processes and am gathering data.

Could you describe:

1. Annoyances with your current workflow (listed in order of painfulness)
  - ie **mgmt** Difficult to see the project progress
  - ie **mgmt** Difficult to see how long tickets took to fix
  - ie **dev** Difficult to see what to work on next
  - ie **dev** Difficult to test changes (esp w/ CC widget and so many servers needed)
  - ie **dev** Difficult to keep ticket and GH in sync (cross i's and dot t's)
  - ie **dev** Difficult to know where to communicate or who to include
  - ie **dev** Difficult to reproduce bug report
  - ie **dev** Difficult to cherry-pick a change out of master without breaking other stuff
  - ie **dev** unsure a code fix will break something else
  - ie **REVIEWER** difficult to test code
  - ie **MGMT** ... know when Change request happens and notify others that it occurred
  - ie **QA** cannot test individual tickets (have to test in bulk everything that's on master)
  - ie **QA** unsure where to check when the specification changes
  - ie **QA** have to remember everything needed for dev to diagnose/reproduce
  - ie **QA/dev** pasting screenshots is annoying (clutters my desktop with files)
2. What is your ideal "happy path" workflow?
  - looking at what changes have been made since the last time something was deployed (commit (err.. PR) lists)
3. What is your ideal workflow when there is a time-crunch?
  - might want to test a batch of features at once instead of every little PR individually
4. What are some corner-cases from the ideal workflow?
  - ie **dev/deploy** releasing Hotfixes
5. What are parts of the process that could be automated (& who should automate them)
  - ie: **QA** dev should write tests and ??? should maintain Jenkins
  - ie: **dev** QA should write tests and ??? should maintain Jenkins
  - ie: **QA** should have easy way to collect all the data needed to create an issue

---

# Phil's Crazy Insanely Stupid Idea/Vision

Audiences:

- **PM**: Project Manager
- **DEVOPS**: devops person
- **DEV**: coder
- **QA**: Quality Assurance
- **SUPPORT**: Customer Support
- **MARCOM**: Marketing and Communication
- **FINANCE**

# 10,000ft view

1. Epics/Stories are made in GDocs, sucked into GitHub, and "Change Requests" are PullRequests
2. Epics are turned into GitHub Milestones
3. Issues are made in GitHub and easily moved into the correct repository (or there's 1 big issues repo)
4. PullRequests are strongly linked to Issues
5. Kanban board is used to "move" Issues from **PM** (unstarted) -> **DEV** (delivered) -> **QA** (accepted)
6. **QA** and **DEV**'s can deploy the code via an IM bot (write tests)
7. A code reviewer moves an Issue/PullRequest to **QA** (checks code/time/formatting)
8. **QA** merges Pull Requests when they are satisfied something works (writes/asks-for more tests)
9. **DEV**/**QA** log time by using a special formatting syntax in the Issue/PullRequest

- Communication:
  - about the issue goes on the Issue
  - about the solution (code) goes on the PullRequest
  - about other stuff is in the IM client


# Epics/Stories are made in GDocs, sucked into GitHub, and "Change Requests" are PullRequests

## Why?

- GDocs is a great way for people in a meeting to edit at the same time
- GitHub provides versioning
- PullRequests show exactly what the changes are (and can be done entirely via the website)
- PullRequests reduce the # of communication methods people have to know about
- PullRequests allow an easy, standard way of asynchronous notification/communication (which DEV's already have to use)


# Epics are turned into GitHub Milestones

## Why?

- **DEV** is far more likely to link code(work) with an epic, so...
- **MGMT** can see how far along parts of a project are
- **QA** can know what parts to test and which parts are not implemented yet


# Issues are made in GitHub and easily moved into the correct repository

(or there's 1 big issues repo)

## Why?

- It is easier for **DEV**'s to see
- _most_ issues fall into 1 repository...
- but not all, so we _might_ still need a _catch-all_ repo for those
  - this might be an indicator that the issue needs to be decomposed more
- having this separation shows which stories are not broken down properly

# PullRequests are strongly linked to Issues

## Why?

- Currently this is done in an ad-hoc way (remembering to put links to everything everywhere)
- If an Issue requires code in multiple repositories or depends on other issues you can quickly see all of the dependencies
  - ... because GitHub will show you all the references to the Issue when you look at it
- Merging a PullRequest is currently at the "Code Reviewer"'s discretion and imposes a linear history in the `#master` branch which seems pretty arbitrary; the order *should* be when **QA** has put its stamp-of-approval on it.

---

# Proposed kanban columns for an Epic(Milestone)

Syntax: `state-name (what-it-aplies-to) [WHO-PUTS-IT-IN-THIS-STATE -> WHO-LOOKS-AT-IT]`

- unstarted-or-rejected   [**MGMT**/**QA** -> **DEV**]
- work-in-progress        [**DEV** -> **REVIEWER**]
- blocked                 [**DEV**/**REVIEWER** -> EVERYONE_VIA_CC_COMMENTS]
- ready-for-review        [**DEV** -> **REVIEWER**]
- ready-to-qa             [**REVIEWER** -> **QA**/**SUPPORT**]
- accepted (Merged)       [**QA** -> **MGMT**/**SUPPORT**]
- accepted-but-revisit (Merged) [**QA** -> **QA**/**DEV**]

by default:

- **MGMT** sees: unstarted-or-rejected, accepted
- **QA** sees: ready-to-qa, accepted-but-revisit
- **DEV** sees: unstarted-or-rejected
- **REVIEWER** sees: work-in-progress, ready-for-review
- **SUPPORT** sees: ready-to-qa, accepted

(PHIL: Make dummy repositories and show in gh-board for tutor, textbooks, campaign)

---

# Other Workflows

## Textbooks
- coding
- Alina and content QA

## Responding to Users
- answer user emails
- update zendesk
- feedback on changes or potential "gotcha's" (heather/denver)

## Budgeting/Finance/Reporting

- how close are we to hitting target dates/$$$

---


# Alina reporting bot
# Greg reporting on PR's

## Why Selenium in JS
- Would be useful for Selenium to turn on "admin" assignment creation
  - allows creating an old draft, or already closed HW, or moving the dates; no need for timecop
- easier to get changes like that in if devs are working on Selenium


Automatic package upgrade tests done weekly
- easy to do if we have comprehensive tests (and QA can check)

Screenshots in the browser:

https://experiments.hertzen.com/jsfeedback/
Context: http://stackoverflow.com/questions/4912092/using-html5-canvas-javascript-to-take-screenshots and what google does/did: http://www.elliottsprehn.com/preso/fluentconf/#/slides/30


Things we can do automatically with a bit of elbow-grease:

- the commit version of all the repos
- the browser/OS info
- recent HTTP errors
- all the JS exceptions that were thrown
- recent set of elements that were clicked
- how the URL recently changed
- a "screenshot" of when the "Report an Error" button was pressed

Better cache invalidation on test servers...


[^convert-to-markdown]: http://thiscouldbejd.github.io/Gabriel/ (an app you can easily drop in to any GDoc, but does not post to org repos) or http://lifehacker.com/this-script-converts-google-documents-to-markdown-for-e-511746113 and example (which emails you when you run) https://docs.google.com/document/d/1iSk08hW2rd793xhcSDg_qUVoVjQvc4sBHY6w3Ik7tVA and
Example: https://github.com/philschatz/gdocs-convert-to-markdown2/blob/master/2015-12-10-_phil:-Copy-of-CC-Epic-08---Students-performing-assignments-(with-ConvertToMarkdown-script).md

-->

# Holiday Work

## What do people need to do with gh-board?

- [x] see how far along a set of milestones are (Gantt chart)
- [x] prioritize (star labels)
- [x] see what features will be (easier than were) deployed to QA before testing starts (use rev.txt in the comparison)
  - [x] show the list of **issues** included (via `/since/:sha/:sha`) (not the PR's; or maybe toggle option)
  - Example: http://philschatz.com/gh-board/#/r/openstax/tutor-js/since/v0.2.0/master
  - Screenshot and flow description: https://github.com/philschatz/gh-demo/issues/455
  - A message in `#deployments` would autogenerate this link so QA and/or devs can see
- [x] link an issue to a PR
- [x] see who's working on what
- [x] recordo can report a bug (proof of concept)
- [x] URL stores _all_ state
- [x] make all views based on the URL filters applied
- [x] get gh-board to handle multiple orgs
- [ ] show which PR's are missing info (time, link to issue in a milestone)
- [ ] show time spent on a milestone (maybe by user?)
- [ ] bulk add/edit tags
- [ ] search all/closed tickets (all repos)
  - dropdown with checkboxes to search a subset of repos
- [ ] merge a PR
- merge an issue (& all PR's)
- maybe reorder the backlog???
- show all the fixes pertaining to an issue (so QA can "merge" BE and FE tickets at the same time)
- [ ] deploy a ticket (all PR's that "fix" the ticket)
  - trigger a deploy from gh-board (GH tells you the deployment status)
- filter by tag (JS boolean logic?)
- bulk change milestone
- sync milestones across repos

## Proposal

- [ ] make sample repos with Issues for Alina, Alana, Epics docs, QA, CS, and Norm views
- [ ] mockups of an ideal flow from start-to-finish of a Story
- [ ] clean up this doc

## Deployments

- [ ] get hubot to deploy with commands like `/deploy tutor-js#123 to dev`

## Selenium

- [ ] add code coverage
  - [x] instrument the JS files with Istanbul
  - [x] record/concatenate the coverage info from all the tests
  - [ ] save a report file to coveralls or an `.lcov` file
- [ ] make common tasks
