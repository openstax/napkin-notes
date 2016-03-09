# Problem Domain: Legacy Publish in the World of Cook HTML at Publish

This is a follow-on from Michael Mulich's analysis:  [Problem Domain: Cooked content failure to publication failure](https://github.com/openstax/napkin-notes/blob/753c3fd71164881cda185010c787c0ee312959a1/pumazi/cnx/problem-domain--cooked-to-failure.md)

## The Domain Description (cribbed from above Problem)

All publications of Pages (aka Documents and modules) that are used within
other books are setup to republish a minor version of those books. For example,
if Book A is published with a change to Page X, going from  v1 to v2, and Book
B at version 1.1 contains Page X at v1, Book B will be republished to version
1.2 and now include the latest published version of Page X.

The automatic republication behavior is always unrelated to the main
publication. But republished content could cause a failure in the cooked
content of a republication. **Previously all republications have only one
possible outcome of success.** The addition of CTE cooked content opens up an
unforeseen failure exit point. Thus, the assumption that a republish will never
fail is now invalid and the behavior is broken.

To ameliorate this, we will modify the "minor version republish" behavior
to work in seperate transactions, log failures, and move on.

## The Problem: What behavior does Zope need to change to accomplish this?

### Solution X: No change

**tl;dr**  No changes needed in Zope. Need to modify triggers in cnx-archive to
use the one-transaction-per-book-minor-version that cnx-publish will use.

On further analysis, the Zope system accomplishes the above "republish" silently,
by virtue or referencing a magic "latest" version of most content. Additionally,
The major/minor version numbers differ for collections/books between legacy and
rewrite. The minor versions that we are interested in here only exist, and are
created by, the code in cnx-archive that is fired when Zope stores code (in addition
to doing CNXML-> HTML transforms) 

We will need to extend the DB schema to track
books-that-would-exist-if-they-could-be-cooked, in any case.
