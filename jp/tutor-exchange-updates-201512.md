# Tutor / Exchange Updates (Dec 2015)

To support pending BigLearn work, we need the following updates to Tutor and Exchange:

1. Each time a student answers an exercise in Tutor, when Tutor sends that answer to Exchange...
  1. it must include a value that is greater than any value it has previously sent to Exchange for any exercise answered by that student; *so that* users of Exchange can reconstruct the order in which answers were made by a student.
    * The value _may_ be greater than any value previously sent for any exercise _and_ any student, but it doesn't have to be.
    * @kevin to elaborate on how good it would be for these values to increase for each student's exercise globally
  2. it must include a flag that says whether or not the answer being sent is the final answer (i.e., no more answers will be submitted for this trial of this exercise)
    * Tutor must also send these final values when they become final (e.g. at a HW due date).  @kevin, what do you want to happen if an instructor extends a due date after the due date passes?  (is the finality really needed?)
2. Lower priority:
  1. Send an event from Tutor to Exchange when an exercise becomes available for viewing
  2. Send an event from Tutor to Exchange when an exercise is viewed (from server or FE?)
