# Storing CLUE History

Recent discussions have started to imply the need for Tutor to maintain a history of CLUE values for students and groups of students.  One example of this is the "Most Improved" section of the new learning guide.  Another discussion from a few weeks ago talked about plotting CLUEs over time intermingled with a log of learning events to show progress.

Given that BigLearn does not maintain a history, I think we need to.  A history of CLUEs also provides us with a place to persist CLUEs and selectively update them (or reuse cached values) depending on how much state has changed in tutor.

## A Model Proposal

```
StudentHistoricalClue
--------------
role_id : integer
current_value : float
current_value_recorded_at : timestamp
prior_values : float[]
prior_value_recorded_ats : timestamp[]
stale_count : integer
content_page_id : integer
```

**Notes**

1. The `float[]` are Postgres arrays (omg JP considers using a PG-specific feature)
1. This model as written would hold the current and prior CLUE values for one student role.  We also have a need to record CLUE history across a period full of students.  This model could polymorphically describe a period or we could add a new model (`PeriodHistoricalClue`) that looks pretty much identical except for the `role_id` part.
2. `current_value` and `current_value_recorded_at` are pulled out of the array of priors for what I expect to be query efficiency (like better to just select a float rather than have rails/PG load up a whole array -- who knows, may not be an issue).  Instead we could just have `values : float[]` and `recorded_ats : float[]` and the current quantities could just be the last elements of those arrays.

## How HistoricalClues are updated

Whenever a student works an exercise their CLUE related to that exercise likely changes.  However, we don't necessarily need or want to update the CLUE value after each exercise.  The `stale_count` field exists to help us know when to update our cached CLUEs.

Every time a student works an exercise we can increment the `stale_count`.  We can then proceed in at least two different ways:

1. Whenever the `stale_count` reaches a configured threshold, a background worker calls off to BigLearn to update the CLUE (which stores the new value and timestamp in the history and resets the stale_count).  For student historical CLUEs, this threshold could be 1 and for periods it could be 5.
2. Whenever some other process (e.g. the performance report) requests current CLUE values, the CLUEs with `stale_count`s above the threshold could be updated (fewer unneeded updates but potentially too many updates at once).

## Responsibility for determining % improvement

The new learning guide has features based on time differences of CLUEs.  The array of values stored in the historical CLUE can let us compute these values over arbitrary intervals, but should the historical clue store this value at the ready in its own field (so it doesn't need to search through the arrays and compute it from scratch each time a requets for this value is made).  I guess this is a minor efficiency question.

## Alternatives

There's an argument to be made that cached CLUEs should just live where they are used (some cache of the learning guide).  This may make sense, but I would hate to bury these values there and then need them from some other part of Tutor.  Also, if the historical CLUEs stand on their own they can conceivably be hidden behind our BigLearn client -- so our code just asks quesitons of the BigLearn client which can decide whether or not its cached CLUE values need to be updated.
