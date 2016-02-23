## BigLearn Changes

### BigLearn Projections API Endpoint

An optional, potentially empty array of pool UUIDs
(like those used in the
[pool_ids](https://github.com/openstax/biglearn-platform/blob/master/app/biglearn/api/schemas/projections/next_questions.py#L37-L44)
field)
needs to be added to the
[next_questions.py](https://github.com/openstax/biglearn-platform/blob/master/app/biglearn/api/schemas/projections/next_questions.py)
schema.

This new field should be called
`excluded_pool_ids`
or something similar.
