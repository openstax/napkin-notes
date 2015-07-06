# The Problem

Right now SPARFA Tag is run on the whole fact store.  SPARFA analyzes
all the questions, all the tags and all the responses put together.

On HSP Labs, for <20k responses to <1000 questions SPARFA tag took
~30 mins on a t2.micro instances.  While a larger machine would have
definitely speeded up the run, the data is nowhere near realtime
levels.

# Solution(s)

## Solution 1 - Partition by subjects

To take the HSP Labs example, we currently have two "subjects" - K12
Physics and AP Bio.  If we ignore high level conceptual topics like,
say, "analytical thinking exercises" or "visual exercises", there is
no overalp between these two subjects.

One way to reduce the time is to partition the data by subjects so
that multiple SPARFA tag runs can be done at the same time.

This requires that biglearn understands the concept of a "subject".


## Solution 2 - Algorithmic parallelization

While some of the papers suggest that parallization problem is
intractable, Drew has a few experiments to run to see if there are
easy ways to parallize SPARFA runs.


## Solution 3

The above solutions are not mutually exclusive.  If we do come up with
a way to do algorithmic parallelization, we can do that within each
subject giving us an even better chance at optimizing SPARFA.
