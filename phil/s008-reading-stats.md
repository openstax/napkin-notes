Based on http://mockups.openstax.org/Tutor_MVP_v2/start.html#p=course_calendar_-_teacher (click "Read Chapter 4")

**Note:** This JSON is read-only so no worries about nesting ; )

Maybe include it in `GET /plans/123` as `{stats: ... }` ; still thinking about this one.


For readability, I broke the JSON up into fragments (denoted by `ALL_UPPER_CASE`) that are assembled together at the end.

# STATS_DATA

First, there's that actual stats object.

As a sanity check, the number of these in the JSON is:

- `LO#`: number of current LO's covered
- `SP_LO#`: number of spaced practice LO's covered in the reading
- `PERIOD#`: number of periods in the class

`(LO# + SP_LO# * 2) * (PERIOD# + 1)`

- `2` is in there because each `SP_LO` will contain 1 `previous_attempt`
- `1` is in there because we need to provide aggregate stats for the entire class


```coffee
STATS_DATA =
  # page_id: 123 # Preferably, provide the existing Page JSON instead
  page:
    id:123
    number: "4.1"
    title: "Force"
  student_count: 4 # Number of students that answered questions on this topic (page). Used mostly for spaced-practice
  correct_count: 12
  incorrect_count: 3
  previous_attempt: STATS_DATA # Optional. Used for spaced practice
  # Below are added just for context (for designing the JSON, in case we need these later)
  # correct_students: [ ... ]
  # incorrect_students: [ ... ]
```

# ALL_OR_PERIOD

Next is the completed/partially-completed stats fragment for each Period (or for the class as a whole)

```coffee
ALL_OR_PERIOD =

  total_count: 20
  complete_count: 15
  partially_complete_count: 4
  # No need for unstarted_count. Plus, it would have been a past-tense word anyway ; )

  current_pages: [
    STATS_DATA
    STATS_DATA
  ]

  spaced_pages: [
    STATS_DATA # With a non-null `previous_attempt`
  ]
```

# PERIOD

```coffee
PERIOD =
  period:
    id: 1
    title: "First Period"

  (ALL_OR_PERIOD...)  # fragment is expanded in here
```

# Full JSON

Finally, the full JSON with full-class stats as well as stats for each period

```coffee
JSON =
  course: ALL_OR_PERIOD # (for the full-class stats)
  periods: [
    PERIOD
    PERIOD
  ]
```
