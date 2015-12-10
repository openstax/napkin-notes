# Requirements gathering questions

(with examples. bold is the type of user answering the question)

I'm interested in streamlining our ux/dev/qa/deploy/mgmt processes and am gathering data.

Could you describe:

1. Annoyances with your current workflow (listed in order of painfulness)
  - ie **mgmt** Difficult to see the project progress
  - ie **mgmt** Difficult to see how long tickets took to fix
  - ie **dev** Difficult to see what to work on next
  - ie **dev** Difficult to test changes (esp w/ CC widget and so many servers needed)
  - ie **dev** unsure a code fix will break something else
  - ie **QA** cannot test individual tickets (have to test in bulk everything that's on master)
  - ie **QA** unsure where to check when the specification changes
  - ie **QA** have to remember everything needed for dev to diagnose/reproduce
  - ie **QA/dev** pasting screenshots is annoying (clutters my desktop with files)
2. your ideal "happy path" workflow
  - looking at what changes have been made since the last time something was deployed (commit (err.. PR) lists)
3. your ideal workflow when there is a time-crunch
  - might want to test a batch of features at once instead of every little PR individually
4. corner-cases from the ideal workflow
  - ie **dev/deploy** releasing Hotfixes
5. parts of the process that could be automated (& who should automate them)
  - ie: **QA** dev should write tests and ??? should maintain Jenkins
  - ie: **dev** QA should write tests and ??? should maintain Jenkins
  - ie: **QA** should have easy way to collect all the data needed to create an issue

---

# Phil's Crazy Insanely Stupid Idea

(it's an end-goal, and have not split up the steps yet)

Audiences:

- PM's
- devops
- devs
- qa

Here is my proposed ideal flow (vision):

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
