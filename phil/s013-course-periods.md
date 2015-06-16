Screens:

- Calendar Popup (read-only)
- Roster (Read-only)
- Performance book (Read-only)
- HW Builder (Edit other things based on periods)


# List of Periods

`GET /courses/1` contains:

```coffee
title:
periods: [ {
  id:
  name: # 3 char (readonly)
} ]
timezone:
default_due_time: ??
default_open_time: ??????
```

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

Decision: Needs discussion w/ UX

```coffee
{periods: [ {id: , name: , stats: } ] }
```

period break up of https://tutor-demo.openstax.org/api/docs/v1/task_plans/stats
```coffee
[ { period: { id, name }, stats: ... } ]
```

# Performance Report

rolled up to course?
https://tutor-demo.openstax.org/api/docs/v1/courses/performance
in the export for BE

```coffee
[
 {
   period: { id, name: },
   data_heading: {},   # same as existing
   student_data: []    # same as existing
  },  # repeat this for each period
]
```

# Roster

The endpoint is `/courses/42/students`

```coffee
[
  {
    id: "34"               # The ID of the student record, later used in /students/123
    first_name: "Jimmy"
    last_name: "Tudeski"
    name: "Jimmy Tudeski"
    period_id: "32"        # all IDs are strings for FE
    role_id: "78"          # The role ID, used for masquerading as a student
  }
]
```

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
