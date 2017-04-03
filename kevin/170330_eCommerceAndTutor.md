## Overview

Eventually, 
we need to have a way
to make money from `Tutor`,
and that will involve (apparently)
paid subscription services
of one sort of another.

## Potential Issues

### What happens if `Tutor` cannot reach `Payments` (or vice versa)?

We need to decide whether or not `Tutor`
will fall back on its local copy of access information (if any)
or deny access.

### How often must `Tutor` update its records?

If `Tutor` does, in fact, have a local copy of access information,
how often must it be updated?
Per page load?
Per day?
Per login (which could be very infrequent)?

### What needs to be updated/deployed if access policies change?

See below.

### Will access be to Tutor (as a whole), specific Courses, or something else?

See below.

### What information will be passed between `Payments` and `Tutor`?

Will it be a blanket boolean?  Or something more complicated like:
*dates per users
*courses per user
It would be desireable to have this interface not depend
on the specific policies we happen to be using at the moment
(it should be as policy-agnostic as reasonable).

And see below.

### BELOW: Do we really want `Payment`- and `Tutor`-related feature release schedules to be tightly coupled?

`Payment`- and `Tutor`-related features:
* change for different reasons
* change at different rates
* service different customers/stakeholders/risks
* have different business priorities
* have different levels of stability
* overlap very little (or at least they should IMO)

It strikes me as very odd
that we'd want to embed
this type of feature
inside of `Tutor`.

Creating a `Tutor` hotfix
for some payment-related issue
will cause way more headaches
than just having the `Payment` system
be its own server, IMO,
as long as the interface between
`Payment` and `Tutor`
is realatively policy-agnostic.
In this scenario, 
we only need to update `Tutor` once
(to handle the exchange of access information)
and then we can release `Tutor` and `Payments` independently
for the foreseeable future.
