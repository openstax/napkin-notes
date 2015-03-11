# GET /classes/012/plans

```coffee
total_count: 2
items: [
  {id: 123, type: 'reading', title: '', description: '', open_at: '', ... }
]
```

# GET /plans/123

``` coffee
id: 123
type: 'reading'
title: "Chapter 5.1 - 5.3 Reading"
description: ""
state: "published" # or "draft"
unit_id:
open_at: "2015-01-01T00:01.000Z"
due_at:

topics: [
  {id: 987, title: 'Inertial Frames of Reference', blah: '5.1'}
  {id: 876, title: 'Time, Velocity, and Speed', blah: '5.2'}
]

# GET only. All periods for the class
class:
  id: 012
  title: "Mr Smiths AP Physics"
  periods: [
    {id: 234, title: "Period 1"}
    {id: 345, title: "Period 2"}
    {id: 456, title: "Period 3"}
  ]

# GET only. not Patchable. See below
periods: [
  { id: 234, title: "Period 1", open_at: , due_at: }
  { id: 345, title: "Period 2", open_at: , due_at: }
]
```


# PATCH /plans/123

``` coffee
title: "Chapter 5.1 - 5.3 Reading"
description: ""
state: "published" # or "draft"
unit_id: 246
open_at: "2015-01-01" # Note: no time component and it's the class timezone, not UTC
due_at: "2015-02-10" # Note: no time component and it's the class timezone, not UTC
```

Returns the new JSON

# DELETE /plans/123

Returns a 200 status

# POST /plans

```coffee
type: "reading"
# These are all optional
title:
description:
unit_id:
due_at:
```

Returns the new JSON

# PUT|DELETE /plans/123/topics/987

Add/remove a topic from the reading. No body.

# PUT|DELETE /plans/123/periods/234

Add/remove custom time dates for a period

```coffee
due_at: "2015-02-10"  # Note: no time component and it is local timezone, not UTC
open_at: null         # To clear a date
```
