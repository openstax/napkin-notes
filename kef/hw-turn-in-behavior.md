# Homework Turn-In Behavior (Proposed Design)

Mockup: http://mockups.openstax.org/Tutor_MVP_v2/#p=turn_in_page
(not updated with decisions below as of Apr. 12, 2015 - Jason is working on implementing in the mockup)

## Goals
 - Experience is not harder than standard pen and paper turn in. 
 - Students do not risk forgetting to turn their hw in, or have to be extremely precise about the turn in
 - Easy to tell what is done/ not done
 - Students can turn work in late
 - Students can see feedback and get their scores after the due date has passed
 - Students have to work (cheat) to see feedback if they are turning in work late.

## Features and Behaviors

- Turn in button is informational only. It doesn't prevent continued work.
- HW is turned in automatically upon the due date
- Student feedback is available at the due date and records when it is viewed. When a student clicks on the feedback link for a particular HW for the first time, they get a message that the time they view the feedback is being recorded, it might affect ability to turn in late work, and lets them continue or cancel.
- Students can work problems and change answers after the due date.
 - After the due date the student will see something like the following 
  - [HW 4](bogus.com), (3/5) ([view feedback](bogus.com))

### What happens when a **student clicks Turn-In button**?
Turn in is informational only. When a student clicks on the button, we want to tell them how "complete" their hw is. 

 - **Incomplete** For example, "You have answered 3 of 5 questions. You can still review and update your ansewrs until the due date." or 

 - **Complete** "You are done! You have answered 5 of 5 questions. P.S. You can still review and update your ansewrs until the due date." 

### What happens when a **HW due date is reached**?

The assignment is submitted and the score (3 of 5 correct) is available to students on their dashboard and in their score-book (performance book). 

### When can a student **see feedback** about their problems?

Student's can see feedback when the due date has passed. However, when they click on the feedback link, we want to warn them that their teacher will see what time they viewed the feedback

When a student clicks on the feedback link for a particular HW for the first time, they get a message that the time they view the feedback is being recorded, it might affect ability to turn in late work, and lets them continue or cancel.

Here *feedback* refers to both the correct answer, and the choice specific feedback provided with the problem *if any*. 

### When can a student **see their score**?

At the due date.

### How does a student **turn in hw late**?

When the due date has passed, a student can click on their homework and step through their work. Clicking on the HW link should not show which were correct/incorrect or the feedback. If they **change an answer after the due date**, we should warn that "your original answer will show, as well as this answer with the time that you changed it" and give them the option to "save new answer", or "cancel (leave old answer)".

The score in the interface will change to **late**. The student's feedback will still be available. If they click the feedback, they will get the feedback warning. If they continue and view the feedback, then their score will change to **(x/y late)**. The logic behind this rigamarole is that we don't want them to be able to continue to change their answers one at a time until they see their score bump up. But once they view feedback, they will have all the answers anyway and we show their score.

### What does a **teacher see when hw is late**?

 - The teacher will see (**late**) next to the HW. 
 - They will see the date and time at which the student viewed feedback
 - The teacher's view of the student's HW will show which problems were late.
 - The teacher will be able to view free responses and choices that were before the due date, and after. 


