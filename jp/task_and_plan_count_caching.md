# Task and TaskPlan Count Caching (DRAFT)

We have a number of reports that are slow, primarily because they recalculate from scratch many of the statistics that they report.  E.g. both the performance report and calendar quick look analytics (in addition to lots of other code) often call `Tasks::Models::Task#complete?`, which iterates through each step in the task calling `complete?` on them and returning `true` only if all steps return `true`.  Even if the steps are preloaded, there is still considerable overheading in looping through and instantiating each step.

From a reporting perspective, the biggest inefficiencies come in with the Performance Report (deal with `Tasks::Models::Task` objects) and the calendar quick look analytics (deals with `Tasks::Models::TaskPlan` objects).

The performance of these calls can hopefully be improved considerably by caching a number of counts in both `Task` and `TaskPlan`.

## Counter Caches

[Rails' standard counter cache mechanism](http://guides.rubyonrails.org/association_basics.html#counter-cache) is cool but is kind of limited.  To be able to count different kinds of steps in different ways and on associations more than one level up, we need something cooler.  I hope that something cooler is the [counter_culture gem](https://github.com/magnusvk/counter_culture).  Check out this gem to see if it can do what we need.

If counter_culture is what we need, [we'll also need the test_after_commit gem](https://github.com/magnusvk/counter_culture#a-note-on-testing).

## Task

Add the following counter caches:

1. steps_count
2. completed_steps_count
3. core_steps_count
4. completed_core_steps_count
5. exercise_steps_count
6. completed_exercise_steps_count
7. correct_exercise_steps_count
7. placeholder_steps_count
8. placeholder_exercise_steps_count

Rework the following methods to use counter caches (and stop iterating through all task steps):

1. completed?
2. status
3. core_task_steps_completed?

Remove unneeded methods from Task, e.g.

1. completed_exercise_count
2. core_task_steps_completed_at
3. exercise_count
4. actual_and_placeholder_exercise_count -- this is used but instead publish `placeholder_exercise_steps_count` and `exercise_steps_count` in the API and let FE add them.
4. exercise_steps
5. completed_exercise_steps
6. all the methods that are directly replaced by the counts above, e.g. `completed_exercise_count`

## TaskPlan


## Refreshing the counts

Write code to manually refresh the counter caches from scratch -- if the gem authors do this once a week, we should follow suit.  We'll eventually call this code from a cron job once we figure out how to do that best in a multi-server environment.  In our specs, test that this refresh code matches the incrementally counted counts.
