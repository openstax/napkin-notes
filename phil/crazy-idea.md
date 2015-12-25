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

I know GitHub's API like the back of my hand. Learning a bunch of other API's to pull data out would be annoying/impossible.


# Proposed ideal flow (vision)

1. **PM's** create stories and epics in GDocs
2. GDocs are converted to MarkDown and added to a GH repo so "Change Requests" (PR's) can be made [^convert-to-markdown]
2. **Norm** pushes a button to create tickets in the various repos (Norm has some export thingy/process)
  - if it's BE then it goes into tutor-server by default
  - the title is `[CC2.001.123] Title`
  - it is automatically assigned to a milestone (epic)
  - let's say the ticket id is `#123`
3. **developer** creates a _WIP Pull Request_
  - the title of the PR says `Fixes #123`
  - let's say the PR id is `#234`
4. **developer** tests by chatting with hubot and saying `deploy tutor-js#234 to dev`
5. **developer** moves the PR (and automatically, the issue) to a "Review" kanban column
  - and puts in the PR/issue the time spent
6. **code reviewer** checks the code and moves the PR (and automatically, the issue) to a "QA" kanban column
7. **QA** tests by chatting with hubot and saying `deploy tutor-js#234 to qa`
8. **QA** merges the pull request
  - The issue is automatically closed
9. **Devops** at some point pushes to production

# Differences from "Ideal"

- **QA** could reject the PR. They would move the ticket (and automatically, the PR) back to another kanban column (WIP, rejected, whatevs)
- **developer** could mark the ticket as a duplicate (by linking to the other ticket)
- **developer** could mark the PR as blocked by adding a label


# Pitfalls

## What if the ticket is in the wrong repo?

- gh-board has the ability to move a ticket from 1 repo to another (Create with a link to the old issue, close the old issue)

## What if we need to add a new story?

- Create it in the GDoc and tell **Norm** to "Press the export button"

## How can I see the progress of each epic?

- I'll make a gh-board screen that pulls all open/closed tickets in a milestone and time spent to make a graph

## What about bugfixes?

- **developer** does the usual (find the commit on prod, open a new PR to master) but the command to hubot for them and **QA** changes to be "deploy to dev nomerge" (so the latest master isn't used)

## What about textbook development?

## What about helping QA know what to target (from looking at the files changed)?

- the `src/` directory names correspond to the different screens in the app.

# TODO's

## hubot

- add support for `deploy [X] to [Y] [nomerge]`
  - support environment variables to configure which servers to use or rake tasks to run

## gh-board

- ability to move tickets to a different repo
- stats page based on milestone(s) (epics)


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


# Holiday Work

## What do people need to do with gh-board?

- [x] see how far along a set of milestones are (Gantt chart)
- [ ] show which PR's are missing info (time, link to issue in a milestone)
- [ ] show time spent on a milestone (maybe by user?)
- [ ] bulk add/edit tags
- [ ] search all/closed tickets (all repos)
  - dropdown with checkboxes to search a subset of repos
- [ ] prioritize (star labels)
- [ ] merge a PR
- [ ] see what features will be (easier than were) deployed to QA before testing starts (use rev.txt in the comparison)
  - [x] show the list of **issues** included (via `/since/:sha/:sha`) (not the PR's; or maybe toggle option)
  - Example: `http://philschatz.com/gh-board/#/r/openstax/tutor-js/since/v0.2.0/master`
- [x] link an issue to a PR
- [x] see who's working on what
- merge an issue (& all PR's)
- maybe reorder the backlog???
- [x] recordo can report a bug (proof of concept)
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
- [ ] make common tasks

