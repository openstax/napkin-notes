# The Problems

Biglearn platform's various algorithms detect connections between
questions and any topics associated with them.  They do that based on
how those questions are answered by students.

The questions used by biglearn are sourced from the exercises
application.  Sometimes users change these questions either to correct
a minor typographical error or to completely change the question in a
way where it doesn't relate to the original one anymore.  Exercises
doesn't have any way to know the extent and gravity of the change.  So
for both these cases, it creates a new version.

The above issue manifests as two problems in the tutor-biglearn
ecosystem.

## Problem 1: Divergence

This presents a problem for biglearn as it now has one set of data for
the same question, but two versions which may have possibly diverged.

## Problem 2: Imprecision

The second manifestation of the same problem is that tutor may have
courses set up at different times.  Each of these courses are setup to
use a particular version of a question.  Tutor requests biglearn with
a boolean logic query based on tags.  However, these tags are assigned
to a question and not to a particular version.  This leads to biglearn
providing tutor with a suggestion based on the latest version of a
question and not the version that is desired by tutor.

# The Solution

To solve the above issue, biglearn needs to solve each of the
manifestations separately.

## Part 1: Exercise Pools

Since tutor, by extension, all biglearn clients care about specific
exercise versions, biglearn needs to know the versions that each of
the client's is interested in.  In order to facilitate that biglearn
will provide an API that will allow clients to create exercise pools.

Pools are immutable.

### API

1.  Create Pool: `/facts/pool`. This will take the following
    parameters:

    1. Name: The name of the pool to be created.
    2. Question list: List of question ids, versions, tags, and
       taxonomy.  If a question does not exist in biglearn, it is
       created automatically.

   This API will return a unique ID of the pool that can be used by
   the clients when calling biglearn.

2.  Next Question: `projections/questions`.  This will now take an
    additional `pool_id` parameter.

3.  Submit Response: `facts/response`.  This will now take an
    additional `pool_id` parameter.

4.  CLUE: `knowledge/clue`.  This will also take an additional
    `pool_id` parameter.  However, the returned CLUE value may span
    multiple pools based on how we tune the algorithms.

## Part 2: Divergence detection

In order to detect and record exercise versions that have diverged,
biglearn will maintain an internal exercise id, that maps to one or
more versions of a given exercise.

Biglearn will have an algorithm to detect divergence based on student
responses.  Whenever the algorithm detects a divergence, a new id is
created and the diverged version is remapped to the new id.

Its also possible that the converse of this problem, where two
divergent versions start becoming similar as changes are made.
However, this will be a corner case and won't have much of an impact
either way.  So we can punt on it until it surfaces as a real problem.


# One more problem

An exercise may also have a presentation mode option.  That is, an
exercise may be presented as multiple choice exercise, or a free
form exercise.  This, however is a fairly straightforward problem
since these are essentially different exercises as far as biglearn
is concerned.

Whenever presentation modes are introduced, biglearn needs to be given
that information when a pool is created.  Biglearn will create a new
internal id for each presentation mode of an exercise.
