# Exchange Identifier Changes

## Desired Situation

What is currently written at https://github.com/openstax/exchange/tree/master/doc

## Current Situation

It is similar to the desired situation except that:

1. Identifiers are just one randox hex string instead of being split into read-only and read-write pieces.
2. The closest thing to "analysis IDs" are "research labels", which you'll see in and around the `Identifier` and `Person` models.  The research labels are currently attached to the `Identifiers` which are then aggregated in the `Person`.  You'll have to figure out where best to store things in the new way, keeping in mind the requirement that all data be exported under the analysis ID.
3. There is no merging capability yet (tho we do have a plan for how to do this).  I would say you don't need to worry about merge stuff too much unless Lakshmi really wants to get his part of that into BigLearn and have someone test it out.

The above of course only talks about changes to Exchange.  There are also related changes to exchange-ruby and tutor-server that are documented in other pivotal cards.

## References

1. Discussion in https://www.pivotaltracker.com/story/show/88795142
1. The gist in https://www.pivotaltracker.com/story/show/92100584
