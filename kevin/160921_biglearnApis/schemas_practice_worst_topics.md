### Endpoint

`fetch_practice_worst_areas_exercises`

### Request
```ruby
{
  '$schema': 'http://json-schema.org/draft-04/schema#',

  'type': 'object',
  'properties': {
    `worst_areas_requests': {
      'type': 'array',
      'items': {'$ref': '#definitions/worst_areas_request'},
      'minItems': 0,
      'maxItems': 1000,
    },
  },
  'required': ['worst_areas_requests'],
  'additionalProperties': false,

  'definitions': {
    'worst_areas_request': {
      'type': 'object',
      'properties': {
        'student_uuid': {'$ref': '#standard_definitions/uuid'},
        'max_num_exercises': {
          'type': 'integer',
          'minimum': 0,
          'maximum': 100,
        },
      },
      'required': ['student_uuid', 'max_num_exercises'],
      'additionalProperties': false,
    },
  },
}  
```

### Response
```ruby
{
  '$schema': 'http://json-schema.org/draft-04/schema#',

  'type': 'object',
  'properties': {
    'worst_areas_responses': {
      'type': 'array',
      'items': {'$ref': '#definitions/worst_areas_response'},
      'minItems': 0,
      'maxItems': 1000,
    },
  },
  'required': ['worst_areas_responses'],
  'additionalProperties': false,

  'definitions': {
    'worst_areas_response': {
      'type': 'object',
      'properties': {
        'student_uuid': {'$ref': '#standard_definitions/uuid'},
        'exercise_uuids': {
          'type': 'array',
          'items': {'$ref': '#standard_definitions/uuid'},
          'minItems': 0,
          'maxItems': 100,
        },
        'practice_status': {
          'type': 'string',
          'enum': ['student_unknown', 'student_unready', 'student_ready'],
        },
      },
      'required': ['student_uuid', 'exercise_uuids', 'student_status'],
      'additionalProperties': false,
    },
  },
}  
```
