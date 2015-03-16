# Sprint 8 Calendar Events (Dashboard Endpoint)

This note discusses the API used by the list and calendar dashboards to retrieve the contents 
of what should be displayed in the item lists / calendars, `/api/courses/123/events(/:role_id)`

## Background

JP [wrote up a potential API](https://github.com/openstax/napkin-notes/blob/master/jp/event_summaries_api.md) 
and then had [an ongoing PR discussion with Phil](https://github.com/openstax/napkin-notes/pull/1).
Later, [Phil raised some good questions](https://github.com/openstax/napkin-notes/blob/master/phil/s008-calendar-events.md).

## Do we need a common Event type in an API?

There are currently three types of entries in the events listings proposed and discussed above: tasks, task plans, 
and "basic" events.  The proposed/discussed approach is to list common parts of those entries in "event" responses,
where each event has a "payload" containing type-specific details.  Most of the discussion items revolve around
how to map type-specific details up into the generic "event" data, how to achieve changes to that data on the calendar
(e.g. moving items day to day), and how to reflect the type of entry vs the "subtype" or "payload.type" of the payload.

**Can we avoid all of these issues by just listing the different entries types in separate lists?**

That is, instead of:

```ruby
{
  events: [
    {
      # common event data
      # type-specific event data (subset of the GET for this specific event)
    },
    {
      # common event data
      # type-specific event data
    },
    {
      # common event data
      # type-specific event data
    },
  ]
}

```

... can we say the following?

```ruby
{
  plans: [
    {
      # type-specific event data
    }
  ],
  tasks: [
    {
      # type-specific event data
    }
  ],
  basics: [
    {
      # type-specific event data
    }
  ]
}
```

Then, the front end would make requests directly to the type-specific endpoints to achieve changes (e.g. to move plan
entries the frontend would call a plan endpoint).  Maybe some calendar entries can't be moved or have different moving
behavior and would benefit from being handled in a non-common way by the frontend.  Such an approach would also insulate
us against some new kind of entry type that doesn't fit the common-data mold.


Here's an fake data example for the common event data approach:

```ruby
{
  events: [
    {
      title: 'Chapter 2 Reading',
      starts: 20140202-08:08:01,
      ends: 20140202-08:08:01,
      type: 'plan',
      id: 42,
      data: {  # would contain selected info from GET /api/plans/42
        type: 'reading',
        trouble: false,
        stats: { # maybe include, maybe not
        }
      }
    },
    {
      title: 'Chapter 2 Reading',
      starts: 20140202-08:08:01,
      ends: 20140202-08:08:01,
      type: 'task',
      id: 87,
      data: { # would contain selected info from GET /api/tasks/87
        type: 'homework',
        complete: false
      }
    },
    {
      title: 'Thanksgiving!',
      starts: 20140202-08:08:01,
      ends: 20140202-08:08:01,
      type: 'basic',
      id: 63,
      data: { # would contain selected info from GET /api/basic_events/63
        # maybe not even anything here
      }
    }
  ]
}
```

And here's the corresponding fake-data example for breaking out the types into their own lists:

```ruby
{
  plans: [
    {
      open_at: 20140202-08:08:01,
      due_at: 20140202-08:08:01,
      id: 42,
      title: 'Chapter 2 Reading',
      type: 'reading',
      trouble: false,
      stats: { # maybe include, maybe not
      }
    }
  ],
  tasks: [
    {
      title: 'Chapter 2 Reading',
      open_at: 20140202-08:08:01,
      due_at: 20140202-08:08:01,
      id: 87,
      type: 'homework',
      complete: false
    }
  ],
  basics: [
    {
      title: 'Thanksgiving!',
      starts: 20140202-08:08:01,
      ends: 20140202-08:08:01,
      id: 63,
    }
  ]
}
```

