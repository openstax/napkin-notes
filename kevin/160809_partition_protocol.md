## Purpose

`Biglearn` will consist of several components (`BL API`, `SPARFA Base`, etc.)
each of which might be implemented by multiple servers.

Without significant interruption to processing, want to be able to:
* dynamically add/remove servers
* dynamically add/remove worker processes on those servers

Much of `Biglearn`'s work
can be partitioned into non-overlapping pieces
that can scale very well
and also minimize database transaction isolation issues.

The protocol described here can be used
by multiple processes on multiple machines
that share access to a common database
to partition work,
even as processes are dynamically
added or removed from the group.

## The Goal

Given `N` processes,
we want all processes to have:
* knowledge of the total number of processes (`N`)
* a unique `modulo-N` value [0..`N`)

We also want processes to
automatically detect newly added and/or removed processes
and renegotiate their shared knowledge.

## The Protocol

The current code is 
[here](https://github.com/openstax/biglearn-api/blob/klb_protocol/lib/protocol.rb).

It is called from a
[rake task](https://github.com/openstax/biglearn-api/blob/klb_protocol/lib/tasks/protocol.rake)
that takes a group UUID as a parameter:
```
bundle exec rake protocol:exper[7a27ebec-1e6a-4884-afe4-f35bccc57520]
```
All processes sharing the same group UUID
and access to the same database
will automatically negotiate the shared knowledge
described above.

If the command above is run in four separate terminals,
the outputs look something like this:
```
7a27ebec-1e6a-4884-afe4-f35bccc57520:[0/4] working away as usual...
```
```
7a27ebec-1e6a-4884-afe4-f35bccc57520:[1/4] working away as usual...
```
```
7a27ebec-1e6a-4884-afe4-f35bccc57520:[2/4] working away as usual...
```
```
7a27ebec-1e6a-4884-afe4-f35bccc57520:[3/4] working away as usual...
```

It is known that this protocol will not survive a network partition.

The code is currently written
to allow multiple threads 
(as opposed to processes)
to partition work.
This requires careful management
of `ActiveRecord` connections -
I'd very much like to maintain this capability going forward.
(It is especially useful for testing.)

## Open Questions

* Is the concept of a boss really necessary?  Could we eliminate it?
* Are there any race conditions remaining?
* Are heartbeats/timeouts/hangs/etc. all handled properly?
* Can we make this into a gem?
* To what extent can we test this?

