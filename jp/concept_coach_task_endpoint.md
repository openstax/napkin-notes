This doc describes how the FE gets a set of CC exercises for a particular page and user.

## GET /api/cc/tasks/:book_cnx_id/:page_cnx_id

Here's what this endpoint does

1. Find CC courses user is enrolled in.  Find ecosystem in those courses containing the referenced CNX page, and get the Student record for the user.
  * If can't find a match, return the 'not_enrolled' error described below.
2. Look up existing task for this Student and CNX page combination.  If found return.
3. If not found, create it and return it.
  * Creation should be very fast.  Lookup pool of exercises and make TaskedExercises for first X of them.  Spaced practice will be populated by placeholders (event-driven, we want to delay as long as possible in choosing them)

### successful retrieval response:

Will look very similar to the current Task output.  Exercise steps will look identical.  The Task may have a few more fields, and maybe some missing that aren't relevant -- we'll see about that latter part.

### 'not_enrolled' Error

```ruby
{
  error: 'not_enrolled',
  concept_coach_enrollments: [ # provided in case student landed on wrong CC
    {
      course_name: 'blah',
      period_name: 'blah',
      cnx_url: 'full URL here'
    },
    ...
  ]
}
```

## ConceptCoachTask Model

This task is very similar to the normal task but it has a few differences that suggest that we make it a separate class.

ConceptCoachTask
----------------
book_location: array
CNX book/page IDs
...
...

## Open Questions

1. What to do about plans?
  *They aren't completely appropriate here, but are useful in terms of grouping tasks -- can we do this another way?
2. what to do about open/due dates?
  * These tasks are open for the duration of the course, but we currently have no dates on the course
3. How does importing new content versions affect our reliance here on CNX IDs?
