# Overview

Work on any system required a considerable amount of design and discussion, especially when conducted across departments or organisations. If they are not well organised however, it may lead to a considerable waste of effort.

Lacking an organised system of storage for agreed solutions will make them hard to find and easy to miss or forget. Lacking a good medium for discussion will stall progress.

# Existing solutions

Both organisations have used a number of systems to collaborate on designs, both internally and with each other. In author's opinion however they are either inefficient or inadequate.

- _Google Docs_: Google Docs have a comment system, but it supports only unformatted text, making technical discussion difficult. The documents themselves have no support for technical writing, and the extreme granularity with witch changes are tracked make it difficult to get an overview of how document changes. It's also impossible to see which comments were made before, and which after, a certain change.

- _Slack_: While Slack supports formatting and snippet sharing, both of which are improvements over Docs' comment system, the only way to create documents in Slack are _Posts_, and while those are slightly more suited for technical discussion than Google Docs, they support neither commenting nor change tracking. Additionally, due to Slack's chat-like nature, all discussion there is rather disorganised.

- _GitHub issues_: While issues benefit from GitHub's well designed comments system, they too benefit from a number of problems. Issues centre around the initial comment

- _Calls and verbal discussion_: they suffer all the issues of a chat discussion, but unless someone's taking notes they also leave no written trace, making coming back to them difficult, and outright impossible for new people to join.

# The RFC process

As a solution to this problem we propose to establish a kind of a _Request For Comments_ process, centred around Markdown documents and GitHub's pull requests.

An RFC would begin as a Markdown document, such as this one, being submitted as a pull request against a repository housing RFCs. It would then be improved and refined through a public discussion, until all interested parties agree with the proposal, in which case the pull request is merged, agree to drop the proposal, in which case the pull request is closed, or agree to postpone the RFC.

# Rationale

## Why RFCs

Having all agreed upon solutions in one place makes it easy to, amongst other things, check if an issue or idea was discussed before, to check why it was accepted or rejected, to locate a particular idea or solution one is looking for, or to coordinate cross-project development. Many of those things are very hard to accomplish with alternatives.

The RFC process itself is well tested, and has powered development of many successful technologies.

## Why Markdown

Markdown, while by no means a perfect markup language, has a number of advantages over its alternatives. Markdown is a well known language, even amongst non-technical folks, and it's easy to learn for those who don't yet know it, it has an excellent support on GitHub, being its primary markup language, and it has been successfully used for technical documentation.

## Why GitHub and pull requests

For finished RFCs a public repository makes them easy to access, link to, share, and search. GitHub makes those task even easier with a number of tools build for those purposes.

For RFCs in process, pull requests provide a structured discussion space centred around a particular RFC, with GitHub's advanced commenting system and changes tracking that makes it easy to get an overview of RFC's evolution, including which parts of discussion took place before or after a change in the RFC.

# Alternatives

## GitHub wikis

While GitHub wiki pages are technically Git repositories containing Markdown (or other) documents, they provide no way of reviewing or discussing proposed changes. This would mean that any discussion would have to take place *within* a proposal, or as a separate wiki page, essentially giving little advantage over eg. Google documents.

# Unresolved questions

- Should RFCs be stored in a separate repository, or within an existing repository, such as openstax/napkin-notes?

# Future work

This RFC provides only an overview of the process and rationale for implementing it. Details of how the discussion, RFC acceptance or rejection, and other thins should be agreed upon in a follow-up RFC.
