# Multipart exercises across the Tutor ecosystem

*Goal of this document:* Figure out how to think of, store, and process multipart exercises throughout the Tutor ecosystem.

## Exercises

A multipart exercise is one that, when worked, results in multiple responses from a student, each of which can be separately graded.  Such exercises include not only traditional multiparts (those containing an numbered sequence of possibly-independent questions), but also exercise types like fill-in-the-blank and matching.  A fill-in-the-blank with multiple blanks and pretty much any matching exercise will result in multiple student responses.

Multipart exercises in OX Exercises are intended to be delivered as a combined unit to students.  If we have a need to deliver one part of a multipart independently from the other parts, we'll need to come up with a way to uniquely address it.  As such, OX Exercises will provide a URL for the mutlipart as a whole, and will provide ID information for the parts, but it will not provide a web-accessible URL that returns an individual part.

## Tutor

Following Exercise's lead, Tutor will deliver the parts of a multipart together to students.  It will record responses and grades for individual parts separately.

## Exchange

Exchange's goal in life is to record what happened re student interactions.  Given that multipart exercises are a major concept in OX Exercises (and given that in general it is easy to foresee various tasks and assessment bundles from inside and outside of OpenStax that can be used to solicit multiple student responses), Exchange really needs to have a capable awareness of multipart exercises.

Exchange already groups various "events" under the concept of a `Task`, e.g. `AnswerEvent` and `GradingEvent`.  These events are summarized in `ExerciseActivity`s, which are also bundled under the `Task`.  I propose adding an optional `part_id` string to `AnswerEvent`, `GradingEvent`, and `ExerciseActivity` (`part_id` would not need to be specified for single-part exercises).

A `Task` in Exchange is already connected to a single `Resource` url/link.  So without any changes, a `Task` would refer directly to the URL that OX Exercises offers, of which there will be only one for a multipart exercise (no distinct URLs for the individual parts).  The addition of `part_id` fields will just let us refer to events and activities for distinct parts of one resource URL.

```
1 Exchange Resource URL <=> 1 Exchange Task <=> 1 Exercises Exercise
```

## Biglearn

Biglearn cares about student responses at two granularities: it wants to know correct/incorrect at the finest granularity possible and it wants to know what things are assignable (which may be at a more macro level of granularity).

Need KB's input, but I think this means we should be recording part identification information for all correct/incorrect information sent to Biglearn.  If a student works 4 parts of a multipart exercise, Biglearn would then receive 4 messages with correctness info, but it would know (by definition) that the single question ID that they all share is the only discretely-assignable thing (useful when fulfilling requests for personalized exercises).
