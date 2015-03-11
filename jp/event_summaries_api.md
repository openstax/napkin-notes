Eventually we'll need an API endpoint to provide event data that can be used to populate a calendar or list view dashboard.  

Proposed endpoint: `GET /api/courses/123/events`

Events will include many different types, e.g. plans, tasks, named events, etc.

```coffee
events: [   # could maybe be a lone top-level array if there are no other fields
  EVENT_DATA
  EVENT_DATA
]
```

# EVENT_DATA

Common `EVENT_DATA`:

```coffee
  start_at: timestamp
  end_at: timestamp
  is_trouble: false
  payload_type: 'plan'   # distinguish plans from tasks from basic events
  payload:
    id: 42  # to be used with GET /api/plans/42
    title: 'Chapter 2 Reading'
 ```

# About `payload_type`

Events that are shown on the dashboard cover a number of different types.  For example a teacher's calendar can include plans (task plans) that they've created, tasks that they've been assigned (e.g. later grading tasks, course admin tasks), and named events that they have created.  Later if we have a more general `/api/events` endpoint to get events across courses the type information will become even more important.  The `payload_type` of an event can be used to determine the endpoint to get more information, as in:

| type       | endpoint       |
|------------|----------------|
| 'plan'     | /api/plans/123 |
| 'task'     | /api/tasks/567 |
| 'basic'    | /api/basic_events/456|

It is likely useful to include a bit more information about each event so that the frontend have a more useful display without making one extra `GET` for each event.  E.g. if the frontend knew that the plan was an iReading plan it could style it differently than a homework plan.  Also some events may have type-specific data like a "trouble" warning for teachers on iReading plans to indicate that students are not faring well in their reading assignments.

We could encode this extra information with nested data structures that contain a subset of the info that would be retrieved from calling the event type's particular endpoint, e.g.:

```coffee
{
  events: [
    {
      start_at: '20140202-08:08:01'
      end_at: '20140202-08:08:01'
      payload_type: 'plan'
      payload:  # would contain selected info from GET /api/plans/42
        id: 42
        type: 'reading'
        title: 'Chapter 2 Reading'
        is_trouble: false
        stats: { # maybe include, maybe not
        }
    }
    {
      start_at: '20140202-08:08:01'
      end_at: '20140202-08:08:01'
      payload_type: 'task'
      payload: # would contain selected info from GET /api/tasks/87
        id: 87
        type: 'homework'
        title: 'Chapter 2 Reading'
        is_complete: false
    }
    {
      start_at: `20140202-08:08:01`
      end_at: `20140202-08:08:01`
      type: 'basic'
      payload: # would contain selected info from GET /api/basic_events/63
        # maybe not even anything here
        title: 'Thanksgiving!'
        id: 63
    }
  ]
}
```

Note here that we have two different levels of `type` information: one at the top-level represents the type of event.  The other specializes the type.  The approach listed at the top of this document flattens the data structure, and because we have two `type` fields to represent we call the lower one a `payload.type`.

Here are some potential `type` and `payload.type` combinations

| type       | payload.type |
|------------|--------------|
| `plan`     | `reading`, `homework`, `survey`, `interactive`, `grading`, etc |
| `task`     | `reading`, `homework`, `survey`, `interactive`, `grading`, `accept_deny_student`, `testprep`, etc |
| `basic`    | maybe no subtypes |
