# Behavior of Personalized Exercises in Homeworks

## Terms and Things

 Term | Definition
------|------------
CE    | core exercise
SPE   | spaced practice exercise
PE    | personalized exercise
HW    | Homework - made up of PageModules
LO    | Learning Objective
PageModule | PageModules contain LOs (and therefore map to Exercises)
Exercise   | Exercises contain LOs (and therefore map to PageModules)
C1,...| specific core exercise
S1,...| specific spaced practice exercise
P1,...| specific personalized exercise
populated? | question has been chosen by Tutor
available? | question can be viewed by student
completed? | question has been [fully] completed by student
\* | don't care (y or n)
current HW's LOs | all LOs associated with all PageModules associated with any Exercise in the current HW (got it? good...)

## Some Background

The idea that the PEs could change as the student completes exercises was basically nixed by Kathi, 
so unless someone _really_ wants that behavior I think it's gone.

The BE/FE will need to handle the idea of Placeholder exercises again.
Placeholders appear in the breadcrumbs but don't have any exercise content.
The BE eventually swaps out a Placeholder with a real Exercise.

## The Current Plan

A homework starts off like this:

           | C1 | C2 | C3 | S1 | S2 | P1
-----------|----|----|----|----|----|----
populated? | y  | y  | y  | y  | y  | n
available? | y  | y  | y  | y  | y  | n
completed? | n  | n  | n  | n  | n  | n

If the student clicks on an unavailble exercise, a message saying
"you need to complete more exercises before this exercise becomes available" (or whatever)
is displayed.

Once the student completes the CEs, the PEs are chosen by Tutor and become available to the student:

           | C1 | C2 | C3 | S1 | S2 | P1
-----------|----|----|----|----|----|----
populated? | y  | y  | y  | y  | y  | y
available? | y  | y  | y  | y  | y  | y
completed? | y  | y  | y  | *  | *  | n

and the PE remains forever fixed.

The PEs are drawn from an exercise pool created from the current HW's LOs.

## Kevin's Comments

We need to consider that allowing students to "game" the PEs opens up the possibility that we won't gather *any* meaningful personalization data - just imagine if *every* student games the PE selection by sandbagging their preliminary answers to the CEs.  Is this an acceptable risk from business/product/research POVs?  For Alpha?  For the fall?

## Drew/Lakshmi Notes

One of the issues with the above approach is that students will
be able to change their answers after a personalized question
has been assigned to them based on their unlocked answers.

In the interest of time, we can persist with the above approach
for alpha.  This may not be a fruitful approach in the long term.

## The most useful / correct approach

The above approach will use the responses that students have saved to
a question, which may or may not be the same as the final answers that
they choose to submit.  We should rely only on submitted answers when
choosing personalized questions.  Saved answers will likely be of
poorer quality (since students will know they can update/edit later).
Further, relying on saved answers may result in students attempting to
game the system by initially providing wrong answers to questions in
order to get an easier personalized question.  Using saved answers to
generate personalized questions will ultimately result in reduced
educational benefit to students and may additionally cause the data
that we collect on personalized questions to be misleading to the
research team.

Requiring students to submit their answers to unlock the personalized
questions will require changes to the student workflow and these
details will need to be worked out.  We would inform students that the
personalied question will unlock only after they have submitted their
responses to the core questions and require them to complete all work
(including the personalized problem) by the homework due date.  A less
desirable, though, workable, solution would be to give an extended
amount of time after the homework due date that would allow students
to complete the personalized problem.

## Alternatives

There are several alternatives that we consider that would allow us to
keep the same user workflow that we have established. However, these
options carry with them a number of severe limtiations.  We include
these only for completeness:


### Alternative 1

Recommend personalized problems on the current LO, but use history on
previous questions only in recommending that question.

#### Pros

Personalized problem on a given homework assignment can be generated
using all previous data and would not require any data from the
current assignment.  This eliminates the gaming problem.

#### Cons

We will have no data on the current LO when assigning the personalized
problem.  Our current SPARFA-TAG algorithm cannot be used in this
scenario and we would need to use a different algorithm (e.g.,
SPARFA-LITE) to carry out the recommendation process.  SPARFA-LITE can
blend in old questions and use them to do prediction but it is still
not clear how reliable this recommendation would be.  Further analysis
would be needed to determine if this option can even be viable.


### Alternative 2

Do personalized problems on LOs explored in previous homeworks.  Like
option 2, this gets around the issue of having no data on the current
LO.

#### Pros

No need to collect data on the current homework to assign personalized
problems.

#### Cons

Personalized problem will cover different topics than those covered on
the current HW.  This could potentially confound spacing effects on
the spaced practice problems.
