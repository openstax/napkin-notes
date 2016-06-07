# Design: Collated content during post-publication

Design document for the conclusion of decisions made in:  [Problem Domain: Cooked content failure to publication failure](https://github.com/openstax/napkin-notes/blob/753c3fd71164881cda185010c787c0ee312959a1/pumazi/cnx/problem-domain--cooked-to-failure.md) & [Problem Domain: Legacy Publish in the World of Cook HTML at Publish](https://github.com/openstax/napkin-notes/blob/6580f97df81d40d2ef0a9a010cbf7a499ae5c1c5/reedstrm/problem-domain--coordinated-legacy-publish.md)

## Changes

No changes (from a human perspective) to the publication workflow will be made. But a new state will be appended to the internal process. This previously, in general terms, looked something like: `pre-publication -> (failure | publication)`. This will now append the post-publication process, which looks something like: `pre-publication -> (failure | publication -> post-publication)`, where publication still contains persistented and versioned content.

Since the post-publication process happens after publication, the data will be commited to the archive as a persisted and recorded version, even if it leads to a brown bag version (aka broken content). As such, the data now requires **post-publication states** (see also the *A final note* section).

The states needed in the post-publication process for both cnx-publishing-based and zope-based published content are:

 1. `current` (exists)
 1. `post-publication` (new) -- needing post-publication processing
 1. `processing` (new) -- being worked on by post-publication processes
 1. `errored` (new) -- having failed during post-publication processing

`cnx-publishing` will be modified to re-publish content containing `ruleset.css` resource files to the post-publication state. All other publications will proceed to the current state. This will cover all cnx-publishing publications.

`cnx-archive`'s re-publishing triggers will be modified to re-publish content containing `ruleset.css` resource files to the post-publication state. All other publications will proceed to the current state. This will cover all zope/legacy publications.

All post-publication tagged/flagged content will be consumed for post-publication processing (i.e. collation). The process that consumes the data can be a separate process that we will tentatively call the *post-publication worker*. The technical details of this are covered in the next section.

### post-publication process worker

The *post-publication worker* process will perform a loop to process post-publication tagged/flagg content. Within the loop, serveral operations can be run. While the content is being worked on within the loop, the content state will be updated to 'processing'. One of the operations within the loop will be collation, which will add collated content to the database. The process will update the content's state to 'current' or 'errored' before iterating to the next content item.

The looping will need to happen once during process startup to select all post-publication entries for processing. Another loop will listen (postgresql `LISTEN`) for notifications (postgresql `NOTIFY`) made during re-publication.

### re-publication process modifications

During an re-publication (either via zope or cnx-publishing) the logic will now be required to `NOTIFY` the post-publication channel, which is where the post-publication worker will listen for processing.

## A final note

IMNSHO this is not a long-term sustainable solution. Hanging state off what is otherwise considered fixed and persisted data does not seem like a very good idea. This collation business is now a required part of the publication process. Therefore it should be a valid part of the publication workflow, not a postfixed process.
