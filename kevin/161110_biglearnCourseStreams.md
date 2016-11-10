## Tutor Needs

`Tutor` will need to process ~20 events/sec/`Course`.
The events in one `Course` are independent
from events in other `Courses`,
so from a db performance perspective
we can [pretty much] consider just a single `Course`.

Within a `Course`, however,
all events are ultimately intertwined
by the need to increment the event sequence number.

There are three different ways to handle this
that I can think of:

```
begin                        begin                      while rollback:
  |                            |                           begin serializable
lock sequence number         do work                       do work
  |                    VS      |                    VS     update sequence number
do work                      lock sequence number          commit
  |                            |
commit                       commit
```

The rightmost is easiest to implement (IMO)
but could suffer performance-wise
when there is concurrent activity
within a single `Course`
(this seems likely under certain circumstances,
and could create a negative feedback cycle -
more workload causes more rollbacks causes more backlog, etc.)

The leftmost option basically causes all transactions to be serialized,
since each immediately locks the sequence number.
This avoids the rollback problem,
but could result in unacceptable performance.

The middle solution seems like the best,
since each transaction can do all of its work
before potentially blocking.
Rollbacks would only occur
if the work itself conflicts with other transactions
(and that could be avoided by a separate lock, if desired).
Only the update of the sequence number is serialized,
and I believe that will allow plenty of performance margin.

There are some "large" events in `Tutor`
(e.g., publishing an assignment),
but these can [always?] be broken apart
into collections of smaller events
to avoid major blockage/conflicts.

## Processing on Biglearn

`Biglearn` will process a `Course`'s events in order,
blocking if events are missing
due to problems or out-of-order delivery.
This means that the `Biglearn` results used by `Tutor`
will be stale until the missing events are delivered.

## Content Updates

There will be a separate content event stream
(to avoid duplication across all `Courses`).
Content update events will be issued on a per-`Course` basis,
and will block until any required but missing content stream messages have been delivered.
