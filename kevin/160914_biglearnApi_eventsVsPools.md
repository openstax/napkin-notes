# SPARFA Background

`SPARFA` takes:
* a gradebook of learner responses (`G_QxL`)
* question-concept hints (`H_QxK`)

and determines:
* question conceptual content (`Wt_QxK`)
* question intrinsic difficulty (`d_Qx1`)
* learner concept understanding (`U_KxL`)

where:
* `Q` = number of questions
* `K` = number of concepts
* `L` = number of learners

The number of concepts (`K`)
is determined by the LOs
in a specific 'target' `ecosystem`.
Any time any of the matrices are used,
it implies knowledge of a specific `ecosystem`
that provides the needed context.

(Because `U_KxL` is large and non-sparse,
we will be ignoring it
in favor of the smaller and sparse
`U_KxQ` and `d_Qx1`.
The needed components of `U_KxL`
can be quickly re-derived as needed
in each algorithm.)

# Services Provided by `Biglearn`

## `CLUEs` (individual learner)
```
clue = LEARNER_CLUE(learner_uuid,
                    learner_responses,
                    exercise_pool,
                    Wt_QxK, d_Qx1) 
```
where:
```
exercise_pool = book_container -
                course_excluded_exercises -
                globally_excluded_exercises -
                nonpast_assignment_exercises
```
Open assignment exercises are excluded
to prevent learners from using their `CLUE` values
to cheat.

A `book_container` is one of:
* the entire book
* a unit
* a chapter
* an individual page-module

`Biglearn` knows about `book_containers`
from the `ecosystems` described by `Tutor`.
These `ecosystems` also describe the `exercises` (if any) 
associated with each `book_container`.

`Biglearn` also knows which `ecosystems`
are still in use,
and by which `courses`,
because `Tutor` notifies `Biglearn`
about `ecosystem` updates.

`Biglearn` knows about `course_excluded_exercises`
because it gets those updates from `Tutor`
when teachers create exclusions.
`Biglearn` knows which `course` is applicable
because `learner` uuids are `course`-specific,
and `Tutor` informs `Biglearn` of roster updates.

Similarly, `Tutor` informs `Biglearn`
of `globally_excluded_exercises`,
which are applied by admins across all `courses`.

`Tutor` also informs `Biglearn`
about `assignment` creation and updates,
allowing `Biglearn` 
to exclude the appropriate `exercises`
from its `CLUE` calculation.

Everything mentioned above is needed by `Biglearn`
so it can have time to precompute all the `CLUE` values
that `Tutor` might want.
It is also important to allow `Biglearn`
to stop computing values that `Tutor`
knows it will never need again.

## CLUEs (aggregated learners)
```
clue = AGGREGATE_CLUE(learner_pool,
                      learner_responses
                      exercise_pool,
                      Wt_QxK, d_Qx1)
```
where:
```
exercise_pool = book_container -
                course_excluded_exercises -
                globally_excluded_exercises
```
Note that cheating is not (yet) a concern here,
because these values are only visible to teachers.


## PEs (individual learner)
```
personalized_exercises = PEs(learner,
                             learner_responses,
                             exercise_pool,
                             Wt_QxK, d_Qx1)
```
where:
```
exercise_pool = book_container_1 +
                book_container_2 +
                ...
                book_container_n -
                course_excluded_exercises -
                globally_excluded_exercises -
                nonpast_assignment_exercises
```
Again, assignment exercises are excluded to
* avoid repetitions in assignments
* prevent cheating via Practice Widget

## SPEs (individual learner)

Spaced Practice Exercises (SPEs)
are a special case of Personalized Exercises (PEs);
only target ecosystem changes.
