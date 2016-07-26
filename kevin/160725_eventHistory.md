## `IReadingAssistant`

This 
[`assistant`](https://github.com/openstax/tutor-server/blob/master/app/subsystems/tasks/assistants/i_reading_assistant.rb#L29-L40)
builds `Reading` assignments.

It makes a
[call](https://github.com/openstax/tutor-server/blob/master/app/subsystems/tasks/assistants/i_reading_assistant.rb#L35)
to `GetHistories` (described below).

The histories are passed into a call to
[`build_reading_task`](https://github.com/openstax/tutor-server/blob/master/app/subsystems/tasks/assistants/i_reading_assistant.rb#L54-L73),
which creates the `Reading` assignment's steps,
including
[spaced practice exercises](https://github.com/openstax/tutor-server/blob/master/app/subsystems/tasks/assistants/i_reading_assistant.rb#L62-L65).

`add_spaced_practice_exercise_steps!` is actually defined in
[`GenericAssistant`](https://github.com/openstax/tutor-server/blob/master/app/subsystems/tasks/assistants/generic_assistant.rb#L108-L165).

The current assignment
[is added](https://github.com/openstax/tutor-server/blob/master/app/subsystems/tasks/assistants/generic_assistant.rb#L109-L111)
to the `Reading` history
(which includes all previously-published `Readings`)
when it is created (published). 

## `GetHistories`

[This code](https://github.com/openstax/tutor-server/blob/master/app/routines/get_history.rb#L74-L90)
currently determines a student's event history.

The events are 
[ordered](https://github.com/openstax/tutor-server/blob/master/app/routines/get_history.rb#L85-L86):
* first by due date
* then by open date, 
* then creation time of their `TaskPlans`, 
* then by their own creation date

`page-modules` that have no dynamic exercises
but still appear in `Reading` assigments
[are excluded](https://github.com/openstax/tutor-server/blob/master/app/routines/get_history.rb#L74-L78).
