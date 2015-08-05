
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
to elements in its current `Ecosystem`
for display purposes.
Because content updates tend to be incremental and additive,
this process can be largely (perhaps entirely) automated.

It is possible that each `OX Tutor` use case
will need its own custom
`Past-and-Current-Ecosystems-to-New Ecosystem Map` (`PCEs-to-NE Map` or just `Map`),
but it seems likely that at most a handful of maps
could address all foreseeable needs.

Because `Ecosystems` are bounded and immutable,
all `PCEs-to-NE Maps` can be computed
(and inspected/verified) in advance, 
before a `Course`'s current `Ecosystem` is actually updated.

In the event that an element from a `Course`'s past `Ecosystem`
cannot be mapped to an element in its current `Ecosystem`,
it will be considered an `orphan`
and automatic mapping will fail
without altering the existing `Course` settings.

## Map Creation Processes

### `PageLos` to `PageLo` Map

#### Interface

The process takes as inputs
a collection containing a `Course`'s past and current `Ecosystems`
and the new `Ecosystem` that will replace the current one.
It returns a new immutable `PageLosToPageLoMap` if successful,
otherwise it raises an exception.
```
lo_map = PageLosToPageLoMap.new(past_and_current_ecosystems, new_ecosystem)
```

The map provides two main methods.

`#forward_map` takes a `PageLo` id
from any `Ecosystem` used to construct the map
and returns the associated `PageLo` id
in the new `Ecosystem`:
```
page_lo_id = lo_map.forward_map(page_lo_id)
```

`#backward_map` takes a `PageLo` id
from the new `Ecosystem`
and returns a collection
of associated `PageLo` ids
in any `Ecosystems` used to construct the map:
```
page_lo_ids = lo_map.backward_map(page_lo_id)
```

#### Algorithm

The following pseudocode outlines the mapping process.
Some details (like error handling/reporting and match thresholds)
are still TBD.

Note, however, that failure to find an unambigous `PageLo` map results in an error,
so success implies that there are no `PageLo` `orphans`.

```ruby
def build_lo_map(past_and_current_ecosystems, new_ecosystem)
  errors = []
  lo_map = {}
  all_ecosystems = [past_and_current_ecosystems, new_ecosystem].flatten
  all_ecosystems.each do |ecosystem|
    ecosystem.page_los.each do |page_lo|
      begin
        new_page_lo = find_matching_page_lo(page_lo, new_ecosystem)
        lo_map[page_lo.id] = new_page_lo.id
      rescue StandardError => e
        errors << [page_lo, e]
      end
    end
  end
  raise StandardError if errors.any?
  lo_map
end

def find_matching_page_lo(page_lo, new_ecosystem)
  page_lo_exercises = page_lo.page_exercises
  matching_page_los = new_ecosystem.page_los.select do |new_page_lo|
    if page_lo_exercises.none?
      name_based_match?(page_lo.name, new_page_lo.name)
    else
      exercise_based_match?(page_lo_exercises, new_page_lo.page_exercises)
    end
  end
  raise StandardError unless matching_page_los.count == 1
  matching_page_los.first
end

def name_based_match?(name1, name2)
  name1 == name2
end

def exercise_based_match?(exercises1, exercises2)
  return false if exercises1.none?
  return false if exercises2.none?
  
  unversioned_ids1 = unversioned_ids(exercises1)
  unversioned_ids2 = unversioned_ids(exercises2)

  matches = unversioned_ids1 & unversioned_ids2
  
  result = 
    if unversioned_ids1.count <= 3
      matches.count == unversioned_ids1.count
    else
      matches.count > unversioned_ids1.count/2
    end
  result
end
```

### `PageExercises` to `Page` Map

#### Interface

The process takes as inputs
a collection containing a `Course`'s past and current `Ecosystems`,
the new `Ecosystem` that will replace the current one,
and a `PageLosToPageLoMap` (described above).
It returns a new immutable `PageExercisesToPageMap` if successful,
otherwise it raises an exception.
```
pgex_map = PageLosToPageLoMap.new(past_and_current_ecosystems, new_ecosystem, lo_map)
```

The map provides two main methods.

`#forward_map` takes a `PageExercise` id
from any `Ecosystem` used to construct the map
and returns the associated `Page` id
in the new `Ecosystem`:
```
page_id = pgex_map.forward_map(page_exercise_id)
```

