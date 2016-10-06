### Endpoint

`fetch_course_ecosystem_statuses`

### Request
```ruby
{
  '$schema': 'http://json-schema.org/draft-04/schema#',

  'type': 'object',
  'properties': {
    'request_uuid': {'$ref': '#standard_definitions/uuid'},
    'course_uuids': {
      'type': 'array',
      'items': {'$ref': '#standard_definitions/uuid'},
      'minItems': 0,
      'maxItems': 1000,
    },
  },
  'required': ['request_uuid', 'course_uuids'],
  'additionalProperties': false,
}
```

### Response
```ruby
{
  '$schema': 'http://json-schema.org/draft-04/schema#',

  'type': 'object',
  'properties': {
    'course_statuses': {
      'type': 'array',
      'items': {'$ref': '#definitions/course_status'},
      'minItems': 0,
      'maxItems': 1000,
    },
  },
  'required': ['course_statuses'],
  'additionalProperties': false,
  
  'definitions': {
    'course_status': {
      'type': 'object',
      'properties': {
        'course_uuid':                        {'$ref': '#standard_definitions/uuid'},
        'course_is_known':                    {'type': 'boolean'},
        'current_ecosystem_preparation_uuid': {'$ref': '#standard_definitions/uuid'},
        'current_ecosystem_status':           {'$ref': '#definitions/ecosystem_status'},
        'next_ecosystem_status':              {'$ref': '#definitions/ecosystem_status'},
      },
      'required': ['course_uuid', 'course_is_known'],
      'additionalProperties': false,
    },    
    'ecosystem_status': {
      'type': 'object',
      'properties': {
        'ecosystem_uuid':         {'$ref': '#standard_definitions/uuid'},
        'ecosystem_is_known':     {'type': 'boolean'},
        'ecosystem_is_prepared':  {'type': 'boolean'},
        'precompute_is_complete': {'type': 'boolean'},
      },
      'required': ['ecosystem_uuid', 'ecosystem_is_known', 'ecosystem_is_prepared'],
      'additionalProperties': false,
    },
  },
}
```
