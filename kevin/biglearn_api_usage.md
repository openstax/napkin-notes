### Tutor Creates an Ecosystem

When Tutor creates an Ecosystem
(a versioned collection of book content and exercises),
it informs BigLearn
about the exercise ids/versions of interest:
[ImportBook](https://github.com/openstax/tutor-server/blob/master/app/subsystems/content/import_book.rb#L100)

This results in a call to the BigLearn client
[#add_exercises](https://github.com/openstax/tutor-server/blob/master/lib/openstax/biglearn/v1/real_client.rb#L28-L32)
method, which 
[uses](https://github.com/openstax/tutor-server/blob/master/lib/openstax/biglearn/v1/real_client.rb#L222)
the BigLearn 
[`/facts/questions`](https://biglearnadmin-qa.openstax.org/docs/facts.html#post--facts-questions)
API endpoint.

### Tutor Resets a Practice Widget

### Tutor Displays Learning Guide

### Student Answers Exercise

