# SPARFA Background

SPARFA takes:
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
in a specific 'target' ecosystem.
Any time any of the matrices are used,
it implies knowledge of a specific ecosystem
that provides the needed context.

(Because `U_KxL` is large and non-sparse,
we will be ignoring it
in favor of the smaller and sparse
`U_KxQ` and `d_Qx1`.
The needed components of `U_KxL`
can be quickly re-derived as needed
in each algorithm.)

# Services Provided by Biglearn

## CLUEs (individual learner)
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
to prevent learners from using their CLUE values
to cheat.

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
