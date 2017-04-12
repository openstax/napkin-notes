# Planning For Post-Publication Process Adjustments

## Current State Of Affairs

The post-publication processes is a way to sequentially baking content after publication. Publication is the sequence of actions that version content from a authoring source (zope or authoring) and make those results visible to end-users. The post-publication baking is a set of actions that compile/mix the content into a final and intended state for better end-user consumption.

Technically speaking the post-publication process is done in a very sequential order that is determined by whatever is currently in the 'post-publication' module-state. It processes one item at a time and it is believed that this procedure would fail if cloned. Overall, it has served us well as a development solution but it is believed to be inadequate for production usage.

## Adjustments To Be Made

The following (subsection headers as tasks) are a series of items that will make the collation & numbering Common Textbook Experience (CTE) work that deals with automating the invocation of "baking" as a post-publication process production ready.

This adjustments would change the above definition to:

The ~~post~~**in**-publication process is a way to ~~sequentially~~ **asynchronously** baking content ~~after~~ **during** publication. Publication is the sequence of actions that version content from a authoring source (zope or authoring), **bake this contents into a final result** and make those results visible to end-users. The ~~post~~**in**-publication baking is a set of actions that compile/mix the content into a final and intended state for ~~better~~ end-user consumption.

Note, we are moving toward the belief that "baking" is going to be a necessary part of publication. We had previously decided that the baking procedure was optional, since it would conflict with the existing publication behavior. We are starting to have both confidence in the baking procedure and a better understanding of the gravity of this feature. With that understanding and confidence we now believe all books will likely go through some degree of baking before they are fully published. In the future we will likely push for baking as a prerequisite to publication. We will attempt to make this work flexible enough to adjust to baking as a prerequisite of publication.


### notify with a payload

- `NOTIFY` with a payload containing the publication identifier

### modify to utilize payload rather than query

- Adjust the proc to queue up items on startup using a query
- Adjust the proc to process items from the notification payload

### implement celery framework for job processing

- implement current baking functions as celery task functions

### document new post-publication procs for devops

- document how to run the celery worker

### add new celery worker proc to cnx-deploy

- define the celery worker proc within the publishing role of cnx-deploy

## Vision Of The Future

The idea for the future is to change to a subscription event model. Essentially, this will notify subscribing services when an event has happened. For example, after a successful publication has happened the PDF production service will be notified of a new publication that needs a PDF built. This allows our services to be de-coupled from the primary logic of a publication while still reaping the benefits of additional tooling.

The specific subscription model we intend to use is one known as webhooks. Inhouse or third-party services would provide an API for recieving subscription notifications in the form of HTTP requests. They are then able to utilize this information as they see fit.

The PDF production service is an example stand-alone service that would subscribe to publishing events. On publishing completed, this service would recieve information about the content (i.e. identifiers) in order to build a PDF of the content. It would then use the publishing API to include this artifact with content record.

The overly simplified activities to happen in the publishing app are:

- notify of an in-progress publication event
- adjust publishing to require baking before publication is sucessful.
  - remove latest_modules trigger
  - adjust post-publication proc to in-publication
  - inline in-publication function inside cnx-publishing code, thus making the in-publication proc a legacy compatible shim
  - adjust publication procedure to insert latest_module records on a successful publication, which includes the baking process
- notify of a publish completed event
- subscribe to the publish completed event with a webhooks processing function
  - function takes a publication identifier as the argument
  - function POSTs requests to registered subscribing services
