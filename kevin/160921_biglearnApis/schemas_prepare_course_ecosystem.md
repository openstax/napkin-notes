### Endpoint

`prepare_course_ecosystem`

### Request
```ruby
{
  '$schema': 'http://json-schema.org/draft-04/schema#',

  'type': 'object',
  'properties': {
    `course_uuid': {'$ref': '#standard_definitions/uuid'},
    'ecosystem_map': {
      'type': 'object',
      'properties': {
        'from_ecosystem_uuid': {'$ref': '#standard_definitions/uuid'},
        'to_ecosystem_uuid':   {'$ref': '#standard_definitions/uuid'},
        'cnx_pagemodule_mappings': {
          'type': 'array',
          'items': {'$ref': '#definitions/cnx_pagemodule_mapping'},
          'minItems': 0,
          'maxItems': 500,
        },
        'exercise_mappings': {
          'type': 'array',
          'items': {'$ref': '#definitions/exercise_mapping'},
          'minItems': 0,
          'maxItems': 10000,        
        },
      },
      'required': ['from_ecosystem_uuid', 'to_ecosystem_uuid', 'cnx_pagemodule_mappings', 'exercise_mappings'],
      'additionalProperties': false,
    },
  },
  'required': ['course_uuid', 'ecosystem_map'],
  'additionalProperties': false,

  'definitions': {
    'cnx_pagemodule_mapping': {
      'type': 'object',
      'properties': {
        'from_cnx_pagemodule_identity': {'$ref': '#standard_definitions/cnx_identity'},
        'to_cnx_pagemodule_identity':   {'$ref': '#standard_definitions/cnx_identity'},
      },
      'required': ['from_cnx_pagemodule_identity', 'to_cnx_pagemodule_identity'],
      'additionalProperties': false,
    },
    'exercise_mapping': {
      'type': 'object',
      'properties': {
        'from_exercise_uuid':         {'$ref': '#standard_definitions/uuid'},
        'to_cnx_pagemodule_identity': {'$ref': '#standard_definitions/cnx_identity'},
      },
      'required': ['from_exericise_uuid', 'to_cnx_pagemodule_identity'],
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
    'prepare_status': {
      'type': 'string',
      'enum': [
        'course_unknown',
        'from_ecosystem_mismatch',
        'to_ecosystem_unknown',
        'pagemodule_mapping_error',
        'exercise_mapping_error',
        'accepted',
      ],
    },
  },
  'required': ['prepare_status'],
  'additionalProperties': false,
}
```
