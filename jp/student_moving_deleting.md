# Moving and Deleting Students

This note is concerned with what to do in tutor-server when moving students from period to period and when deleting students from a course.

## Desired Behavior for Students

### Dashboard 

The student sees all of their tasks, no matter which period they were assigned through.  The student can work a task sourced from a prior period as long as that task is still open.

### Learning Guide

The student's learning guide is computed from all tasks they have worked, regardless of the period from which they were sourced.

## Desired Behavior for Teacher

### Quick Look Analytics on Calendar

This UI shows analytics on a `TaskPlan`'s `Tasks` for a given period.  The data is limited to those tasks assigned to students in that period (at the time of distribution).

### Learning Guide

The learning guide shows CLUEs and worked exercise counts by book/chapter/section across all students in a period.

*Here do we maybe want each period learning guide to reflect the CLUEs/counts of all students currently in the period?  (seems more useful for a teacher to get analytics on the complete histories of students currently in a given period, even if those histories span multiple periods).*

### Performance Report

The performance report shows completion and correctness for student tasks, grouped by period.  The data in any one period should be limited to tasks that were assigned to students who were members of that period at the time of the task distribution.

Means students who have moved will end up with partially-complete performance report rows in multiple periods.


## Implementation

Don't want to have multiple Students / multiple roles.  Having one student is nice because then we have a natural place to put Student information, e.g. Karen's `deidentifier` for surveys, later `student_specified_id`, `educator_specified_id`, etc.  

All we need is essentially what we currently have.  A course has multiple periods, a student belongs to one period, and a student maps to a role.  This approach completely addresses the student's needs.  Long term, I think we'll want an `Enrollment` or `PeriodRegistration` object to map a `Student` to a `Period` so that we can have a history of when a student was in which period, support student-initiated registration requests, etc.  But for now, we can just stick with our `period_id` foreign key in `Student`:

https://www.dropbox.com/s/63y50tobu1ya0km/Screenshot%202015-07-15%2008.55.02.png?dl=0

For the teacher, we have the added requirement to know which tasks were assigned to students in which periods at the time of distribution. Since we are not going to have one `Role` per period, we need to track this mapping separately.  For this we add a PeriodTasking join table in the Task SS.  It maps `Tasking`s to `Period`s at the time a task is saved in `DistributeTasks`.  This join table can then be used in the performane report and quick look analytics to select the appropriate `Tasks`.  
