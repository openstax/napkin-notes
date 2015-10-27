## What appears at the bottom of a `Concept Coach` `page`?

For `pages` with associated `CC exercise pools`,
there will be an exercise `slider`.
Exercises in the `slider`
must be completed in order,
and only the next incomplete exercise is shown
(though past completed exercises
can be reviewed).

For `pages` with no `CC exercise pools`,
there will be a 'finish' or 'continue' button
(or the like).

## How many exercises are in the `slider`?

Exercises are broken into two groups:
`core` and `spaced practice`.

The number of `core` exercises
will be chosen by Tutor(?),
and will cover the current 'page'.

The number of _potential_ `spaced practice` exercises
will be determined by the `k-ago-map`
specified by Grimaldi.

The number of exercises in the `slider`
will be the sum of these two numbers.

## What goes into the `core` exercise group?

Exercises covering content on the current `page`,
chosen by Tutor
randomly(?) from the `CC exercise pool`
associated with the current `page`.

## What if we run out of `core` exercises?

This should never happen
because Tutor can detect that situation
in advance and compensate.

Tutor will not repeat exercises
within the same `event`,
so the number of issued `core` exercises
will be decreased to match
the number of available exercises
for the current `page`.

This will result in a reduction
in the number of `slider` exercises
shown for the page,
but the number will be consistent
(though not ideal)
once the student sees it.

## What goes into the `spaced practice` exercise group?

If the student's `event` history,
combined with the `k-ago-map`,
indicate that `spaced practice` exercises
should be issued,
then Tutor will fill
the `k-ago-map`-specified exercise slots
using exercises
from the `k-ago-map`-specificied `event`'s
`CC exercise pool`.

## What happens if we run out of `spaced practice` exercises?

Even though Tutor will not repeat exercises
within the same `event`,
it will repeat them across `events`
if necessary.
That being said,
if there are still not enough exercises
in a `page`'s `CC exercise pool`
to fill the slots
from the `k-ago-map`,
the unfilled slots will be re-allocated
behind the scenes
to either additional `core` exercises
or other `spaced practice` `events`.

## What is an event?

An `event` is a record of a single CNX `page` being read by a student.

## When does an `event` get added to the student's `event history`?

The current `page`
gets added as an `event`
in the student's `event history`
upon completion of the the first exercise
at the bottom of the `page`.

## When do the `spaced practice` exercises get populated?

At the moment the `event`
gets added to the student's `event history`.

## What if there are no exercises associated with a given `page`?

Then the`page` will never be added as an `event` 
in the student's `event history`
and will never have exercises at the bottom,
_even if_ 
spaced practice exercises
from past `pages`
are waiting.

## What about `pages` which are assigned together?

Each `page` is its own `event`, independent of the others.

## Can a `page` be to a student's `event history` more than once?

No.

## Will `Concept Coach` have personalized exercises?

No.

## What about content updates?

When a student accesses
a `Concept Coach` `page`
for the first time,
a Tutor assignment is made
which contains the exercises
that will (eventually) be shown.

Because this assignment
is linked to a specific ecosystem,
it will be unaffected
by future content updates.
