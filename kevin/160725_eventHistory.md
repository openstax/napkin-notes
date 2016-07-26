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
