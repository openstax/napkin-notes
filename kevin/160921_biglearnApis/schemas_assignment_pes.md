### Endpoint

`fetch_assignment_pes`

### Request
```ruby
{
  '$schema': 'http://json-schema.org/draft-04/schema#',

  'type': 'object',
  'properties': {
    `pe_requests': {
      'type': 'array',
      'items': {'$ref': '#definitions/pe_request'},
      'minItems': 0,
      'maxItems': 1000,
    },
  },
  'required': ['pe_requests'],
  'additionalProperties': false,

  'definitions': {
    'pe_request': {
      'type': 'object',
      'properties': {
        'assignment_uuid': {'$ref': '#standard_definitions/uuid'},
        'max_num_exercises': {
          'type': 'integer',
          'minimum': 0,
          'maximum': 100,
        },
      },
      'required': ['assignment_uuid', 'max_num_exercises'],
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
    'pe_responses': {
      'type': 'array',
      'items': {'$ref': '#definitions/pe_response'},
      'minItems': 0,
      'maxItems': 1000,
    },
  },
  'required': ['pe_responses'],
  'additionalProperties': false,

  'definitions': {
    'pe_response': {
      'type': 'object',
      'properties': {
        'assignment_uuid': {'$ref': '#standard_definitions/uuid'},
        'exercise_uuids': {
          'type': 'array',
          'items': {'$ref': '#standard_definitions/uuid'},
          'minItems': 0,
          'maxItems': 100,
        },
        'assignment_status': {
          'type': 'string',
          'enum': ['assignment_unknown', 'assignment_unready', 'assignment_ready'],
        },
      },
      'required': ['assignment_uuid', 'exercise_uuids', 'assignment_status'],
      'additionalProperties': false,
    },
  },
}  
```
