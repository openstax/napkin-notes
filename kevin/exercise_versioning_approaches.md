# Overview

## Version-Related System Aims

* Exercises:
  * each change to an exercise results in a new, immutable version
  * immutable exercise versions can be permalinked
* Tutor:
  * predictible assignments
    * teachers will likely want to know that the exercises they've reviewed/selected will be the ones used in assignments 
  * stable assignments
    * students/teachers will likely not want exercise content to change without notice
    * it is desireable to avoid having "unrelated" activities (like content imports/updates) change existing (and potentially planned) assignments
  * reproducible assignments
    * auditing requirements
    * dispute resolution
    * research
* Exchange:
  * recording of unambiguous facts to be used by BigLearn and Research
  * need to record:
    * exact exercise, including version
    * presentation style (currently missing - assumed m/c)
    * free response (if appropriate)
    * chosen answer(s)
    * correctness (if appropriate)
* BigLearn:
  * seed data 
    * if all versions of exercises have lots of seed data, then no problem
    * however, it's more likely that certain versions will have little/no seed data
    * depending on the situation, "combining" some/all versions is a necessity
      * how this is done might be situation-dependent
  * conceptual/content changes
    * despite assurances, it is possible (likely?) that seemingly innocuous changes to exercise content could affect its utility from a BigLearn point-of-view
      * difficulty
      * presentation style (current ignored - assumed m/c)
      * number of answer selections
      * conceptual content
* Research:
  * definitely need to know what actually happened
* Cross-System:
   * clear communication
     * "exercise 123@456" is much more clear and concise than "that version with such-and-such a typo"
   * traceability
     * who created "123@456"?  when?  etc.

There are three ways (that I can think of) to ensure reproducibility:

* immutable remote resources referenced by URI with version
* mutable, but "equivalent", remote resource referenced by URI without version
* create local copy of remote resource

## Exercises
* creates new exercise version with every edit
  * value after the `@` symbol changes
  * `answer_id`s change
* currently, no assurance that different versions of the same exercse are "equivalent"
  * what "equivalent" means could differ by consumer
  * or worse, "equivalent" could be conditional
  * this sort of decision shouldn't be Exercises' concern
* currently, no assurance that different exercises (much less versions) are NOT "equivalent"

## Exchange

* records de-identified students' answers to exercises (and the answer correctness)
  * currently only the exercise `url` and `answer_id` are recorded
    * this is NOT enough to (in the long-run) determine exactly HOW an exercise was presented
* must preseve research-grade information

## Tutor

* task content must be stable and reproducable
* potential need for auditing / dispute resolution
* indirectly (directly?) used for research
* the version of an exercise that Tutor references during content import is an internal processing decision

## BigLearn

* given exact exercise versions and tags by Tutor
* outputs are filtered by tags
* what happens if two versions of the same exercise are given to BL (due to, say, a content update in Tutor)?
  * if exercise version ARE interchangable, Tutor could ignore the suggested exercise version and just show the latest
  * if exercise versions are NOT interchangable, Tutor could be showing the wrong exercise

# Fundamental Conflicts
* Exercises, Tutor, Exchange need to know (at least sometimes, if not always) *exactly* what exercise content is being referenced
  * failure to do so will result in loss of history/information/reproducability
* BigLearn wants to combined all versions of an exercise into one
  * failure to do so could result in severe lack of decision-making knowledge
  * failure to do so could result in "duplicate" questions, since multiple versions of the same question could be suggested
  * if exercises should not be combined, though, suggestions could be poor
* It seems that BigLearn is the only part of the system that might want to combined exercise versions (?)
  * but then again, maybe it doesn't
  * or maybe it does, but conditionally
  * basically, whether or not to combine is an internal BigLearn processing decision