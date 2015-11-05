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

### Student Answers an Exercise

### Tutor Resets a Practice Widget

### Tutor Fills a Personalized Exercise Placeholder

### Tutor Displays a Learning Guide

