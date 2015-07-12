# Moving and Deleting Students

This note is concerned with what to do in tutor-server when moving students from period to period and when deleting students from a course.

## Desired Behavior

Once a user has been added to a period as student, the record of that user's student membership in that period shall be maintained throughout the duration of the course.

* **Exception:** a student record can be deleted if that student has no data associated with it, e.g. if a teacher moves Jimmy accidentally from period 1 to period 2 and then back to period 1 (correcting their accidental move), it would be ok to delete Jimmy's student record in period 2.
* **Possible Implication:** `Student` objects don't move from period to period.  If a user is moved from period 1 to period 2, they end up with an inactive `Student` record in period 1 and an active `Student` record in period 2.  If a user is removed from a period, their `Student` record is not actually actually deleted but just marked inactive.

  Maybe talking about `Student` like this isn't appropriate for this document as there may be a different design solution to handle these behaviors and ramifications.

Teachers are shown the hist

## Specific Ramifications

### Student Role Listings

`/api/courses` and `/api/courses/1` should limit the student roles returned to those that are active.  This means that a user will not be shown an option to view a course through the dropped / inactive student role.

### Performance report

**For Students**

* **Ideally:** users see their performance from any period they've been a part of, all in one table (means moved students will see tasks from different periods at one time)
* **Fine for now:** just show users their student performance for their active period (means moved students will not see some of their history)

**For Teachers**

* Show a student's performance report in each period they've been a part of (means that a user whose period has changed mid-semester will have half of their tasks show up in one period's performance report and the other half in another period's performance report).

### Learning Guide

**For Students**

* **Ideally:** users see their performance across all tasks they've completed in the course, regardless of which periods they have been in.
* **Fine for now:** users see their performance only in their current active period.

**For Teachers**

Since this learning guide is already filtered by period, I don't think any changes are needed here.

### Viewing / Working Tasks

A student should be able to view and work any task that they were ever assigned (e.g. a student is moved while in the middle of an assignment, they should be able to complete it even though they are no longer in the period from which that task originated).

### Distributing Tasks

When a student moves from one period to another, there could be tasks that have been published for that new period but not yet released.  For any future task plan that is assigned to the period into which the student is moving and that has been published but is not yet open, distribute that task to the student (otherwise he'll be left out).

Once a student is inactive in a period, no more tasks that are assigned to that period should be distributed to that inactive student.

### Dashboard

**For Students**

* **Ideally:** A user would see all of their tasks, regardless of which period they came from
* **Fine for now:** A user can just their tasks for their active period, and if we need to help them get direct access to an incomplete task in an old period we as admins can send a link.

**For Teachers**

Nothing special.

### Quick Look Analytics

I don't think there's much special here.  Quick look analytics on a teacher's calendar are already filtered by period and by task plan, so I think we can just continue to count like we are?
