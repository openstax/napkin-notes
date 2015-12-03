## What appears at the bottom of a `Concept Coach` `page`?

For `pages` with associated `CC exercise pools`,
there will a button
that indicates that `Concept Coach` exericses are available.

When the button is pushed,
the student is taken
to a page where they can view/complete exercises
in any order they wish.

For `pages` with no `CC exercise pools`,
there will be a 'finish' or 'continue' button
(or the like).

## How many exercises are issued?

Exercises are broken into two groups:
`core` and `spaced practice`.

The number of `core` exercises
will be chosen by Tutor(?),
and will cover the current `page`.

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
upon clicking the concept coach button 
at the bottom of the `page`.

We wanted to have the history update when the first problem was worked, but backend sends all problems at once and so 
it would be possible to click all buttons at the beginning of the class and then never receive spaced practice.

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

## What is the `k-ago-map`?

It's a list which describes
how many exercises to (attempt to) pull
from which `events` 
in the student's `event history`.
For instance,
one entry might say
to pull 2 exercises
from the `page` that was two `events` ago.

## Will the `k-ago-map` support `random-ago`?

Yes.

## How does `random-ago` work?

Once the student's `event history`
contains four past `events`
(the current `event` is excluded in this count),
a `random-ago` entry
will randomly choose `k`
and then randomly choose an exercise
from the associated `k-ago` `event`.

If no exercise is available
(considering other `k-ago-map` entries
and the desire to not duplicate exercise in a single `CC`)
this process can be repeated a fixed number of times.

If the retry limit is reached
and no exercise has been found,
the `event history` is searched backward in order
and the first usable exercise is selected.

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
