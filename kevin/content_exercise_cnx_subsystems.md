I suggest we refactor the `Content` subststem into the following.
This is very initial - feel free to offer up suggestions/modifications.

First, we add two subsystems meant to be our local caches of remote content:

```
Exercises::V1::
  Exercise
```

```
Cnx::V1::  (are these really distinct?  should there be only one model?)
  BookPart
  
  Page
```

Next, we convert `Cnx` and `Exercises` models into `Content` models, which represent the abstractions `Tutor` uses:

```
Content::  (Content::Book::??)
  Book
    | 1..*
  Unit (can be "invisible" placeholder - book without units)
    | 1..*
  Chapter (can be "invisible" placeholder - intro pages)
    | 0..*
  Page -------------+
    | 0..*          | 1..*
  PageLo          PageFragment
    | 0..*
  PageExercise (we assign these to avoid ambiguity)
    | 0..*
  ExerciseTag (necessary?)
```

We can add dummy `Unit`s and `Chapter`s as necessary to make query logic simpler,
and decide how best to handle them in the `Representer`s.

We just need to make sure that we use unique ids
(preferably not db primary keys, I think)
when assigning `Chapter`s, `Page`s, and `PageExercise`s.
This will allow us to avoid having the url id depend directly on the db id.

The mapping between pages, LOs, and exercises is now very clear.
We can handle the case where a page appears in multiple books, potentially with a different title and/or chapter_section.
We can handle the case where the same LOs appear in multiple books - we can decide to link them or not.
We can control how/when exercises are updated per book and per course.

We might need to add ExerciseTag but I think that should mostly be hidden from direct exposure to outsiders.

There would be no references from `Content` back to `Exercises` or `Cnx` - this is a full-up conversion.
