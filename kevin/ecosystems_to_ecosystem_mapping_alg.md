
## Background

`OX Tutor` creates immutable `Ecosystems` from `OX Cnx` and `OX Exercises` content.
These `Ecosystems` are associated with a `Course`,
and `Courses` maintain knowledge of their current and past `Ecosystems`.

`Tasks` (`Readings`, `Homeworks`, etc.) in `OX Tutor` are created from,
and associated with,
a specific `Ecosystem`.
As updated `Ecosystems` are added to a `Course`,
existing `Tasks` and their associated `Ecosystems` are unaffected.

### `Course` Stats

It will be necessary for `OX Tutor` to show a variety of summaries
of `TaskExercise` statistics
(number assigned, number completed, number correct, etc.)
to both teachers and students.

Because

* `Tasks` are constructed from, and associated with, a specific `Ecosystem`
* `Courses` add new `Ecosystems` as content (`OX Cnx` and/or `OX Exercises`) is updated
* `OX Tutor`'s UX desires content updates to be as painless as possible for end users

`OX Tutor` will automatically map 
elements (`LOs`, `PageExercises`, etc.) based on older `Ecosystems` 
to elements in the `Course`'s current `Ecosystem`.

If no corresponding element can be found
in the `Course`'s current `Ecosystem`,
the element will be mapped as an `orphan`.

This `Ecosystems-to-Ecosystem Map` will be computed
before the `Course`'s current `Ecosystem` is updated
to ensure that it is acceptable.

#### Per `LO`

#### Per `Page`

#### Per `Chapter`

## Assumptions

### Schema

## Mapping `LOs` to `LOs`

## Mapping `PageExercises` to `LOs`

## Mapping `PageExercises` to `Pages`

## Mapping `PageExercises` to `Chapters`



