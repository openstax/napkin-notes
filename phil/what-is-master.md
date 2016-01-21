# What is the `/master` Branch?

Currently, it is "skimmed-over code" (not necessarily tested).

**Proposal:** It is tested code (at least lightly by code reviewer or QA).

**Note:** We _should_ begin using manifestly properly; this document is only about the label of the bottom row in [JP's diagram](https://www.dropbox.com/s/uwp0jq8luo51uqw/release_candidates_v2.pdf?dl=0). I think a deploy to any env should add an entry to [deploy-manifests](https://github.com/openstax/deploy-manifests).

**Note:** If this is scrapped, I think:

- devs/leads still need to deploy `git fetch origin pull/${PR_NUMBER}/merge`
- it should be revisited when selenium tests cover most of the testrails tests

# Problem

Frequently, code that is deployed to dev/qa/production is **not** on `/master`. A "hotfix" is the common example for production.

1. Code that is in `/master` should have already been tested <small>(I think by someone other than the primary developer)</small>
  - If the code is in `/master` it's too late to discuss if the feature should go out
  - People that "Merge" the code frequently read but do not deploy it anywhere to test. The _only_ testing is done by the original developer.
    - Therefore, _when_ the merge occurs is relatively meaningless
1. CS/QA should know what changes might be going out beforehand so:
  - they can push back **before** it is merged in (too late)
  - begin updating docs, compose email drafts
  - QA's testing scope is at the mercy of the person pushing the "Merge" button
    - to get around this, Code Reviewers have to "hold back" merging <s>(PLANE:"holding pattern")</s>
1. **A** person should decide which features get merged in for the next release _before_ the PR(s) is/are merged <s>(PLANE:"air traffic controller")</s>
  - a "feature" occasionally contains code in multiple repositories
  - this historically worked OK because it lined up with team leads who know about the whole project **but not for long!** (see "Sustain Team")
1. Some testing needs to occur _before_ a PullRequest is merged in anyway
  - but the code that is tested **must** contain new code in `/master` since the PullRequest was started (`git fetch origin pull/${PR_NUMBER}/merge`)
1. FE now has a cascade of repositories that frequently need 1-line PR's just to meet the current flow
  - Example: a change in `react-components` requires 1-line PR's to: `tutor-js`, `concept-coach`, `webview` (see below for details)


# Why is it scary for QA to merge code?

- "I don't want that responsibility"
  - Code would still go through code review **of course**
- "I don't want to be testing every little change; I want to batch them"
  - Code reviewers could still merge "non-hairy" Pull Requests

Here's why it shouldn't be scary:

1. Accepting a ticket is a _better_ indicator for putting code in `/master` than "the code reads well" (most of the time)
1. QA knows exactly what is going out (and can bring CS in earlier)
  - untested code does not "sneak in"
1. it's just as easy as clicking "Accept" on the ticket
  - BE and FE PR's can be tested and merged at the same time (automatically)


# Options for Testing

1. devs _and_ QA should be able to easily deploy PR's (not commits) to environments
1. we should use manifestly properly; **move** from QA -> Staging -> Production

(actually, they're the same, except #1 is how manifests are created :smile:)


# Manifestly Usage

It documents when changes in multiple repos are tied together (this was the cause of the production rollback. QA had a different set of commits than production).

**Note:** If we use manifestly properly, then we _could_ wait to merge to `/master` until after code is released to production; see "hotfix".



# Example: Cascading 1-line PR's

a change in `react-components` requires 1-line PR's (just change sha) to: `tutor-js`, `concept-coach`, `webview`

If we only test on master then we'll have to make a teeny-tiny commit in CC and `webview`. It is inconceivable that it would be tested/reviewed before merging so folks just say "ok I'll just Merge", shortcutting the process for the sake of keeping the process.

This introduced an important loophole: `webview` points to commits that **will not** exist in the future. If we delete the `gh-pages` branch then those commits in webviews' history will point to nowhere. We can fix this 1 issue but it is an example to illustrate the problem of requiring that code must be merged to `/master` before being tested.


# Example chats of confusion

From Jan 21:

```
kajal [2:31 PM] I have the changes from cnx for wed release
      [2:31] Do we know the changes for Wednesday from FE and BE folks?
dante [2:46 PM] I can tell you the BE changes if you tell me the date of the last deploy
      [2:46] actually I can look it up...
kajal [2:47 PM] ok
phil [2:48 PM] what are the commits for the tutor/tutor-js wed release? (just whatever is on master right now, or yesterday@noon, yesterday@6p, or on qa)?
kajal [2:51 PM] yes
      [2:52] commits on qa
      [2:52] that are in qa right now
      [2:52] qa has master from yesterday I think
```
