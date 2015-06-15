# Task Plan Changes 2015/06/15

## Tasks::Models::TaskPlan Model Changes

### Attributes

In addition to its current `published_at` timestamp, add a `publish_last_requested_at` timestamp.  The FE will populate this latter parameter when they want to start the publish process.  They cannot set an `is_published` flag per se because the plan won't really be published until the distribution of the tasks from it is complete.  Also, timestamps are somewhat better than booleans for the backend in terms of indexing and meaning.  Decision to make: they could set an `is_published_requested` flag and the BE will set the timestamp.

### Validations

Update the `Tasks::Models::TaskPlan` model to have the following internal validations

1. After any Task from this TaskPlan is open, only the `name` and `description` can be modified.
2. Can change anything before any Task is open.
3. Cannot set `publish_last_requested_at` to nil after set.  Once published has been requested, all future saves of the plan will either error out or republish the plan.
4. Take the settings validations in the `DistributeTasks`- / assistant-land and put the validation check into `TaskPlan` (can this be done?).  We want to be able to check that `TaskPlan` settings are valid when saved, not just when we move to build tasks from it.  See https://github.com/openstax/tutor-server/pull/353#discussion_r32327735.

## On plan publish...

When the FE `PUT`s or `POST`s with `publish_last_requested_at` populated...

1. First check to see if the new or modified `TaskPlan` is valid.  This will catch errors like trying to publish after the open date.  Returns errors to the FE if present.
2. If no errors, do the following:
  * Until background jobs are ready to go:
    1. Delete any existing `Tasks::Models::Task`s for this `TaskPlan`
    2. Generate and assign new `Task`s.
  * After background jobs are ready to go:
    1. Start this in a background job and [return the job UUID to the FE](https://github.com/openstax/napkin-notes/blob/master/phil/conventions.md#async-operations).  Joe is already working on this mechanism.  Essentially we'll be giving the FE a URL like `/jobs/46c36d67-88e1-4c54-8ea6-2df165330486`.
    1. Kill any existing background jobs for this (this feature is close in lev, but not quite ready).  Will likely need to make sure they are dead so they aren't generating `Task`s in parallel with this effort.
    2. Delete any existing `Tasks::Models::Task`s for this `TaskPlan`
    3. Generate and assign new `Task`s.

Throughout the background task run, the FE can check the status of the job at the job URL above.

## Notes:

* For the background job that generates and distributes tasks, we'll likely want to store the job UUID in the `TaskPlan` so that the FE can check on the job status even if the user does a browser refresh.  We may be able to have lev store this information in redis (via its new Status object) or we can attach the UUID to the DB record itself.  Dante/JP/Joe to discuss.
