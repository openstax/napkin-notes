### Endpoint

`/create_course`

### Request
```ruby
{
  '$schema': 'http://json-schema.org/draft-04/schema#',

  'type': 'object',
  'properties': {
    'course_uuid': {'$ref': '#standard_definitions/uuid'},
    'ecosystem_uuid': {'$ref': '#standard_definitions/uuid'},
  },
  'required': ['course_uuid', 'ecosystem_uuid'],
  'additionalProperties': false,
}
```

### Response
```ruby
{
  '$schema': 'http://json-schema.org/draft-04/schema#',

  'type': 'object',
  'properties': {
    'created_course_uuid': {'$ref': '#standard_definitions/uuid'},
  },
  'required': ['created_course_uuid'],
  'additionalProperties': false,
}
```
