SPEs = Spaced Practice Exercises
PEs = Personalized Exercises
SPEs + PEs = Dynamic Exercises (DEs)


[build homework adds SPEs](https://github.com/openstax/tutor-server/blob/master/app/subsystems/tasks/assistants/homework_assistant.rb#L73)

[add_spaced_exercise_steps!](https://github.com/openstax/tutor-server/blob/master/app/subsystems/tasks/assistants/homework_assistant.rb#L117)

[GetHistory](https://github.com/openstax/tutor-server/blob/master/app/routines/get_history.rb)
[history ordering](https://github.com/openstax/tutor-server/blob/master/app/routines/get_history.rb#L9)
* all past tasks of desired type (HW, reading, etc.)
* for the current student
* ordered by 1) due date 2) task plan creation time 3) creation time
* minus readings without dynamic exercises
* current task (if given) is always most recent

foreach Task in the history, output:

* tasked exercises
* associated [content] exercises

[get_num_spaced_practice_exercises](https://github.com/openstax/tutor-server/blob/master/app/subsystems/tasks/assistants/homework_assistant.rb#L194-L198)

[get at most the number of candidate exercises, even if less than the number requested](https://github.com/openstax/tutor-server/blob/master/app/subsystems/tasks/assistants/homework_assistant.rb#L170-L176)

possible improvement: if one k-ago slot cannot be filled, try using another?
possible improvement: how to tell which SP slot wasn't filled (aside from spy info)
