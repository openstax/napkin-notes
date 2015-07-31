
## Tutor Creates an Ecosystem

An `Ecosystem` is a static snapshot of 
a fully-versioned `OpenStax Cnx` book 
and 
a set of associated fully-versioned `OpenStax Exercises` exercises.

### Setup

#### Using a Cnx Book Id and an Exercise Manifest

Because fully-versioned content on `OpenStax Cnx` and `OpenStax Exercises` is immutable, 
an `Ecosystem` can be fully specified by

* a fully-versioned `OpenStax Cnx` book id
* a manifest of fully-versioned `OpenStax Exercises` exercise ids

The exercise manifest only needs to contain exercises associated with the given book.

#### Using a Cnx Book Id and a Timestamp

Because generating an exercise manifest by hand would be tedious and error-prone,
`OpenStax Exercises` will provide an API query endpoint
that will return the latest versions of exercises meeting the query specification
as of the given timestamp.

Note that the timestamp must be in the past
to act as an alias for a unique exercise manifest.

### Process

Given the book id and exercise manifest, 
`Tutor` will query 
`OpenStax Cnx` (for the content of the book and its associated pages)
and 
`OpenStax Exercises` (for the content of the exercises).

`Exercises` will be parsed for their `LOs` and `Tags`.

`Book` content will be parsed for its table-of-contents (which will determine `Chapter`/`Page` titles and numbering).

Each `Page` will be parsed for its `LOs`.
These `LOs` will be used to associate `Exercises` with `Pages`
and, along with `Exercise` `Tags`,
be used to create several purpose-specific `Exercise` pools.

`Pages` will be split into `Fragments`.  Some `Fragments` could have their own purpose-specific `Exercise` pools.

### Additional Concerns

#### Multiple Ecosystems

Because there are no interactions between `Ecosystems`, there is no problem with having several of them simultaneously. 

It is worth noting that,
even though `Ecosystem` are logically independent,
it is anticipated that the content of many `Ecosystems` will overlap significantly.
This overlap provides `Tutor` with many opportunities
for caching content and
sharing immutable resources between `Ecosystems`.

#### Reproducibility

To simplify the process of re-creating `Ecosystems` in different deployment environments (production, QA, dev, etc.), 
`Ecosystem` specification (book id and exercise manifest) should be easily retrievable.

To ensure accuracy of the retrieved specification, 
`Ecosystem` creation should fail
if the specified `OpenStax Cnx` and `OpenStax Exercises` content is unavailable
or is somehow invalid.

#### Ecosystem Validation

Whenever practical, `Ecosystems` should be validated as much as possible upon creation - especially in QA or production.

To prevent content errors from delaying unrelated activities,
it could be desirable in some circumstances (like development)
to perform little or no validation.
The type and extent of validation performs should be as configurable as practical.

#### Updating Select Exercises Only

It will likely be the case that targeted updates to specific `Exercises` will be neeeded.

This can be achieved by copying the original `Ecosystem`'s exercise manifest
and altering only the entries for `Exercises` to be updated.
A new `Ecosystem` can then be created from the original book id and the new manifest.

#### Communication with BigLearn

To allow `BigLearn` to suggest `Exercises` from the current `Ecosystem` only, 
`Tutor` must communicate the `Exercises` in various purpose-specific pools
to `BigLearn`.  This is probably best done as part of the import process.

Because many `Tutor` instances will be sharing a single instance of `BigLearn`,
`Ecosystems'` purpose-specific pools must be uniquely identified (`UUID`-ed)
(at least externally).

Because `Biglearn` can combine existing pools to form a new pool,
it is likely that `Tutor` will want to create per-`Page` pools on `BigLearn`.
These smaller pools can then be mixed and matched as needed to form per-`AssignmentPlan` pools.

## Tutor Creates an Ecosystem(s)-to-Ecosystem Map

### Motivation

It is anticipated that book and exercise content will be updated throughout the semester,
and that teachers will want to import this new content and use it mid-course.
These updates could include significant structural changes to books and/or their metadata.

