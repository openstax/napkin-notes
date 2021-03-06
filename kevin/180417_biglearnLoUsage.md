## Brief primer on SPARFA

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

## How do LOs get assigned to exercises?

LOs are added to exercises
as specially-formatted tags
by the Content team.
Ultimately, some human has to decide which, if any, LOs
apply to a particular exercise.
Over time, the mapping between LOs and exercises can change.
This happens when either:
* a new LO scheme is created and mapped to exercises, or
* a better mapping between LOs and exercises is found.

## LOs passed from Tutor to Biglearn

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
Tutor assigns the associated book `page-module`
as that exercise's LO.
(All exercises have at least one associated `page-module`.)

Tutor 
[passes](https://github.com/openstax/tutor-server/blob/c1bbc65a91188bd48b20e3e0b4a32930951540e8/lib/openstax/biglearn/api/real_client.rb#L136)
all LOs of all types,
as well as the associated `page-module(s)`,
to Biglearn.

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

## What if we Want to show CLUEs by LO?

Currently, we show CLUE by `page-module`.
If we wanted instead to show CLUE by LO,
we'd need to do some work.

First, we need to decide what "by LO" means.
Most likely we mean "by some specific LO scheme"
(e.g., AP LOs),
but this needs to be explicitly stated.

Secondly, we probably need to store this setting
on a per-course basis,
since different courses at different levels in different schools
will probably prefer different LO schemes.

Thirdly, Tutor would need to pass this information along to Biglearn.

Fourth, Biglearn would need to construct 
a per-course instance of the SPARFA matrices,
since the concept list would vary on a per-course basis.
(Steps for this are already being taken for unrealted reasons.)

Fifth, we'd need to update the UX of Tutor
to display CLUEs on a per-LO (of whatever scheme) basis.

Lastly, we'd need to adjust the above steps
if we intent to toggle between multiple CLUE displays
(e.g., by `page-module`, by LO, by AP LO, etc.).

In principle this can all be done,
but it's not going to be trivial.
