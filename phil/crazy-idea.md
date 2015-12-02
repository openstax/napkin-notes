# Phil's Crazy Insanely Stupid Idea

(it's an end-goal, and have not split up the steps yet)

Audiences:

- PM's
- devops
- devs
- qa

Here is my proposed ideal flow (vision):

1. **PM's** create stories and epics in GDocs
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

- add support for `deploy [X] to [Y]`
  - support environment variables to configure which servers to use or rake tasks to run

## gh-board

- ability to move tickets to a different repo
- stats page based on milestone(s) (epics)
