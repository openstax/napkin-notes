## SPARFA Matrix Updates

### When to Run the Calculations

The `BL SPARFA Server`
should poll the `BL Scheduler`'s
[matrix update endpoint](https://github.com/openstax/biglearn-scheduler/blob/master/config/routes.rb#L5)
at least once every 10 seconds or so.
The endpoint will return
a collection of `ecosystem` uuids,
and for each of those uuids
SPARFA should be run.
An example of using this endpoint
[can be found here](https://github.com/openstax/biglearn-sparfa-server/blob/klb_api_expers/examples/matrix_calc_summary.py#L9).

### Which Calculation to Run

For each `ecosystem` uuid, we need to call
[this code](https://github.com/openstax/sparfa-sandbox/blob/master/klb_refactor/sgd/sparfa_algs.py#L261)
to compute `W` and `d`
and store them in the database.
We need to be able to find 
the latest `W`,`d`
for a given `ecosystem` uuid
or for a specific calculation uuid.

### Which Data to Use

#### Concepts

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
will just be the `page-module` uuid.

All of the information
to map `exercises` to `page-modules`
can be found in the information returned by `BL API`'s
[ecosystem endponts](https://github.com/openstax/biglearn-api/blob/master/config/routes.rb#L2-L4).
Examples of using these APIs
can be found
[here]()
and
[here]().

The book `TOC`
is represented by `book containers`
(e.g., unit, chapter, page)
which can be 
[arbitrarily nested](https://github.com/openstax/biglearn-api/blob/master/app/controllers/ecosystems_controller.rb#L58-L61).
A `page-module` is a `book container`
that is parent to no other `book container`.
Each `page-module` has associated 
[`exercise pools`](https://github.com/openstax/biglearn-api/blob/master/app/controllers/ecosystems_controller.rb#L62-L66)
which can be used to determine 
the concept for each `exercise`
in the given `ecosystem`.
For the SPARFA matrix calculations
we can use every available exercise,
so no need to worry about
[assignment types](https://github.com/openstax/biglearn-api/blob/master/app/controllers/ecosystems_controller.rb#L93).

Bottom line:
the list of concepts for a given `ecosystem`
are the uuids of the leaf nodes
of the `book container` tree.

