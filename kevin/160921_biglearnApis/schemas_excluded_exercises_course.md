### Endpoint

`update_course_excluded_exercises`

### Request
```ruby
{
  '$schema': 'http://json-schema.org/draft-04/schema#',

  'type': 'object',
  'properties': {
    'request_uuid':    {'$ref': '#/standard_definitions/uuid'},
    'course_uuid':     {'$ref': '#/standard_definitions/uuid'},
    'sequence_number': {'$ref': '#/standard_definitions/non_negative_integer'},
    `exclusions': {
      'type': 'array',
      'items': {'$ref': '#/definitions/exclusion'},
      'minItems': 0,
      'maxItems': 10000,
    },
  },
  'required': ['request_uuid', 'course_uuid', 'sequence_number', 'exclusions'],
  'additionalProperties': false,
  },
  
  'definitions': {
    'exclusion': {
      'oneOf': [
        {'$ref': '#/definitions/specific_version_exclusion'},
        {'$ref': '#/definitions/any_version_exclusion'},
      ],
    'specific_version_exclusion': {
      'type': 'object',
      'properties': {
        'exercise_uuid': {'$ref': '#/standard_definitions/uuid'},
      },
      'required': ['exercise_uuid'],
      'additionalProperties': false,
    },
    'any_version_exclusion': {
      'type': 'object',
      'properties': {
        'exercise_group_uuid': {'$ref': '#/standard_definitions/uuid'},
      },
      'required': ['exercise_grouo_uuid'],
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
    'status': {
      'emum': ['success'],
    },
  },
  'required': ['status'],
  'additionalProperties': false,
}
```
