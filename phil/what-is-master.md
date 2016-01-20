# What is master?

Currently, it is "skimmed-over code" (not necessarily tested).

**Proposal:** It is tested code (at least lightly).

# Why is it scary for QA to merge code?

- "I don't want that responsibility"
  - Code would still go through code review **of course**
- "I don't want to be testing every little change; I want to batch them"
  - Code reviewers could still merge "non-hairy" Pull Requests
  - but would still need a way to deploy the PullRequest _with master merged in_ (`git fetch origin pull/${PR_NUMBER}/merge`)

Here's why it shouldn't be scary:

1. Accepting a ticket is a _better_ indicator for putting code in master than "the code reads well" (most of the time)
1. QA knows exactly what is going out (and can bring CS in earlier)
  - untested code does not "sneak in"
1. it's just as easy as clicking "Accept" on the ticket
  - BE and FE PR's can be tested and merged at the same time (automatically)


2 options for testing:

1. be able to easily deploy PR's to environments (devs _and_ QA can test)
1. use manifestly properly; **move** from QA -> Staging -> Production.

(actually, they're the same, except #1 is more verbose)



# Example: Change how feedback is sent

requires a change in react-components and tutor-server. trickles into:

react-components -> concept-coach -> webview (just commit sha changes)
tutor-server -> accounts

If we only test on master then we'll have to make a teeny-tiny commit in CC and webview which, it's inconceivable that it would be tested/reviewed before merging, so Folks just say "ok, I'll just merge" shortcutting the process for the sake of keeping the process.

This introduced an important loophole: Webview points to commits that may not exist in the future. If we delete the gh-pages branch then those commits in webviews' history will point to nowhere  (example, of course we could fix this 1 issue, but it's mostly to illustrate)


# Document when changes in multiple repos are tied together

(this was the cause of the production rollback. QA had a different set than production)

- Manifestly fixes this
- Linking tickets/issues to PR's gives QA a "heads up, we're breaking a bunch of stuff"

- If we use manifestly properly, then we *could* wait to merge to master until after code is released to production.
