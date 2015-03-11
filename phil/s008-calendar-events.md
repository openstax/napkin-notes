# Calendar Events

... and how they might affect the structure of objects.

Some things to think about:

1. What happens when a teacher drags an item around in the calendar (maybe not v1)
  - should it `PATCH` the CalendarEvent or the actual Task/Plan
2. Do the `start_at/end_at` (`CalendarEvent`) dates nicely correspond to `open_at/due_at` for each type (Plan/Task/Basic)?
3. The types of Tasks and TaskPlans are roughly the same. Should they be?
  - `type = 'plan' and payload.type = 'reading'` vs `type = 'reading-plan'` (no need for `payload`)
4. Since the payload can be edited and there are multiple types in a list of `CalendarEvent`s, should the URL for editing a payload be:
  1. hardcoded in the client or
  2. in a `url` field

