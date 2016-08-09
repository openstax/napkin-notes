## Purpose

`Biglearn` will consist of several components (`BL API`, `SPARFA Base`, etc.)
each of which might be implemented by multiple servers.

Without significant interruption to processing, want to be able to:
* dynamically add/remove servers
* dynamically add/remove worker processes on those servers

Much of `Biglearn`'s work
can be partitioned into non-overlapping pieces
that can scale very well
and can minimize database transaction isolation issues.

The protocol described here can be used
by multiple processes on multiple machines
that share access to a common database
to partition work,
even as processes are dynamically
added or removed from the group.

## 
