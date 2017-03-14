## How Student CLUEs are Calculated

SPARFA processes all student responses
(along with ecosystem information like concept hints)
to produce three matrices:

* `W`: the question-concept content map
* `U` (or `C`): the student-concept understanding map
* `d` (or `mu`): the question difficulty vector

The SPARFA calculations use each student's _first_ response to a question,
since that provides a better baseline than subsequent attempts.

These matrices
(well, only `W` and `d`, really)
plus the _current_ gradebook
(containing each student's _latest_ response to a question)
is fed to the CLUE calculator.
The returned CLUE 
reflects all of the student's work 
up to that point.

## How Students Use CLUEs to Cheat

As students answer questions in assignments,
`Tutor` sends their responses to `Biglearn`.
If a student goes back 
and changes a response on an open assignment,
the response is updated in `Biglearn`.

This opens up a path for potential cheating.

Students could examine their CLUEs
prior to answering a question
in an open assignment.
They could then select an answer,
wait a little while
(while `Biglearn` processes the new response),
then re-examine their CLUE
for the appropriate `page-module`.
If their CLUE increased,
they know they chose the correct response,
and if it decreased
they can guess again.

We know from bug reports
that teachers have seen this behavior in practice,
so it isn't a theoretical exercise.

## How to Prevent CLUE-based Cheating

The new `Biglearn` APIs provide information about assignments,
including their open and due dates.
This allows `Biglearn` to, for example, 
exclude questions from not-yet-past-due assignments
from Practice Widget.
It also allows `Biglearn`
to exclude those same questions
from CLUE calculations,
preventing the cheating scenario outlined above.

## Could `W`, `U`, and `d` Enable Cheating?

Not easily.

SPARFA is only given a student's first response to a question
(whether that is the first locked-in response
or an initial guess that could be changed later
doesn't really matter for the purpose at hand).
That initial response is merged
with responses from thousands of other students
during the SPARFA process,
so its impact on matrix entries will likely be quite small.
(The exception to this
is when only a small number of students
have answered a particular set of questions,
as might be the case
when rolling out new content.)
It would also be difficult students
to ensure that any effect that did occur
was due to _their_ responses
and not those from other students.

But let's suppose that only one student's response
was recorded between SPARFA runs,
and that somehow the student knew this.
Once the new matrices are computed,
they would be passed to the CLUE calculator,
and the student's CLUEs would be updated,
perhaps by a noticeable amount.
If the student knew enough
about the SPARFA and CLUE algorithms,
it might be possible to determine whether
the new response was correct or incorrect.
If it was correct,
the student has figured out the correct answer,
but if it was incorrect
only one response was eliminated
and the same trick cannot be used
to eliminate the others.
(This reasoning does not apply to True/False questions, of course.)

The scenario outlined above
assumes that the student has previously answered questions
in the `page-module` of interest,
otherwise there would be no previous CLUE for comparison,
and since questions from not-yet-past-due assignments
are excluded from CLUE calculations,
the current assignment is of no use.
