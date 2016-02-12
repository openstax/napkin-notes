Hypothes.is exploration discoveries
---------------------

I currently have Hypothes.is (H, for short) running locally and creating and storing annotations.  I'm running it by running `make dev`, but am running the dependent services from Docker.

It has some pretty large technical requirements for services that it depends on

 * Python 2.7.  Our (Tutor) servers are in Ruby, but BL is also Python.
   * I think we can share the Tutor session cookie with it, KarenC has investigated this.
 * Elasticsearch for storing and querying notes (we use Postgresql text search).  Intriguingly they're working on [a PR](https://github.com/hypothesis/h/pull/2946) to move to Postgresql for this.
 * NSQ for message passing.  We don’t currently use anything like this but are investigating Kafka.
 * They also use Postgresql for storing user accounts and other structured data.
   * I hope we can modify the Hypotheses DB schema to share users with Tutor.  I plan on creating a PG view that emulates the H user table and test this out once I get the UI figured out.

All of their documentation is written for using Docker containers, but it’s fairly straightforward to translate the instructions into what would be needed for running outside the container.

The annotation app (the pop-out sidebar) is written in Angular, and is loaded inside an iframe which is revealed when the sidebar is popped out.  The sidebar itself is powered by plain jQuery events as far as I can see.
 * Since it's jQuery it's easy to show/hide it using `window.annotator.frame.toggle(true/false)`

The really interesting bits of Hypothes.is are the third party libraries that they’ve integrated.  The highlighting annotations are powered by the open-source [Annotator Project](http://annotatorjs.org) and they are stored as web annotations using the [Text Quote Anchor library](https://hypothes.is/blog/supporting-open-annotation/).

I've added a script tag onto webview.html.erb that loads embed.js from the server.
 * Strangely script tag must be located after the csrf meta tag, otherwise it overrides them and crsf errors occur.
 * This loads the H sidebar on all Tutor views.
 * `window.annotator.destroy()` removes the sidebar, but then there's no way to re-create it
 * I've hacked in a reference to Sidebar so I could re-create it using identical arguments that main.js uses, but when I do so (after calling `destroy()`) the old app still has listeners bound and an infinitude loops between the two instances ensues.
 * So far I've been unable to figure out how they're observing DOM changes.  There are quite a few references on Github issues to a `dom-text-mapper` plugin, but I can't find any references to it in the current source.
   * It does notice when the DOM changes and the annotations indicator switches to the "detached" state.  Ideally I can somehow plug into this and reload the annoations for the new page when this occurs.  This may be difficult though since the annoations are loaded from the angular side of the app.


References:
 * https://h.readthedocs.org/en/latest/hacking/install.html
 * Entry point of app https://github.com/hypothesis/h/blob/master/h/static/scripts/annotator/main.js
 * Which then instantiates [Sidebar](https://github.com/hypothesis/h/blob/master/h/static/scripts/annotator/sidebar.coffee),
 * And that ultimately inherits from an instance of Annotator.js.
  * However H has written a custom store for Annotator that loads annotations using [CrossFrame](https://github.com/hypothesis/h/blob/master/h/static/scripts/cross-frame.coffee) from an Angular store.
  * Annotations are loaded when [frames is modified](https://github.com/hypothesis/h/blob/master/h/static/scripts/widget-controller.coffee#L60)
  * Meta issue for `dom-text-mapper`: https://github.com/hypothesis/h/issues/1000
