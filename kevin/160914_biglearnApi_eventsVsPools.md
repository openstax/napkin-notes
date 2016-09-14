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
                open_assignment_exercises
```


## CLUEs (aggregated learners)

## PEs (individual learner)

## SPEs (individual learner)

