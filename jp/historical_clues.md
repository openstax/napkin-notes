# Storing CLUE History

Recent discussions have started to imply the need for Tutor to maintain a history of CLUE values for students and groups of students.  One example of this is the "Most Improved" section of the new learning guide.  Another discussion from a few weeks ago talked about plotting CLUEs over time intermingled with a log of learning events to show progress.

Given that BigLearn does not maintain a history, I think we need to.  A history of CLUEs also provides us with a place to persist CLUEs and selectively update them (or reuse cached values) depending on how much state has changed in tutor.

## A Model Proposal

We'll want to remember which cached/historical CLUEs are attached to which roles and which tags so that we can return cached versions of them.  The tags are recorded in a "tag set" so we don't have to always copy the same tags over and over for many many students.

There's an extra twist to recording which role(s) a CLUE belongs to.  A typical use case is getting a CLUE value for a course period.  If we are tracking a period's CLUE for section 4.2 over time, we'll want to persist that history even if a student is added to or dropped from the period occasionally.  So instead of maintaining a "role set" like a "tag set", we let callers label a set of roles so that they can always refer to that same conceptual grouping of roles even if the exact list of roles changes somewhat over time.  So each CLUE is attached to a "role label".  Which roles are found under that label can be found in the `ClueRoleLabelRole` join table.  Role labels can be provided as strings directly, or they can be provided as ActiveRecord objects in which case we'll convert them to a string by getting their Global ID.

Each CLUE value needs to record a history of values, confidence intervals, and sample sizes, along with the timestamp at which each of those values was pulled from BigLearn.

```
Clue
----
id
clue_role_label_id : integer
tag_set_id : integer
values : float[]
lower_confidences : float[]
upper_confidences : float[]
sample_sizes : integer[]
timestamps : datetime[]
stale_count : integer
```

TagSet contains a unique list of tags -- saves us from copying the same tags over and over, and also enables pulling all CLUEs for the same tags later if needed.

```
TagSet
------
id
tags : string[]   # unique, likely makes sense to alphabetize
```

Maps the label string name to an integer so we don't copy it over and over.  Also, might be the place later where stale_count thresholds are stored, timeouts are stored, etc.

```
ClueRoleLabel
-----------
id
value : string    # likely a global_id of a passed in object (role, period, etc)
```

Join table between the labels and the roles.  Helps us know which CLUEs to update when a role indicates that changes have been made.

```
ClueRoleLabelRole
---------------
id
clue_role_label_id : integer
entity_role_id : integer
```

**Notes**

1. The `float[]` are Postgres arrays (omg JP considers using a PG-specific feature)
2. You might look into whether pulling out the current value out of the array is efficient or not, or whether we'd want to have standalone values for the latest CLUE info (so we don't have to load a whole array).  I have no idea if there's an issue here or not.
3. These models likely need to be prepended with some sort of biglearn table namespace.


## How Clues are updated

Whenever a student works an exercise their CLUE related to that exercise likely changes.  However, we don't necessarily need or want to update the CLUE value after each exercise.  The `stale_count` field exists to help us know when to update our cached CLUEs.

Every time a student works an exercise we can increment the `stale_count`.  Updates of the CLUE value are only done once the count passes a pre-set threshold.  For CLUEs attached to a single role, maybe the threshold is 2 and for CLUEs attached to multiple roles (e.g. for periods), it could be 10.  We can then proceed in at least three different ways:

1. **Background** Whenever the `stale_count` reaches a configured threshold, a background worker calls off to BigLearn to update the CLUE (which stores the new value and timestamp in the history and resets the stale_count).

2. **Just-in-time** Whenever some other process (e.g. the performance report) requests current CLUE values, the CLUEs with `stale_count`s above the threshold could be updated (fewer unneeded updates but potentially too many updates at once).

3. **Cron** A cron job could be set up to process stale CLUEs every 20 minutes, with just-in-time updates happening when requests come in like in (2).

I lean towards implementing the just-in-time approach first and then supplementing with the cron approach.

## Some pseudocode & comments

