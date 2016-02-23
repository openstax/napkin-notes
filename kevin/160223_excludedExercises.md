## Feature Overview

`Tutor` needs to support
the exclusion of `Exercises`
from assignments (`Homeword`, `Reading`, `PracticeWidget`, etc.).

Teachers need to be able to exclude `Exercises` with
(a) errors or 
(b) uncovered content.
Teacher exclusions are limited to their `Course`.

Admins need to be able to exclude `Exercises` as well,
but their exclusions will be applied globally
(so that `OpenStax` can pre-emptively exclude
known problematic `Exercises`).

Because `BigLearn` provides personalized exercises
to `Homework`, `Reading`, and `PracticeWidget` assignments,
it needs to support exclusions.

The current plan is to have `Tutor` create `exercise pools`
containing the excluded `Exericse` ids
and pass the pool UUIDs as extra parameters
to the `BigLearn` `projections` API.
The `projections` endpoint will then
extract the UUIDs and 
remove the excluded exercises
from the candidate exercise list
before invoking the `TeSR` algorithm
to select the personalized exercises.

These new exclusion pools 
are created like other `BigLearn` `exercise pools`,
and receive the same UUIDs.

## BigLearn Changes

### BigLearn Projections API Schema

An optional, potentially empty array of pool UUIDs
(like those used in the
[`pool_ids`](https://github.com/openstax/biglearn-platform/blob/master/app/biglearn/api/schemas/projections/next_questions.py#L37-L44)
field)
needs to be added to the
[`next_questions.py`](https://github.com/openstax/biglearn-platform/blob/master/app/biglearn/api/schemas/projections/next_questions.py)
schema.

This new field should be called
`excluded_pool_ids`
or something similar.

An example of defining an array of pool UUIDs can be found
[here](https://github.com/openstax/biglearn-platform/blob/master/app/biglearn/api/schemas/facts/pools.py#L30-L42).

### BigLearn Projections API Enpoint

The newly created `excluded_pool_ids` array
needs to be retrieved from the incoming request
somewhere in
[this code](https://github.com/openstax/biglearn-platform/blob/master/app/biglearn/api/endpoints/projections.py#L50-L67).

An example of retrieving array arguments can be found
[here](https://github.com/openstax/biglearn-platform/blob/master/app/biglearn/api/endpoints/knowledge.py#L85).

[This block of code](https://github.com/openstax/biglearn-platform/blob/master/app/biglearn/api/endpoints/projections.py#L73-L79)
will need to be altered
to load the excluded pools from the database
and remove the associated ids from
[`question_ids`](https://github.com/openstax/biglearn-platform/blob/master/app/biglearn/api/endpoints/projections.py#L75)
before the call to
[`compute_next_questions`](https://github.com/openstax/biglearn-platform/blob/master/app/biglearn/api/endpoints/projections.py#L81-L87).

We will need to ensure that edge cases are handled appropriately, especially:
* no excluded pools
* multiple excluded pools
* empty `question_ids` sent to `compute_next_questions`
  * perhaps avoid the call altogether in the case? 

## Specific BigLearn Non-Changes

It seems likely that, in theory,
excluded exercises should be removed
from `CLUE` calculations as well.
But we're specifically not handling this
at the moment.
