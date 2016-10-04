### Endpoint

`fetch_assignment_spes`

### Request
```ruby
{
  '$schema': 'http://json-schema.org/draft-04/schema#',

  'type': 'object',
  'properties': {
    `spe_requests': {
      'type': 'array',
      'items': {'$ref': '#definitions/spe_request'},
      'minItems': 0,
      'maxItems': 1000,
    },
  },
  'required': ['spe_requests'],
  'additionalProperties': false,

  'definitions': {
    'spe_request': {
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
    'spe_responses': {
      'type': 'array',
      'items': {'$ref': '#definitions/spe_response'},
      'minItems': 0,
      'maxItems': 1000,
    },
  },
  'required': ['spe_responses'],
  'additionalProperties': false,

  'definitions': {
    'spe_response': {
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
