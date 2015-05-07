## Tasked Exercise ~~Sources~~ Groups and Related Content

We need to be able to indicate

1. the page from which certain exercise steps are derived and
1. the means by which a certain problem was assigned, e.g. as a teacher assigned exercise, a spaced practice exercise, or a personalized exercise.

## Proposal

Add ~~`source`~~ `group` and `related_content` components to exercise step JSON:

```ruby
  id: "42",
  task_id: "37",
  type: "exercise",
  is_completed: false,
  url: "https://exercises.openstax.org/exercises/e2114v1",
  title: "force and motion",
  content: { blah blah },
  has_recovery: false,
  free_response: "blah blah blah",
  group: "spaced practice", # can be "default", "core", "spaced practice" or "personalized"
  related_content: [ # array is always present, but might be empty
    {
      title: "Force and motion",
      chapter_section: "4.1"
    }
  ]
```