The model proposal above lets us implement historical CLUE values without really changing the BigLearn interface all that much.  The main method `get_clue` still looks the same -- it requires `roles` and `tags`.

```ruby
module OpenStax::Biglearn::V1
role_label: nil
  def self.get_clue(roles:, tags:, role_label: nil)
    clue_role_label = find_create_or_update_role_label(role_label: role_label, roles: roles)
    tag_set = find_or_create_tag_set(tags: tags)

    clue_model = # run query to find AR CLUE given clue_role_label, tag_set

    # if model doesn't exist, create it anew

    # if stale, update the clue (just-in-time)

    # Currently we return a hash -- instead, let's return a
    # OpenStax::Biglearn::V1::Clue PORO that wraps clue_model
  end

  def self.exercise_completed_for(role:, tags: nil)
    # This method helps BigLearn expire cached CLUE values
    #
    # First pass implementation (overly conservative)
    #
    #  1) Find all clue_role_label_ids for the provided role
    #  2) Find all Clues for those clue_role_label_ids and
    #     increment their stale_count
    #
    # Second pass
    #
    #  1) Find all clue_role_label_ids for the provided role
    #  2) Find the TagSets that have tags matching ANY of
    #     the provided tags.
    #  3) Find the Clues for the combinations of the discovered
    #     clue_role_label_ids and TagSets and increment their
    #     stale_count
  end

  protected

  def self.find_create_or_update_role_label(role_label:, roles:)
    role_label = case role_label
    when String
      role_label
    when ActiveRecord::Base
      role_label.to_global_id.to_s
    else
      raise IllegalArgument
    end

    clue_role_label = ClueRoleLabel.where(value: role_label).first

    # if clue_role_label nil, create it and add the roles to the
    # ClueRoleLabelRole join table

    # if clue_role_label not nil, check to see if roles need to be updated
    # this seems a little expensive unfortunately... (maybe not with PG
    # array intersection functions?)... if too expensive might consider
    # doing this operation elsewhere.  By keeping the list of roles up
    # to date for the label, it is easier for client code to invalidate
    # period CLUEs without having to know that a role that just completed
    # an exercise is in a certain period.

    clue_role_label
  end

  def self.find_or_create_tag_set(tags:)
    # find or create the tag set and return
    # to be efficient might want to sort the tags before creating the set
    # (maybe makes queries faster?)
  end

end
```

```ruby
module OpenStax::Biglearn::V1
  class Models::Clue < ActiveRecord
    # implements the basic activerecord stuff
  end

  class Clue
    # is a read-only PORO that can be handed back from `get_clue` above
    # wraps/hides the ActiveRecord CLUE.  Should provide readers for
    # getting the current values like we have now (e.g.
    # def value; model.values[0]; end) in addition to methods to retrieve
    # historical values.

    # Left as an exercise to the reader if we want two different POROs here
    # one for a CLUE at any time and another that looks like a collection
    # of of those basic CLUEs at all different times.
  end
end
```

While I don't think it is a great place to be doing this, `Tasks::Models::TaskedExercise`'s
`handle_task_step_completion!` method is already making calls out, so it could also be the one
to call

```ruby
OpenStax::Biglearn::V1.exercise_completed_for(role: ..., tags: ...)
```

which would increment the appropriate `stale_count`s.


## Responsibility for determining % improvement

The new learning guide has features based on time differences of CLUEs.  The array of values stored in the CLUE can let us compute these values over arbitrary intervals, but we might want to consider having clue store this particular previous value at the ready in its own dedicated field (so it doesn't need to search through the arrays and compute it from scratch each time a requets for this value is made).  I guess this is a minor efficiency question.

## Misc Actions / Notes

1. Implement a cron job to update stale CLUEs (can be later, just-in-time will do for the moment).  We've already added cron jobs to tutor-server using `whenever`, see `config/schedule.rb`.
2. Figure out what time span we want to use to calculate "most improved".
3. Even if we pull multiple CLUEs per day, might we want to only store one per day? (maybe later, might be good to keep all CLUE pulls for the time being for debug purposes)
