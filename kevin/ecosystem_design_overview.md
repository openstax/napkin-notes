## Ecosystem Basics

An `Ecosystem` is the combination of a `Cnx` book and its associated exercises.
An `Ecosystem` encapsulates all the information necessary to create book-based assignments in `Tutor` (`homework`, `reading`, `practice`, etc.) from the contained content.
An `Ecosystem` also contains manipulated `cnxml` for use in reference views.

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

These schema details are subject to change.

Do not confuse any of the terms mentioned here with any of their uses elsewhere in `Tutor`.
```
Ecosystem::

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

## External Representation

To prevent `Ecosystem` schema knowledge from leaking to other parts of `Tutor`, a well-defined and stable externally-facing object interface (facade) will be presented.  This interface will delegate to a `strategy` object which will manage the complexities of queries, caching, data transformations, etc.

[initial interface](https://github.com/openstax/tutor-server/blob/klb_content_abstractions/app/subsystems/ecosystem/ecosystem.rb) ([specs](https://github.com/openstax/tutor-server/blob/klb_content_abstractions/spec/subsystems/ecosystem/ecosystem_spec.rb))

All objects going into, and returned from, the interface will be immutable `POROs`.
