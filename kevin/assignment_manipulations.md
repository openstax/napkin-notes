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

We already support students switching periods through the teacher's roster interface. In this case, the student will have open assignments from their original period, but the due dates might be for the original period rather than the new period. We might be able to just leave that as is and let teachers excuse late work if needed. Their scores on the assignments that opened while the student was in the former period might still count in the forecast of the former period.  

##Testing existing behavior

**Case 1 (Brand New): Student switches into a tutor course from a non-Tutor course**
* Create two readings - one past due, one upcoming
* Create three hws - one past due, one upcoming and open, one upcoming and not yet open
* Login as admin and add a student to one period. 
   * Instructions: Admin console, courses, edit course, student roster tab, upload csv with specified column headings to add students. 
* Login as teacher: Open the assignment that was published but not open. Create a fourth assignment
* Login as student: Check student dashboard. Work assignments. Check forecast
* Log in as teacher, check performance report and forecast.

*Case 1 Current behavior*
* Teacher sees the student in their roster after a bit of time.
* Student is able to login with that account pretty quickly.
* If an assignment is open, the new student will not receive it.
* If an assignment is published, but not yet open, the student will see it when it opens.
* The student will see new assignments.
* The teacher will see blanks in the report for all assignments that the student doesn't have. The teacher will see "not started" for assignments that the student has but hasn't done yet.

**Case 2 (Switching Periods): Student switches periods in a tutor-course and has history**
* Create three readings - one past due, one upcoming before opening
* Create two hws - one past due, one upcoming
* Login as a student and start the latter reading. 
* Login as teacher and go to the roster, and switch student to different period. 
* Login as teacher: Create a third hw
* Login as student: Check student dashboard. Work assignments. Check forecast.
* Log in as teacher, check performance report and forecast.

*Case 2 Current Behavior*
* Student sees all assigments from either period. 
* Those assignments that were open before the switch will show the due date from the prior period.
* The forecast shows topics from all periods.
* For the teacher, the roster shows the student in the new period.
* For the teacher, the Performance Report shows the student in both period.
* There is no indication of which period is the "real" one for that student. 
* The student has blank slots for all assignments that are in the other period, and some status indicator for each assignment in the period where it "opened".
* The teacher forecast doesn't blow up.

## Desired Behavior
*Case 1 New Student (in order of priority)*

1. All open but not-yet-due assignments should be automatically created for this student. The student should see them on their dashboard and the teacher should see them as "not started" in the Perf Report.
2. When adding the student as an admin, it should be possible to provide a date and all past due assignment due on or after that date should be added to the new student. And show on student dashboard and teacher perf report.
3. When a teacher can add a student, they should see a list of past due assignments and bea ble to select some and be able to add them to that student's assignments. 
4. In the online performance report, in any cell (intersection of student and assignment) that is blank (never assigned), the teacher should be able to click to add that assignment for that student.

*Case 2 Switching Periods (in order of priority)*

1. Performance report row for the student should be consolidated into the new period for that student.
2. Due dates for open but not yet due (in the new period) assignments should be switched to be due dates for the new period.
3. The teacher forecast should include this student in the new period for all non-due assignments.

## Needed Features (N.B. this stuff was devised before the desired behavior was specified.)

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
