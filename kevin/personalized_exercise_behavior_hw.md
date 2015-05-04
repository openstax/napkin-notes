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

## Drew/Lakshmi Notes

The big issue with this:

The above approach will use the responses that students have saved to a question, which may or may not be the same as the final answers that they choose to submit. In the best case, these saved answers to the questions will adequately reflect the understanding of the student and allow the ML algorithms to recommend well-tailored problems.  In the worst case, students may realize that by saving incorrect answers (and thus, looking like they have poor understanding) will allow them to get an easy personalized question.  Student who game the system in this way will receive little benefit from the personalized question.  Additionally, it will cause the data that we collect to be misleading.

To overcome this limitation we suggest one of the following plans for the Fall 2015 product, in order from best solution to worst solution:

Option 1:  Students will be required to submit their answers to the core problems before unlocking the personalized problem.  This would essentially divide the homework into two parts with the first part being the set of fixed problems and the second being the set of personalized problems.  

Pros:  The option matches the intended functionality of personalized practice while removing the ability of students to easily game the system.

Cons:  Requires a major change in student workflow.  Students would need to budget additional time to do their assignment without knowing what personalized problem they will receive.  Students in the past have suggested that they do not like this workflow.  It would be possible as well to make the personalized problem a separate homework assignment with its own independent due data but this is also a large departure from the current user workflow.

Option 2:  Recommend personalized problems on the current LO, but use history on previous questions only in recommending that question.

Pros:  Personalized problem on a given homework assignment can be generated using all previous data and would not require any data from the current assignment.  This eliminates the gaming problem.

Cons:  We will have no data on the current LO when assigning the personalized problem.  Our current SPARFA-TAG algorithm cannot be used in this scenario and we would need to use a different algorithm (e.g., SPARFA-LITE) to carry out the recommendation process.  SPARFA-LITE can blend in old questions and use them to do prediction but it is still not clear if this prediction will be reliable.  Further analysis would be needed to determine if this option can work well.

Option 3: Do personalized problems on LOs explored in previous homeworks.  Like option 2, this gets around the issue of having no data on the current LO.  

Pros:  No need to collect data on the current homework to assign personalized problems.

Cons:  Personalized problem will cover different topics than those covered on the current HW.  This could potentially confound spacing effects on the spaced practice problems.

## Kevin's Comments

We need to consider that allowing students to "game" the PEs opens up the possibility that we won't gather *any* meaningful personalization data - just imagine if *every* student games the PE selection by sandbagging their preliminary answers to the CEs.  Is this an acceptable risk from business/product/research POVs?  For Alpha?  For the fall?
