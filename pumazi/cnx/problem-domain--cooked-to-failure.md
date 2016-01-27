# Problem Domain: Cooked content failure to publication failure

## The Domain Description

The cooked content procedure introduced in the Common Textbook Experience (CTE) work
will be invoked by two different applications: 1) Zope (aka legacy) and 2) cnx-publishing

The Zope invocation will take place as an underwater HTTP request to cnx-publishing. The change to Zope is to add a UI element (button) and a python script to make the HTTP request to cnx-publishing.

The cnx-publishing invocation will take place during publication. The cooked content procedure is considered part of the publication's state, which means that it will affect the final state of the publication (e.g. success or failure).

Additionally, any publication that takes place in either application potentially invokes one or more republications of shared content. (See the Problem section for more detials.)

## The Problem

All publications of Pages (aka Documents and modules) that are used within other books are setup to republish a minor version of those books. For example, if Book A is published with Page X and Book B at version 1.1 contains Page X, Book B will be republished to version 1.2 and now include the latest published version of Page X.

The automatic republication behavior is always unrelated to the main publication. But republished content could cause a failure in the cooked content of a republication. **Previously all republications have only one possible outcome of success.** The addtion of CTE cooked content opens up an unforeseen failure exit point. Thus, the assumption that a republish will never fail is now invalid and the behavior is broken.

## The (Possible) Solution(s)

The question is, do we consider the cooked content procedure a factor in the overall publication success? The answer must be yes, because otherwise we end up with broken versions of content, which would lead to behavioral ticks (e.g. pre-publishing a version of the content on a QA system before working on it within the production site).

### Solution Y

**tldr;** We remove the republish behavior in favor of a notification to the authoring system.

Remove the problem by removing the behavior that causes the problem. By removing the republish behavior that happens as part of all publications, we remove any possible failure. This leaves means a publication will never fail from unrelated circumstances.

We will notify the authoring system(s) (i.e. cnx-authoring) via a callback point. This part isn't fully fleshed out, but I (pumazi) have design design notes around subscription services for authoing systems.

The idea is to notify the authoring systems rather the users. The authoring systems can take whatever measure they would like to notify the users.

Currently, our *user notification system* is slightly unequipped to handle this scenario without looking like a spam bot. See [Implement an internal Accounts messaging system](https://trello.com/c/NuDqhk26/17-implement-an-internal-accounts-messaging-system) for ideas on an ideal user notification system.

### Solution H

**tldr;** We try the republish behavior. If a failure occurs, we notify the authoring system.

This is similar to Solution Y except that we try to republish the content but gracefully fail and fall back to notifying the authoring systems.

There is still a problem with this solution. It's now always going to be obvious/clear-cut that the RuleSets have succeeded or failed. Therefore, it may be better to always leave the republication up to the user.
