## Motivation

It turns out that
there is a lot more roster shuffling
happening early in the semester
than we previously anticipated.

Although we _think_ a fairly small percentage
(10-15%)
of students will be impacted,
our largest courses
(those with 100+ students)
are the first to open
so the absolute number of impacted students,
as a percentage of those in the pilot,
is significant.

### Two cases

**Case 1 (Brand New): Student switches into a tutor course from a non-Tutor course**

The student will not have any assignments from before they were added to the course. Some assignments might be past due and the teacher might want them to do them. More importantly, some assignments may not yet be due, but might already be opened and thus prepared for students and this student won't see them.  In addition to missing those assignments, the student will not receive any spaced practice on those assignments.

**Case 2 (Switching Periods): Student switches periods in a tutor-course and has history**

We already support students switching periods through the admin interface. In this case, the student will have open assignments from their original period, but the due dates might be for the original period rather than the new period. We might be able to just leave that as is and let teachers excuse late work if needed. Their scores on the assignments that opened while the student was in the former period might still count in the forecast of the former period.  

##Testing existing behavior

**Case 1 (Brand New): Student switches into a tutor course from a non-Tutor course**
* Create two readings - one past due, one upcoming
* Create two hws - one past due, one upcoming
* Login as admin and add a student to one period. (Need instructions)
* Login as teacher: Create a third hw
* Login as student: Check student dashboard. Work assignments. Check forecast
* Log in as teacher, check performance report and forecast.

**Case 2 (Switching Periods): Student switches periods in a tutor-course and has history**
* Create two readings - one past due, one upcoming
* Create two hws - one past due, one upcoming
* Login as a student and start the latter reading. 
* Login as admin and switch student to different period. (Need instructions)
* Login as teacher: Create a third hw
* Login as student: Check student dashboard. Work assignments. Check forecast.
* Log in as teacher, check performance report and forecast.

## Needed Features

At the very least, admins need to be able to:

* add new students to a period
* move existing student between periods
* delete unopened assignment
* issue assignment to student

I think
roster manipulations
should be separated from
assignment manipulations.
We'll focus on the assignment manipulations here.

## Going-in Approach

I envision a table.

On the horizontal axis would be assignments (per period).
On the vertical axis would be students (all, not per period).
Each cell is a checkbox.

There would also be two buttons: `assign` and `delete`.

The admin would check the appropriate boxes and then the action, and it would happen.

There are many ways the UI could be tweaked to make it more usable,
and I leave those as implementation details.  Some ideas are:
* filter students by selecting them
* filter assignments by selecting them
* conveniences for selecting all/ranges of buttons

It is also important to note that,
at least for now,
open assignments cannot be deleted.

## Roster/Assignment Update Process

The teacher will need to convey the following information
to the helpdesk:

* new students and their periods
* moved students and their new periods
* for each new/moved student, assignment updates:
  * which published assignments (name, period) to assign
  * whether or not to "clean up" previously assigned unopned assignments

This information will be relayed
to an admin
who will perform the necessary tasks
using the admin interface.

## When We Want It

Soon.

On/Before | Would be...
----------|------------
9/8       | great
9/14      | pretty ok
later     | meh...

## Other Things to Consider

### Published, Unopened Assignments

We might want to monitor
published, but not yet opened,
assignments.

#### New Student

Because the assignment is already published,
new students will not have been included
in the distribution list.

#### Moved Student

Students are issued assignments
for the period they were in
at the moment the assignment was published.

If a student is moved between periods,
previously published assignments
from their old period
that have not yet opened
will still be assigned to them.

We should probably
detect and delete these assignments,
and issue the appropriate assignments
from their new period.