`#backward_map` takes a `Page` id
from the new `Ecosystem`
and returns a collection
of associated `PageExercise` ids
in any `Ecosystems` used to construct the map:
```
page_exercise_ids = pgex_map.backward_map(page_id)
```

#### Algorithm

Using the previously-computed `PageLosToPageLoMap`
makes the mapping of `PageExercises`
to `Pages` fairly simple.

```ruby
def build_pgex_map(past_and_current_ecosystems, new_ecosystem, lo_map)
  errors = []
  pgex_map = {}
  all_ecosystems = [past_and_current_ecosystems, new_ecosystem].flatten
  all_ecosystems.each do |ecosystem|
    ecosystem.page_exercises.each do |page_ex|
      begin
        new_page_lo_id = lo_map.forward_map(page_ex.id)
        pgex_map[page_ex.id] = new_ecosystem.page_lo_by_id(new_page_lo_id).page.id
      rescue StandardError => e
        errors << [page_ex, e]
      end
    end
  end
  
  raise StandardError if errors.any?
  pgex_map
end
```

## `Course` Stats

### Overview

It will be necessary for `OX Tutor` to show
a variety of summaries of assignment exercise statistics
(number assigned, number completed, number correct, etc.)
to both teachers and students.
These statistics will be organized in several ways
(by `LO`, by `Page`, by `Chapter`, etc.).

### Implementation

Internally, `OX Tutor` stores assignments as `Tasks`.
Each `Task` contains one or more `TaskSteps`,
some (or all) of which might be `TaskedExercises`.

Each `TaskedExercise` is associated with
a specific `PageExercise`
inside a specific `Course` `Ecosystem`
(past or current).

#### Per `LO`

To organize stats by `LO`,
a pre-computed `PCEs-to-NE Map`
will be used.
This `Map` will take as input a `PageExercise` 
from any of the `Course`'s past or current `Ecosystems`,
and will output an `LO` from the `Course`'s current `Ecosystem`
or indicate that the given `PageExercise` is an `orphan`.

#### Per `Page`

To organize stats by `Page`,
a pre-computed `PEs-to-CE Map`
will be used.
This `Map` will take as input a `PageExercise` 
from any of the `Course`'s past or current `Ecosystems`,
and will output a `Page` from the `Course`'s current `Ecosystem`
or indicate that the given `PageExercise` is an `orphan`.

#### Per `Chapter`

To compute per-`Chapter` stats,
per-`Page` stats (for each `Page` in the `Chapter`)
will be 
To organize stats by `Chapter`,
a pre-computed `PCEs-to-NE Map`
will be used.
This `Map` will take as input a `PageExercise` 
from any of the `Course`'s past or current `Ecosystems`,
and will output a `Page` from the `Course`'s current `Ecosystem`
or indicate that the given `PageExercise` is an `orphan`.

## Assumptions

### Schema

In `OX Tutor`, `Ecosystems` are constructed as trees:
* `Ecosystem` contains exactly one `Book`
* `Book` contains one or more `Chapters`
* `Chapter` contains zero or more `Pages`
* `Page` contains zero or more `PageLos`
* `PageLo` contains zero or more `PageExercises`

The code which creates `Ecosystems` from content
must either 
force the content into this form or 
fail with an error.

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
  Page -------------+----------+---- ... ----+
    | 1             | 1        | 1           | 1
    |               |          |             |
    | *             | *        | *           | *
  PageLo          HwCoreEx   HwDynEx  ...   OtherPools
    | 1             | 1        | 1           | 1
    |               |          |             |
    | *             | 1        | 1           | 1
  PageExercise -----+----------+---- ... ----+
```

Given a list of `Ecosystem::PageExercise` ids,
the `Task::` subsystem will need to efficiently determine
which `TaskedExercises` are associated with the given `PageExercise` ids
and a `Task` meeting the requirements
(e.g., feedback is available)
of the use case using the `PEs-to-CE Map`.

```
Tasks::

  Task
    - ecosystem_id
    - feedback_at
    | 1
    |
    | 1..*
  TaskStep
    | 1
    |
    | 1
  (TaskedExercise)
    - page_exercise_id
```

## Forward Mappings (Import)

### Mapping `LOs` to `LOs`

### Mapping `PageExercises` to `LOs`

### Mapping `PageExercises` to `Pages`

### Mapping `PageExercises` to `Chapters`

## Reverse Mappings (Display)


