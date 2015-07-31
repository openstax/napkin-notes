
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
A new `Ecosystem` can then be created from the origin book id and the new manifest.

#### Communication with BigLearn

To allow `BigLearn` to suggest `Exercises` from the current `Ecosystem` only, 
`Tutor` must communicate the `Exercises` in various purpose-specific pools
to `BigLearn`.  This is probably best done as part of the import process.

## Tutor Creates an Ecosystem-to-Ecosystem Map

## Tutor Associates an Ecosystem to a Course

## Tutor Creates a Reading Assignment

## Tutor Creates a Homework Assignment

