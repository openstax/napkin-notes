# Overview

GDOC: For comments: https://docs.google.com/document/d/15_hy_B-cUSomG8uw94VNQavy9aKwHIj3jK-MdQptBS8/edit

Right now the performance forecast pages are significantly slow.
While a few surface level issues have made the page load tolerable,
more work is needed to make the performance optimal.  This document
outlines possible solutions.

# Short term

## Tutor changes

1. Tutor needs to use the CLUE APIs facility for getting multiple CLUE
   values in one call.  Then entire list of tag queries (or pools) must
   be passed in one call.
2. Tutor needs to cache the values and call biglearn only when it
   determines that there is a change.
3. Optional: Additionally, tutor could also get the clue values when
   change happens or (as Kevin mentioned in a chat) using a background
   process to update periodically.  My preference is to update the
   CLUE when a change happens so that we can be as realtime as
   possible.

## Biglearn changes

Currently, the bottleneck for getting CLUE values is running
mini-SPARFAc update.  While this is very inexpesive for individual
students, for a teacher, this takes about 600ms in some cases. This is
not optimal.

A more optimal SPARFA update along the same lines as fast SPARFA must
work a lot better.  Right now we run C update on all the relavant
responses.  However, the changed responses may be a really small
subset of the relavant responses.  In order to account for this,
biglearn platform must send the "new"/realtime responses along with
the "old"/fact responses.  The CLUE algorithm must use these new
values to construct the input values for the update mechanism and
merge the results.

Given a list of learners, we could essentially run a mini sparfa C
update on _all_ their realtime responses.  And then calculate CLUE for
each given aggregation source (tag query or pool id).


# Long term

Biglearn's purpose should be to provide near-realtime updates on
requests without havin the clients worry about caching and
performance.  In order to accomplish that, its important that biglearn
understands or is provided with some structural information about future
requests.

For this particular case:

1. Tutor should create learner pools alongside question pools
2. Biglearn should precompute CLUEs for each learner + question pool
   and learner pool + question pool combination so that it can return
   CLUE values instantaneously.
3. A more effecient and simple CLUE update algorithm that takes care
   of any pending realtime responses (without using C, W) must be
   devised to make the CLUE realtime friendly.
4. This should also free tutor and other clients from the burden of
   having to cache CLUE values.
