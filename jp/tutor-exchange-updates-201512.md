# Tutor / Exchange Updates (Dec 2015)

To support pending BigLearn work, we need the following updates to Tutor and Exchange:

1. Each time a student answers an exercise in Tutor, when Tutor sends that answer to Exchange...
  1. it must include a strictly monotonically increasing sequence value which can be used (perhaps in combination with other attributes) to ensure reliable ordering of student responses (e.g., by BigLearn)
    * the larger the "scope" of the ordering, the better for reproducibility but the worse for scaling
    * possible "scopes" could be:
      * all responses for a given student for a given question for a given trial (bare minimum)
      * all responses for a given student
      * all responses for a given question for a given trial
      * all responses for a course's students
      * all responses anywhere by anyone for anything
    * gaps in the value are okay (and might be unavoiadable due to db technology limitations)
    * this is not a replacement for the (approximate) timestamp
  2. it must include a flag that says whether or not the answer being sent is "finalized"
    * "finalized" means that this response is the one being "graded", and not a work-in-progress
    * ideally, no more answers will be submitted for this trial of this exercise
      * however, it is _possible_ that multiple "finalized" responses could be created for the exercise (due to it being re-graded, etc.)
    * just to clear, Tutor should only send correctness information to Exchange for questions that were actually answered by the student (e.g., unanswered questions should not be transmitted as incorrect)
2. Lower priority:
  1. Send an event from Tutor to Exchange when an exercise becomes available for viewing
  2. Send an event from Tutor to Exchange when an exercise is viewed (from server or FE?)
