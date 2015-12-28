# Background Job Tracking Issues 12/2015

Our current approach for tracking background job status is inefficient and ineffective.

## Current Problems

1. Jobs never leave redis (unless they hit some redis expiration) -- we are just going to accumulate more and more
2. Jobs listing (index) pages on tutor-server are pretty useless.
  * takes a long time to load, and then it is just a massive list of UUIDs with no context.
  * need pagination / filtering / stats
3. We currently maintain individual entries in Redis for each job and a separate array of job IDs in Redis (not so good).
  * The array of Job IDs is what is making both creation of background jobs and execution of background jobs slow.
  * Job ID array updates are not atomic, so it is quite likely we are dropping a bunch of IDs on the floor (on -kev, we have 1.4 M DelayedJobs in the database but only 322k IDs in the redis list).  This isn't currently a fatal flaw because we are only using this array for showing "all" jobs (or jobs in certain states) on the admin pages.  However, since it is already slow the fact that it isn't right is doubly bad.
  * Our intent behind the job ID array is good, but our implementation is not good (we need to be using native Redis functions)
3. Jobs with a deprecated "complete" status linger

## Actions

1. Remove `Lev::BackgroundJob` from Lev and into its own gem, openstax/[job_status, job_info, job_report, jobba, etc]
  * This class has no dependence on Lev.
  * By moving it into its own class, we'll be able to make and monitor non-lev jobs.
  * This code has some significant problems (see above) that I think deserve to be addressed in its own baseline.

## Desired Gem Features

1. job killing support
  * need two states: KILL_REQUESTED and KILLED, because it will generally be up to the job itself to check that a kill has been requested and to self-terminate.
2. all states need a corresponding timestamp when the state was set, e.g. queued_at, killed_at, kill_requested_at, started_at, etc.
3. should be able to return collections of statuses on which bulk operations can be done, e.g. "delete all", "kill all".
4. Be able to return which jobs have been worked for which arguments (e.g. can get a list of jobs run on `Some::Model` with id 42)
  * only need to do this for model-like args.
  * useful for helping clients know which jobs have been done or are queued/working for certain models.
5. Be able to return all jobs for a certain job type (e.g. routine)
6. Want to retain job statuses for different amounts of time -- e.g. "send X to exchange" we don't need to know about long past it is successful; publishing a task plan we might want to know about for a long time (until some later expiration date or until the task plan is deleted)
  * Jobs themselves could conceivably dictate if status tracking is used, how long it is maintained, etc.
7. Quickly get min, average, max job durations for a set of jobs
8. Be as efficient as possible for large numbers of jobs (500k+)

## Tutor Desired Features (re jobs)

1. Convert the /admin/jobs page to a listing of statistics, where stats are clickable to drill down and see more details.
  1. Show counts for each status (e.g. Succeeded: 702, Queued: 341, etc)
  2. have the ability to filter these stats by:
    * resource (TaskPlan 42)
    * job name ("DeleteTaskPlan")
    * state
    * time span (e.g. see jobs created last week)
2. The jobs "show" page should have as much info as possible (all of the state timestamps, errors, resource arguments, job type/name, links to [remove tracking, kill job], duration)
3. Ways to kill/restart job workers? (dunno about this)

## Implementation Thoughts

1. For the gem, use Redis explicitly as the backend; the current implementation's use of activesupport cache limits our ability to use efficient native redis functions.
  1. Can keep lists or sets of job IDs for each status or for each job name (routine name); can intersect those sets to do filtering (e.g. "show me all failed book imports")
  2. with sorted sets, we can include timestamps to facilitate sorting/filtering certain properties by time.
  2. Can set succeeded jobs to expire in X days; everything else can expire after 180 days (maybe this isn't the best idea)
  3. Use fake_redis for tests
  4. Use ability to have multistep atomic operations (if needed)

## References

1. http://openmymind.net/2011/11/8/Redis-Zero-To-Master-In-30-Minutes-Part-1/
2. http://redis.io/topics/twitter-clone
