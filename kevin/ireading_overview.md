# iReading Overview

## How iReadings are Built

* teacher chooses one or more `page_modules`
* Tutor constructs `core` task steps based on the chosen `page_module`s
* Tutor constructs `spaced practice` steps based on:
  * the student's `iReading` history
    * all LOs from all covered `page_module`s
  * PhilG's `k-ago-map`
    * determines the spacing by specifying how many exercises to pull from each past `iReading`
    * for each past `iReading`, the pool of candidate exercises is determined by:
      * all exercises with certain `tag`s that also have LOs associated with the `iReading`
      * remove the exercises that the student has already been asked
      * allow repetitions if there aren't enough exercises left
    * exercises from each k-ago `iReading` are chosen randomly from the pool of candidates
* Tutor constructs `personalized` step `placeholder`s based on:
  * the number of covered `page_module`s (and/or number of covered LOs)
  * the number of `spaced practice` exercises (to keep overall number of exercises predictable)

## iReading Workflow

Even though there are breadcrumbs on `iReading`s, the student is only allowed to complete steps in order.

* `core` steps, which consist of combinations of the following (in any order):
  * readings
  * embedded exercises
    * exercise
    * exercise choice
      * "ask me another"
      * "refresh my memory"
  * videos
  * interactives
* [implementation detail]
  * once `core` steps are completed, Tutor populates `personalized` step `placeholder`s with actual exercises
  * exercises are chosen by BigLearn
    * entire student exercise answer history potentially utilized
    * output exercise pool limited to those associated with current `iReading`'s `page_module`s' LOs
* `spacer` page
* `spaced practice` exercises
* `personalized` exercises

## Comments/Discussion

### Kevin

We need to figure out what to call everything after the `spacer`.
