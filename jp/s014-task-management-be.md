# Misc Task Management (Backend work)

The following BE tasks are digested from a larger discussion at https://goo.gl/fwhSZW

1. Let a course have a time zone associated with it.
2. Make the default open time for tasks be 12:01 AM in the time zone of the course.
3. everything from https://github.com/openstax/napkin-notes/blob/master/jp/task_plans_201506.md
4. After the due date for published tasks
  1. Scores first show up on the performance report
  2. Scores show up on the student dashboard
  3. HW recovery becomes available (Dante what of recovery is already done?)
  4. HW feedback becomes available to students
5. Whenever a `TaskPlan` is saved...
  1. A `name` is always required
  2. At least `TaskingPlan` must exist with a populated due date (because we don't have a holding area for assignments not on the calendar).
  3. Gotta give back validation errors to the FE (some of our code already does this, would be nice to standardize and not repeat it all over the place).
6. When a `TaskPlan` is published (including republishing)...
  1. If any due date is in the past, error out with message to the FE
7. Add an endpoint to delete a plan...
  1. If deletion is before all open dates: delete any `Task`s associated with the plan and delete the plan.
  2. If deletion is after any open date: [this functionality pending discussion in https://goo.gl/fwhSZW]



