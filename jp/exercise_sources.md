## Tasked Exercise Sources

We need to be able to indicate (1) the page from which certain exercise steps are derived and (2) the means by which a certain problem was assigned, e.g. as a teacher assigned exercise, a spaced practice exercise, or a personalized exercise.

## Proposal

Add `source` and `related_content` components to exercise step JSON:

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
  source: "spaced", # can be "teacher", "personalized", "spaced" or not set
  related_content: [ # we could make it not be an array / could be not set
    {
      title: "Force and motion",
      chapter_section: "4.1"
    }
  ]
```
