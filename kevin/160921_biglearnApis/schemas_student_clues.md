### Endpoint

`fetch_student_clues`

### Request
```ruby
{
  '$schema': 'http://json-schema.org/draft-04/schema#',

  'type': 'object',
  'properties': {
    `student_clue_requests': {
      'type': 'array',
      'items': {'$ref': '#definitions/student_clue_request'},
      'minItems': 0,
      'maxItems': 1000,
    },
  },
  'required': ['student_clue_requests'],
  'additionalProperties': false,

  'definitions': {
    'student_clue_request': {
      'type': 'object',
      'properties': {
        'student_uuid':        {'$ref': '#standard_definitions/uuid'},  ## Course-specific Student uuid
        'book_container_uuid': {'$ref': '#standard_definitions/uuid'},  ## Ecosystem-specific uuid (not CNX uuid)
      },
      'required': ['student_uuid', 'book_container_uuid'],
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
    'student_clue_responses': {
      'type': 'array',
      'items': {'$ref': '#definitions/student_clue_response'},
      'minItems': 0,
      'maxItems': 1000,
    },
  },
  'required': ['student_clue_responses'],
  'additionalProperties': false,

  'definitions': {
    'student_clue_response': {
      'type': 'object',
      'properties': {
        'student_uuid':        {'$ref': '#standard_definitions/uuid'},
        'book_container_uuid': {'$ref': '#standard_definitions/uuid'},
        'clue_status': {
          'type': 'string',
          'enum': ['student_unknown', 'book_container_unknown', 'clue_unready', 'clue_ready'],
        },
      },
      'required': ['student_uuid', 'book_container_uuid', 'clue_status'],
      'additionalProperties': false,
    },
  },
}  
```
