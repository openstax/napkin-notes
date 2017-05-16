## SPARFA Matrix Updates

### When to Run the Calculations

The `BL SPARFA Server`
should poll the `BL Scheduler`'s
[matrix update endpoint](https://github.com/openstax/biglearn-scheduler/blob/master/config/routes.rb#L5)
at least once every 10 seconds or so.
The endpoint will return
a collection of `ecosystem uuids`,
and for each of those uuids
SPARFA should be run.
An example of using this endpoint
[can be found here](https://github.com/openstax/biglearn-sparfa-server/blob/klb_api_expers/examples/matrix_calc_summary.py#L9).

### Which Calculation to Run

For each `ecosystem uuid`, we need to call
[this code](https://github.com/openstax/sparfa-sandbox/blob/master/klb_refactor/sgd/sparfa_algs.py#L261)
to compute `W` and `d`
and store them in the database.
We need to be able to find 
the latest `W`,`d`
for a given `ecosystem uuid`
or for a specific `calculation uuid`.
We only really need to store
the non-zero matrix entries,
but these matrices are relatively small
so whatever works best is fine for now.

### Which Data to Use

#### Concepts (`C_ids`)

In the past,
concepts were derived
from exercise learning objective (`LO`) tags.
Going forward, however,
concepts will be derived
from the book table of contents (`TOC`).
Specificially, 
there will be one concept
per `page-module`,
and that concept's name
will just be the `page-module uuid`.

The book `TOC`
is represented by `book containers`
(e.g., unit, chapter, page)
which can be 
[arbitrarily nested](https://github.com/openstax/biglearn-api/blob/master/app/controllers/ecosystems_controller.rb#L58-L61).
A `page-module` is a `book container`
that is parent to no other `book container`.

The list of concepts for a given `ecosystem`
contains the uuids of the leaf nodes
of the `book container` tree.

#### Questions (`Q_ids`)

Each `ecosystem` contains a 
[list](https://github.com/openstax/biglearn-api/blob/master/app/controllers/ecosystems_controller.rb#L76)
of `exercises`.
These `exercises` have versions,
but for now we can ignore them
and use the versionless 
[`group uuid`](https://github.com/openstax/biglearn-api/blob/master/app/controllers/ecosystems_controller.rb#L121).

The list of questions for a given `ecosystem`
contains these versionless `group uuids`.

#### Learners (`L_ids`)

The `BL API` server
[course event endpoint](https://github.com/openstax/biglearn-api/blob/master/config/routes.rb#L8)
can be used to retrieve
responses to questions
(example [here](https://github.com/openstax/biglearn-sparfa-server/blob/klb_api_expers/examples/course_event_summary.py#L14-L17)).

The list of questions for a given `ecosystem`
contains all the `student uuids`
for any `response`
to any `exercise`
associated with the given `ecosystem`.

(In the future,
if this gets too huge
we might choose to sample it.)

#### Hints (`hints`)

All of the information
to map `exercises` to `page-modules`
can be found in the information returned by `BL API`'s
[ecosystem endponts](https://github.com/openstax/biglearn-api/blob/master/config/routes.rb#L2-L4).

Each `page-module` has associated 
[`exercise pools`](https://github.com/openstax/biglearn-api/blob/master/app/controllers/ecosystems_controller.rb#L62-L66)
which can be used to determine 
the concept for each `exercise`
in the given `ecosystem`.
For the SPARFA matrix calculations
we can use every available exercise,
so no need to worry about
[assignment types](https://github.com/openstax/biglearn-api/blob/master/app/controllers/ecosystems_controller.rb#L93).

The `hint` for each `exercise`
is its associated `page-module uuid`
in the given `ecosystem`.

#### Responses (`responses`)

Each response from the `BL API server`
contains a `student uuid`,
an `exercise uuid`,
and a `sequence number`.
For matrix calculation,
we are interested in the _first_ `response`
of each `learner`
for each `exercise`
associated with the given `ecosystem`.

Note that the `exercise uuid`
in the `response` JSON
is _versioned_,
so it will need to be mapped
to a _versionless_ `exercise group uuid`.

#### Cost Function (`cost_func`)

We can choose whichever cost function we like.
For now, let's use
[Drew's](https://github.com/openstax/sparfa-sandbox/blob/master/klb_refactor/tests/test_sgd.py#L975-L980).
(Eventually this option will be set internally.)
