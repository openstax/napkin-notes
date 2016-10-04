### Endpoint

`/update_course_ecosystems`

### Request
```ruby
{
  '$schema': 'http://json-schema.org/draft-04/schema#',

  'type': 'object',
  'properties': {
    `update_requests': {
      'type': 'array',
      'items': {'$ref': '#definitions/update_request'},
      'minItems': 0,
      'maxItems': 1000,
    },
  },
  'required': ['update_requests'],
  'additionalProperties': false,
  
  'definitions': {
    'update_request': {
      'type': 'object',
      'properties': {
        'request_uuid':      {'$ref': '#standard_definitions/uuid'},
        'preparation_uuid':  {'$ref': '#standard_definitions/uuid'},
      },
      'required': ['request_uuid', 'preparation_uuid'],
      'additionalProperties': false,
    },
  },
```

### Response
```ruby
{
  '$schema': 'http://json-schema.org/draft-04/schema#',

  'type': 'object',
  'properties': {
    `update_responses': {
      'type': 'array',
      'items': {'$ref': '#definitions/update_response'},
      'minItems': 0,
      'maxItems': 1000,
    },
  },
  'required': ['update_responses'],
  'additionProperties': false,

  'definitions': {
    'update_response': {
      'type': 'object',
      'properties': {
        'request_uuid': {'$ref': '#standard_definitions/uuid'},
        'update_status': {
          'type': 'string',
          'enum': [
            'preparation_unknown',
            'preparation_obsolete',
            'updated_but_unready',
            'updated_and_ready',
          ],
        },
      },
      'required': ['request_uuid', 'update_status'],
      'additionalProperties': false,
    },
  },
}
```