Several `Tutor` features are based on book structure
(Learning Guide, Course Stats, etc.).
In order to provide a pleasant user experience, 
`Tutor` will attempt to map work done in previous book versions
to the current book's structure.

### Problem Statement

Given a target `Ecosystem` and a set of other `Ecosystems` (including the target),
creating a set of mappings
from various elements
(`Pages`, `Chapters`, `Exercises`, `LOs`)
of each given `Ecosystem` and the target `Ecosystem`.

If a mapping cannot be found for a given element,
it is considered an `orphan`
and must be identified
and handled as a special case
by the affected `Tutor` features.

### Desired Output

While the exact structure of the mapping is TBD,
it can be thought of as a function
that takes as arguments

* a specific `Ecosystem` element
* the element type of target `Ecosystem` element to which it should be mapped

and returns one of

* a target `Ecosystem` element of the specified type
* an `orphan` indicator

### Worst-case Scenario

The worst-case scenario is that the mapping must be created by hand.

This is actually pretty do-able in most situations, but can probably be largely automated.

### Better Scenarios

TODO: detail varous algorithms for automating creation of mapping (yes it can be done)

Some info we can use:
* find same `Exercise` in new `Ecosystem`
* find `Exercise`'s `LOs` or `Page` in new `Ecosystem`
* try to process `Page`/`Chapter` titles/content (not awesome)

Note that reverting to a previous `Ecosystem` (with older content) will likely cause many `orphans`,
since content tends to be added and not removed.

## Tutor Associates an Ecosystem to a Course

Each `Course` in `Tutor` has an associated current `Ecosystem`,
as well as a list of previously-associated `Ecosystems`.
Each `Course` also has a `Ecosystem(s)`-to-`Ecosystem` mapping
to allow a smooth transition of work from past `Ecosystems` to the current one.

To update the current `Ecosystem` for a `Course`,

* a new `Ecosystem` is created using a book id and exercise manifest
  * the new `Ecosystem` can be validated as necessary before proceding
* an `Ecosystem(s)`-to-`Ecosystem` mapping is created from the past, current, and new `Ecosystems` to the new `Ecosystem`
  * the mapping can be validated/reviewed/tweaked as necessary
* the `Course`'s current `Ecosystem` is moved to the `Course`'s list of previously-associated `Ecosystems`
* the new `Ecosystem` and mapping are added to the `Course`

This process allows the update to be aborted at any point and also ensures success of the final update.

## Tutor Creates Assignments

### Reading

The teacher selects which `Pages` in the current `Course` `Ecosystem` a `Reading` will cover.
The appropriate `Page` ids are stored in the `AssignmentPlan`.

`Tutor` will convert the select `Pages'` `Fragments` into a series of `core` `TaskSteps`.
It is possible that some `Fragments` will require configuration/personalization during this conversion.

Based on the `Taskee`'s assignment history and the `k-ago-map`,
a series of `spaced practice exercises` (`SPEs`) is chosen.
The `SPEs` are current chosen by `Tutor`,
but eventually they will likely be chosen by `BigLearn`.
In order to implement the latter,
`Tutor` will need to combine per-`Page` exercise pools into a per-assignment pool in `BigLearn`.

`Tutor` will also ask `BigLearn` for one or more `personalized exercises` (`PEs`).
Again, `Tutor` will need to create the appropriate pools from which `BigLearn` will choose.

### Homework

The teacher selects a set of `Pages` and is shown the `Exercises` associated with those `Pages`.
The teacher then chooses which `Exercises` will form the `Homework` assignment's `core` `TaskSteps`.

As with `Reading` assignments, `Tutor` will select `SPEs` and ask `BigLearn` for `PEs`.
`Tutor` will once again need to form the appropriate pools on `BigLearn` by combining per-`Page` pools.

### Additional Considerations

It could be desirable for `Tutor` to automatically transfer unpublished `AssignmentPlans`
based on past `Course` `Ecosystems` to the current `Course` `Ecosystem`
if it can be determined that such an action is "safe" (doesn't cause `orphans`, etc.)
Published `AssignmentPlans` are always locked to their target `EcoSystem` to preserve their integrity.

