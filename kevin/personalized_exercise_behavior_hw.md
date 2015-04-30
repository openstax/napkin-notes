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
