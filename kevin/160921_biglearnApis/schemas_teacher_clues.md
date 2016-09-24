## Endpoint

`fetch_teacher_clues`

### Request
```ruby
{
  '$schema': 'http://json-schema.org/draft-04/schema#',

  'type': 'object',
  'properties': {
    `teacher_clue_requests': {
      'type': 'array',
      'items': {'$ref': '#definitions/teacher_clue_request'},
      'minItems': 0,
      'maxItems': 1000,
    },
  },
  'required': ['teacher_clue_requests'],
  'additionalProperties': false,

  'definitions': {
    'teacher_clue_request': {
      'type': 'object',
      'properties': {
        'course_container_uuid': {'$ref': '#standard_definitions/uuid'},  ## Course-specific period, etc., container uuid
        'book_container_uuid':   {'$ref': '#standard_definitions/uuid'},  ## Ecosystem-specific uuid (not CNX uuid)
      },
      'required': ['course_container_uuid', 'book_container_uuid'],
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
    'teacher_clue_responses': {
      'type': 'array',
      'items': {'$ref': '#definitions/teacher_clue_response'},
      'minItems': 0,
      'maxItems': 1000,
    },
  },
  'required': ['teacher_clue_responses'],
  'additionalProperties': false,

  'definitions': {
    'teacher_clue_response': {
      'type': 'object',
      'properties': {
        'course_container_uuid': {'$ref': '#standard_definitions/uuid'},
        'book_container_uuid':   {'$ref': '#standard_definitions/uuid'},
        'clue_status': {
          'type': 'string',
          'enum': ['course_container_unknown', 'book_container_unknown', 'clue_unready', 'clue_ready'],
        },
      },
      'required': ['course_container_uuid', 'book_container_uuid', 'clue_status'],
      'additionalProperties': false,
    },
  },
}  
```
