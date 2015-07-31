## Ecosystem Basics

`Ecosystems` are IMMUTABLE.

An `Ecosystem` is created from:

* a manifest of fully-versioned `Exercises`
* a fully-versioned `Cnx` book `id`

It will be desirable to create an `Exercise` manifest from a timestamp.

Given the appropriate `id` of anything in an `Ecosystem`, it must possible to find the containing `Ecosystem`.

`Ecosystem` pools must be `UUID`-able, since all `Tutor` instances will ultimately share one `BigLearn` instance.

We can (for at least a while) assume an `Ecosystem` contains only one `Book`.

We should NOT assume that:

* `Los` belong to only one `Page` 
* `Exercises` belong to only one `Lo`.

## Schema
```
Ecosystem
  | 1
  |
  | 1
Book
  | 1
  |
  | 1..*
Chapter
  | 1
  |
  | *
Page -----------+----------+---- ... ----+
  | 1..*        | 1        | 1           | 1
  |             |          |             |
  | *           | *        | *           | *
 Lo          HwCoreEx   HwDynEx  ...   OtherPools
  | 1..*        | 1        | 1           | 1
  |             |          |             |
  | *           | 1        | 1           | 1
Exercise -------+----------+---- ... ----+
  | 1..*
  |
  | *
Tag

NOT SHOWN:
  - Pages could have pre-computed Fragments
  - Fragments could (in some cases) have their own Exercise pools
  - there is good reason to want Cnx:: and Exercises:: tables/subsystems/whatever
    to cache raw Cnx/Exercises products locally
```
