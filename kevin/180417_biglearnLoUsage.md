## Brief Primer on SPARFA

In what follows:
* L = number of learners
* Q = number of questions
* K = number of concepts

SPARFA decomposes a partially-filled gradebook
(a table with Q rows and L columns)
into three pieces:
* a question-concept mapping table (K rows and Q columns)
* a student-concept mapping table (K rows and L columns)
* a question difficulty vector (Q rows and 1 column)

To perform this decomposition,
SPARFA needs to know 
how many concepts it should use.
It also needs to seed its calculation
of the conceptual content of each question
with some sort of initial guess(es).
This is where LOs come into play.

## How Do LOs Get Assigned to Exercises?

LOs are added to exercises
as specially-formatted tags
by the Content team.
Ultimately, some human has to decide which, if any, LOs
apply to a particular exercise.
Over time, the mapping between LOs and exercises can change.
This happens when either
(a) a new LO scheme is created and mapped to exercises
(b) a better mapping between LOs and exercises is found.

## LOs Passed From Tutor to Biglearn

To avoid having exercise and content edits
go directly into production without any sort of review
(which definitely was never the case in the past for sure...),
Tutor creates snapshots of a book
and its associated exercises.
These snapshots are called `ecosystems`,
and act as the basis of Tutor and Biglearn processing.

When Tutor creates an `ecosystem`,
it extracts the LOs from the tags on each exercise.
If an exercise has no LOs,
Tutor assignes the associated book `page-module`
as the exercise's LO.
(All exercises have at least one associated `page-module`.)

Tutor 
[passes](https://github.com/openstax/tutor-server/blob/c1bbc65a91188bd48b20e3e0b4a32930951540e8/lib/openstax/biglearn/api/real_client.rb#L136)
all LOs of all types to Biglearn.

## LO Usage Inside Biglearn

Currently, Biglearn ignores LOs and
[uses only the exercise `page-module(s)`](https://github.com/openstax/biglearn-scheduler/blob/master/app/domain/services/fetch_ecosystem_events/service.rb#L169)
to form its list of concepts.

There are several reasons for this.
Previously, all LOs from any LO scheme ("regular", AP LOs, etc.)
that were ever assigned to any version of any exercise
were simply added to Biglearn's concept list.
This led to a proliferation of LOs
that caused problems for SPARFA.
One problem was that the runtime for SPARFA 
is sensitive to the number of concepts,
and having that number grow in an unbounded way
was crippling the algorithm.
Another was the increase in the number of degrees of freedom
compared to the amount of data we were able to collect,
along with the inherent redunancy in the different LO schemes,
which led to wildly fluctuating results
that were hard to interpret consistently.

By limiting the list of concepts
to just the associated `page-modules`,
we have enough answered exercises per concept
to produce consistent results.
Also, the current UX for Tutor
only shows CLUEs on a per-`page-module` basis,
so this arrangement packs the maximum amount of information
into each display.
