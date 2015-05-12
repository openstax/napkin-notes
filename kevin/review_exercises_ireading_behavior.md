# Review Exercises in Homework Assignments

## Background

`iReading` assignments are created from CNX `page_module`s.
`page_module`s have associated LOs and embedded review exercises.
`OpenStax Exercises` can have additional exercises associated with the LOs.

Originally, it was planned that `iReading` assignments would include a post-reading set of review exercises - 
one per `page_module` LO.
Since each LO has multiple associated exercises to choose from, 
it was decided to take advantage of this opportunity for personalization
by allowing BigLearn to select the exercises.
It turns out that this methodology for "review" is the same as that for `personalized` exercise selection,
so the term "review" has been dropped in favor of `personalized`.

## The Current Plan

`iReading` assignments will consist of:

* `core` steps (readings, videos, interactives, etc.) derived from the assigned `page_module`s
* `spaced practice` exercise steps dervied from the taskee's `iReading` task history, LOs, and the `k-ago-map` 
* `personalized` exercise steps derived from the assigned `page_module`'s LOs

The number of `personalized` exercise steps will be determined by taking the minimum of:

* `k1`*(# core `page_module`s)
* `k2`

where:

* `k1` == 3 (tentative)
* `k2` == 5 (tentative)

The `personalized` steps will initially be filled by placeholders.
Upon completion of the `core` steps, those placeholders will be replaced with actual exercises chosen by BigLearn.
The `personalized` exercises will be indicated as such in the same manner as `Homework` assignments indicate them.

## Kevin's Notes

**It is essential for the demo** that BigLearn choose different `personalized` exercises for different users.
