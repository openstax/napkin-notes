
## Background

`OX Tutor` creates immutable `Ecosystems` from `OX Cnx` and `OX Exercises` content.
These `Ecosystems` are associated with a `Course`,
and `Courses` maintain knowledge of their current and past `Ecosystems`.
`Ecosystems` are built from various elements
(`Book`, `Chapter`, `Page`, `PageExercise`, etc.).

`Tasks` (`Readings`, `Homeworks`, etc.) in `OX Tutor`
are created from, and associated with,
a specific `Ecosystem`.
As updated `Ecosystems` are added to a `Course`,
existing `Tasks` and their associated `Ecosystems` are unaffected.

The UX for `OX Tutor` desires that
content updates be as transparent as possible
to the end users.
This means that `OX Tutor` will need to
automatically 'merge' information 
associated with elements in a `Course`'s past `Ecosystems`
to elements in its current `Ecosystem`.
Because content updates tend to be incremental and additive,
this process can be largely (perhaps entirely) automated.

It is possible that each `OX Tutor` use case
will need its own custom
`Ecosystems-to-Ecosystem Map` (`Es-to-E Map`),
but it seems likely that at most a handful of maps
could address all foreseeable needs.

Because `Ecosystems` are bounded and immutable,
all `Es-to-E Maps` can be computed
(and inspected/verified) in advance, 
before a `Course`'s current `Ecosystem` is actually updated.

In the event that an element from a `Course`'s past `Ecosystem`
cannot be mapped to an element in its current `Ecosystem`,
it will be considered an `orphan`
and placed in a special `orphan bin`.
Exactly how `orphan` are handled depends on the UX
for the affected `OX Tutor` use case.

## `Course` Stats

It will be necessary for `OX Tutor` to show
a variety of summaries of `TaskExercise` statistics
(number assigned, number completed, number correct, etc.)
to both teachers and students.
These statistics will be organized in several ways
(by `LO`, by `Page`, by `Chapter`, etc.).

#### Per `LO`

#### Per `Page`

#### Per `Chapter`

## Assumptions

### Schema

## Mapping `LOs` to `LOs`

## Mapping `PageExercises` to `LOs`

## Mapping `PageExercises` to `Pages`

## Mapping `PageExercises` to `Chapters`



