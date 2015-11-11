### Tutor Creates an Ecosystem

When Tutor creates an Ecosystem
(a versioned collection of book content and exercises),
it
[informs BigLearn](https://github.com/openstax/tutor-server/blob/master/app/subsystems/content/import_book.rb#L100)
about the exercise ids/versions of interest.

This results in a call to the BigLearn client
[#add_exercises](https://github.com/openstax/tutor-server/blob/master/lib/openstax/biglearn/v1/real_client.rb#L28-L32)
method, which 
[uses](https://github.com/openstax/tutor-server/blob/master/lib/openstax/biglearn/v1/real_client.rb#L222)
the BigLearn 
[`/facts/questions`](https://biglearnadmin-qa.openstax.org/docs/facts.html#post--facts-questions)
API endpoint.

Tutor sends a
[payload](https://github.com/openstax/tutor-server/blob/master/lib/openstax/biglearn/v1/real_client.rb#L237-L243)
which is a collection of entries of the form:
```
{
  exercise id (string),
  exercise version (integer),
  [list of exercise tags (strings)]
}
```

These entries are
[processed](https://github.com/openstax/biglearn-platform/blob/master/app/biglearn/api/endpoints/facts.py#L102-L158)
by BigLearn via a series of hacks
that will eventually need to be cleaned up.

Tutor also
[informs BigLearn](https://github.com/openstax/tutor-server/blob/master/app/subsystems/content/import_book.rb#L102-L106)
about pools of related exercises.
Once created,
these pools are referenced by their UUIDs
in future API calls.
This avoids the need
to constantly send sets of exercises
from Tutor to BigLearn
in each API call.

This results in a call to the BigLearn client
[#add_pools](https://github.com/openstax/tutor-server/blob/master/lib/openstax/biglearn/v1/real_client.rb#L34-L52)
method, which
[uses](https://github.com/openstax/tutor-server/blob/master/lib/openstax/biglearn/v1/real_client.rb#L226)
the
[`/facts/pools`](https://biglearnadmin-qa.openstax.org/docs/facts.html#post--facts-pools)
API endpoint.

Tutor sends a
[payload](https://github.com/openstax/tutor-server/blob/master/lib/openstax/biglearn/v1/real_client.rb#L245-L252)
of entries of the form:
```
{
  exerise id (string),
  exercise version (integer)
}
```
and receives back a BigLearn-assigned UUID for the pool.
(Note that the 
[`/facts/pools`](https://biglearnadmin-qa.openstax.org/docs/facts.html#post--facts-pools)
endpoint can also define pools using
tag queries or existing pools.)

### Tutor Creates a User

Newly-created Tutor users are
[assigned Exchange identifiers](https://github.com/openstax/tutor-server/blob/master/app/subsystems/user/create_user.rb#L32-L34)
(one for reading, one for writing)
and these identifiers are used by Tutor
when talking with Exchange and BigLearn
to avoid the spread of student
personally-identifiable information (PII)
beyond Tutor.

This results in
[a call](https://github.com/openstax/exchange-ruby/blob/master/lib/openstax/exchange/real_client/real_client.rb#L37-L41)
to the Exchange
`/api/identifiers` API endpoint,
which in turn results in
[a call](https://github.com/openstax/exchange/blob/master/lib/openstax/biglearn/v1/real_client.rb#L22-L35)
from Exchange to the BigLearn
[`/facts/learners`](https://biglearnadmin-qa.openstax.org/docs/facts.html#post--facts-learners)
API endpoint.

### Student Answers an Exercise

When a student answers an exercise, Tutor
[uses](https://github.com/openstax/tutor-server/blob/master/app/routines/send_tasked_exercise_answer_to_exchange.rb#L9-L14)
the student's Exchange write id
to send the
[response](https://github.com/openstax/tutor-server/blob/master/app/routines/send_tasked_exercise_answer_to_exchange.rb#L22)
and the 
[grade](https://github.com/openstax/tutor-server/blob/master/app/routines/send_tasked_exercise_answer_to_exchange.rb#L27)
to Exchange.

Exchange
[turns around](https://github.com/openstax/exchange/blob/master/app/routines/create_or_update_activity_from_event.rb#L27-L28)
and
[sends](https://github.com/openstax/exchange/blob/master/lib/openstax/biglearn/v1/real_client.rb#L37-L51)
the response to the BigLearn
[`/facts/responses`](https://biglearnadmin-qa.openstax.org/docs/facts.html#post--facts-responses)
API endpoint.

### Tutor Resets a Practice Widget

A practice widget is a group
of five personalized (BigLearn-chosen)
exercises that a student can work
at any time.
There is one practice widget per student and,
when all of its exercises have been answered,
it needs to be
[reset](https://github.com/openstax/tutor-server/blob/master/app/routines/reset_practice_widget.rb#L39-L45).

To reset a practice widget,
Tutor
[requests a "projection"](https://github.com/openstax/tutor-server/blob/master/app/routines/get_ecosystem_exercises_from_biglearn.rb#L10-L16)
of the "best" exercises for the student.
This results in Tutor
[making](https://github.com/openstax/tutor-server/blob/master/lib/openstax/biglearn/v1/real_client.rb#L83)
a
[call](https://github.com/openstax/tutor-server/blob/master/lib/openstax/biglearn/v1/real_client.rb#L230)
to the BigLearn
[`/projections/questions`](https://biglearnadmin-qa.openstax.org/docs/projections.html#get--projections-questions)
API endpoint.

Tutor
[passes a pool UUID](https://github.com/openstax/tutor-server/blob/master/lib/openstax/biglearn/v1/real_client.rb#L81)
to BigLearn to limit the set of possible exercises returned
to those appropriate for the current student
based on the student's task history.
Because BigLearn can only make projections
against a single pool,
Tutor will
[create a pool on the fly](https://github.com/openstax/tutor-server/blob/master/lib/openstax/biglearn/v1/real_client.rb#L79)
if necessary.

### Tutor Fills a Personalized Exercise Placeholder

Both 
[homeworks](https://github.com/openstax/tutor-server/blob/master/app/subsystems/tasks/assistants/homework_assistant.rb#L72)
and 
[readings](https://github.com/openstax/tutor-server/blob/master/app/subsystems/tasks/assistants/i_reading_assistant.rb#L60)
can contain personalized exercises
which are not chosen
until the student
[has completed](https://github.com/openstax/tutor-server/blob/master/app/subsystems/tasks/models/task.rb#L122-L134)
all of the 'core' exercises
in the assignment.
To support this,
Tutor places personalized exercise placeholders
in the assignments upon creation,
and fills the 
[homework](https://github.com/openstax/tutor-server/blob/master/app/subsystems/tasks/placeholder_strategies/homework_personalized.rb)
or
[reading](https://github.com/openstax/tutor-server/blob/master/app/subsystems/tasks/placeholder_strategies/i_reading_personalized.rb)
placeholders later
when more information is available.

The calls from Tutor to BigLearn
to fill the personalized exercise placeholders
is exactly the
[same](https://github.com/openstax/tutor-server/blob/master/app/routines/get_ecosystem_exercises_from_biglearn.rb)
as those for resetting a practice widget,
except the pools
from which BigLearn can choose exercises
are potentially different.

### Tutor Displays a Learning Guide

When Tutor
[creates a learning guide](https://github.com/openstax/tutor-server/blob/master/lib/course_guide_methods.rb#L68-L80)
(a summary of student
current level of understanding estimates (CLUEs)
per book page or chapter)
it
[ultimately](https://github.com/openstax/tutor-server/blob/master/lib/openstax/biglearn/v1/real_client.rb#L175)
ends up
[using](https://github.com/openstax/tutor-server/blob/master/lib/openstax/biglearn/v1/real_client.rb#L234)
the BigLearn
[`/knowledge/clue`](https://biglearnadmin-qa.openstax.org/docs/knowledge.html#get--knowledge-clue)
API endpoint.

The
[`/knowledge/clue`](https://biglearnadmin-qa.openstax.org/docs/knowledge.html#get--knowledge-clue)
endpoint takes a group of learner ids
and computes their aggregated CLUEs
for each of the pool ids given.
