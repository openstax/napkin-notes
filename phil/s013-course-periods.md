Screens:

- Calendar Popup (read-only)
- Roster (Read-only)
- Performance book (Read-only)
- HW Builder (Edit other things based on periods)

# 2 Options

## getting all periods in 1 call

Pros:

- 1 request, 1 store

Cons:

- lots of (unused) bits to retrieve
- URL has different JSON format for student and teacher
- cache invalidation is more complicated and occurs more frequently


## separate calls for each period data

*(Not doing this one)*

Pros:

- JSON has same format
- Only retrieve the period when clicked

Cons:

- need to retrieve list of periods first (serial retrieval, not parallel)
- unclear what happens on URL endpoints when `./periods/1` is removed
- More complicated store
- May need to remember period in the URL (esp for Learning Guide)


# List of Periods

`GET /courses/1` contains:

```coffee
title:
periods: [ {
  id: "1"
  name: # 3 char (readonly)
} ]
timezone:
default_due_time: ??
default_open_time: ??????
```

Update/Delete:

`POST /courses/1/periods` with `{name: }` and `DELETE /courses/1/periods/1` (What happens to students in that period?)


# HW Builder (also iReading Builder)

Initial `POST`: contains period times
Saving:

```coffee
PATCH /plans/1 with { tasking_plans: [ {target_id: , target_type:, due_at: , opens_at: } ] }
```

e.g.

```coffee
{ tasking_plans: [ { target_id: "42", target_type: "period", due_at: timestamp_here, opens_at: timestamp_here } ] }
```

# Dashboard / Calendar
need the endpoint to have the same due time / tasking information as HW builder (parallel to how we are moving due_at from task plan to tasking plan)

```coffee
{
  ...
  tasking_plans: [
    target_id: "42",
    target_type: "period",
    opens_at: blah,
    due_at: blah
  ]
  ...
}
```

# Calendar Popup

```coffee
stats: [ {period_id: "1", ... } ]    # where ... is stats-specific data
```

# Class Aggregate review stats

(same as Calendar Popup but with different `...`)


# Learning Guide

`GET /courses/1/guides` (or `teacher_guide`?)

```coffee
[
  { period_id: "1", ... }
  # More periods here
]
```

# Performance Report

rolled up to course? No. Only by period.
https://tutor-demo.openstax.org/api/docs/v1/courses/performance
in the export for BE

```coffee
[
 {
   period_id: "1"
   data_heading: {}   # same as existing
   student_data: []    # same as existing
  }
  # repeat this for each period
]
```


# Roster

`GET /courses/1/roster`

```coffee
[
  {
    period_id: 32
    name: “Jimmy”
    role_id: 78
  }
]
```

Update/Add/Delete:

- `POST /courses/1/roster` with `{name: , student_id? }`
- `PATCH /courses/1/roster/78?` with `{name: , period_id: }`
- `DELETE /courses/1/roster/78`


# Questions

- Do we support adding periods? No
- PHIL: What to do with default open/due dates?
- PHIL: Should all the periods have a due date or a default for the course and then override for periods?
- JP: Are all assignments always assigned to all periods?
- PHIL: Really, no course-level stats for calendar popup?


# Links

- http://mockups.openstax.org/Tutor_MVP_beta_release/start.html#p=johnny_tran_dashboard_-_visual_design_-_1
- https://tutor-demo.openstax.org/api/docs/v1/
- http://mockups.openstax.org/Tutor_MVP_beta_release/start.html#p=add_homework_1



# Notes
Async publish TaskPlan
