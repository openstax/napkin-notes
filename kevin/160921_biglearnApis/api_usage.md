## Creating an Ecosystem

Because all `courses` must have an associated `ecosystem`,
`Tutor` must create at least one `ecosystem`
before creating any `courses`.

An `ecosystem` consists of:
* an `ecosystem uuid` that identifies the given `ecosystem`
* a `book` attribute describing:
  * the `CNX uuid` and `CNX version` of the book (for reference) 
  * the `subject partitions` for the book
  * the contents of the book:
    *  nested `book containers` (units, chapters, page-modules, etc.)
    *  `exercise pools` associated with each `book container`
* `exercise` metadata for all exercises in the `book`
  * the `exercise uuid` that uniquely describes the `exercise`
  * the `Exercises uuid` and `Exercises version` (to allow `Biglearn` to deal with divergence as it sees fit)
  * the `los` associated with the `exercise` (these act as hints to `SPARFA`)

Each `book container` has a globally-unique `uuid`
(assigned by `Tutor`).

When `Tutor` tells `Biglearn` about a new `ecosystem`,
`Biglearn` will acknowledge the `ecosystem`
and mark its status as `processing`.
Once `SPARFA` computes the initial `W` and `d` matrices for the `ecosystem` (which could take several minutes),
`Biglearn` will update the `ecosystem`'s status to `ready`,
indicating to `Tutor` that the `ecosystem` can be assigned to a `course`.

References:
* request and response schemas for the `ecosystem` creation endpoint
* request and response schemas for the `ecosystem` status query endpoint

## Creating a Course

Because every `course` must have an associated `ecosystem`,
when a `course` is created, `Tutor` tells `Biglearn`:
* the `course uuid`
* the `course`'s initial `ecosystem uuid`

References:
* request and response schemas for the `course` creation endpoint

## Updating the Course Roster

When changes are made to a `course`'s `roster`
(or perhaps periodically, if the `roster` has changed),
`Tutor` will send the new `roster` to `Biglearn`.
The `roster` consists of:
* a `roster uuid`
* a `course uuid`
* nested `course containers` (sections, periods, recitations, etc.)
* `course`-specific `student uuids` for each `course container`

(We will probably need to revisit this if course rosters
begin to approach ~1000 students, or if students move
between `course containers` too frequently.
We could send deltas instead of full rosters,
but that imposes new requirements on message deliveries.)

References:
* request and response schemas for the `roster` update endpoint

## Creating/Updating Assignments

`Biglearn` only deals with `assignments` on a per-`student` basis
(so no `TaskPlans`, etc.).
This makes `Biglearn` independent of
the complexities of managing due dates, etc.,
for various groupings of `students`
for the price of more data being sent
from `Tutor` to `Biglearn`.
(This could become a problem if we
start supporting MOOC-like classes.)

An `assignment` update consists of:
* a `course`-specific `student uuid`
* an `assignment uuid`
* the `assignment`'s associated `ecosystem uuid`
* an `ecosystem pool moniker` ("hw", "reading", "pw", etc.)
* optional `opens_at` and `due_at` (to enable `exercise` exclusions)
* a set of teacher-assigned `book container uuids`
* a [possibly empty] set of teacher-assigned `exercise uuids`

If `Biglearn` has never seen this `assignment uuid`,
a new `assignment` will be created.
Otherwise, the existing `assignment` 
will be updated (effectively).

Each assigned `exercise` is given a `trial uuid`,
allowing `Biglearn` to identify exactly which
copy of a multiply-issued `exercise` is being answered.

## Working Assignments

### Student Responses

At a minimum, 
`Tutor` will send `Biglearn` 
information about every `student response`
recorded when "continue" or "submit" is pressed.

### Spaced Practice Exercises

`Biglearn` will keep a constantly-updated set
of SPEs available at all times for any
`assignments` that have not yet had them populated.
`Tutor` can request the latest set of SPEs from `Biglearn` at any time
(but probably once the 'core' `exercises` have been completed).

To choose the appropriate SPEs,
`Biglearn` will use its knowledge of:
* the `student`'s response history
* the `student`'s assignment history
* research parameters (especially the `k-ago map`)
* the `course`'s `ecosystem maps`

All SPEs will ultimate come from
the `assignment`'s associated `ecosystem`
(which might not the the `course`'s current `ecosystem`).

SPEs will (initially) be chosen from the appropriate `exercise pools`
using the PE algorithm.

### Personalized Exercises

Much like SPEs, `Biglearn` will maintain a set of PEs
on a per-`student` basis.
Tutor can ask for this set at any time
(but probably once the 'spaced practice' `exercises` have been completed).

## Performance Forecast

`Biglearn` will maintain `CLUEs` for each combinaton
of `book container` (chapter, etc.)
and `course container` (period, etc., down to individual `students`).
These `CLUEs` will be updated as `students` answer `exercises`
and as `assignments` are issued.

`CLUE` calculations will always omit
admin- and teacher-excluded `exercises`.

### Student

To avoid cheating,
the `student` view of `CLUEs`
will not include their responses
to not-yet-past-due `assignments`.

(NOTE: There are some corner cases related to SPEs where cheating could still occur.)

### Teacher

The teacher view of `CLUEs`
will always contain the most up-to-date `student` responses.

## Practice Widget

`Biglearn` will always maintain
an updated set of per-`student` `exercises`
that `Tutor` can use to create `practice widgets`.

In all cases,
admin- and teacher-excluded `exercises` will be omitted,
as will any `exercises` appearing in not-yet-past-due `assignments`.

### Practice a Specific Topic

`Biglearn` will maintain a set of per-`student` `exercises` 
for each `book container` (chapter, etc.)
definined the the `course`'s current `ecosystem`.

### Practice Worst Topics

Because of the ad-hoc nature of this feature,
`Biglearn` should maintain the per-`student` `exercise`
sets using its knowledge of `student` and `assignment` histories.
This will ensure that the appropriate `exercises`
are available to `Tutor` in a timely manner.

## Updating a Course's Ecosystem

As content updates are made,
we will need to update a `course`'s `ecosystem`
using the following process:
* `Tutor` creates a new `ecosystem` and informs `Biglearn`
* `Tutor` waits until the `ecosystem`'s status is `ready` on `Biglearn`
* `Tutor` tells `Biglearn` to prepare the new `ecosystem` using:
  * a `course uuid`
  * the target `ecosystem uuid`
  * a `course`-specific `ecosystem map`
  * NOTE: during this time, `Biglearn` will maintain all `CLUEs`, PEs, etc., for BOTH ecosystems
* Once `Biglearn` tells `Tutor` that the new `ecosystem` has been prepared:
  * `Tutor` updates the `course`'s current `ecosytem`
  * `Tutor` tells `Biglearn` to update the `course`'s current `ecosystem`
  * NOTE: If there is a delay updating `Biglearn`, there should be no problems since both `ecosystems` are being maintained.

Once a `course`'s ecosystem has been updated,
`Biglearn` will no longer update SPEs, `CLUEs`, etc.,
for the old `ecosystem`,
except for assignments whose SPEs and PEs
have not yet been assigned.

## Exercise Exclusions

### Global Exclusions

### Per-Course Exclusions

## Associating Students with Learners

## Archiving a Course Container

## Archiving a Course

