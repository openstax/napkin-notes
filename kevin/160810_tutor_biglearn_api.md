### `/create_ecosystem`

```ruby
{
  '$schema': 'http://json-schema.org/draft-04/schema#',
    
  'type': 'object',
  'properties': {
    'ecosystem_uuid': {'$ref': '#standard_definitions/uuid'},
    'toc': {
      'type': 'object',
      'properties': {
        'chapters': {
          'type': 'array',
          'items': {'$ref': '#definitions/chapter_def'},
          'minItems': 1,
          'maxItems': 500,
        },
      },
      'required': ['chapters'],
      'additionalProperties': false,
    },
  },

  'definitions': {
    'chapter_def': {
      'type': 'object',
      'properties': {
        'pagemodules': {
          'type': 'array',
          'items': {'$ref': '#definitions/pagemodule_def'},
          'minItems': 1,
          'maxItems': 100,
        },
      },
      'required': ['pagemodules'],
      'additionalProperties': false,
    },
    
    'pagemodule_def': {
      'type': 'object',
      'properties': {
        'exercise_pools': {
          'type': 'array',
          'items': {'$ref': '#definitions/exercise_pool_def'},
          'minItems': 0,
          'maxItems': 10,
        },
      },
      'required': ['exercise_pools'],
      'additionalProperties': false,
    },
    
    'exercise_pool_def': {
      'type': 'object',
      'properties': {
        'exercises': {
          'type': 'array',
          'items': {'$ref': '#definitions/exercise_def'},
          'minItems': 0,
          'maxItems': 1000,
        },
      },
      'required': ['exercises'],
      'additionalProperties': false,
    },
    
    'exercise_def': {
      'type': 'object',
      'properties': {
        'exercise_uuid': {'$ref': '#standard_definitions/uuid'},
        'exercise_version': {'$ref': '#standard_definitions/non_negative_integer'},
        'exercise_los': {
          'type': 'array',
          'items': {'$ref': '#definitions/lo_def'},
          'minItems': 1,
          'maxItems': 100,
        },
      },
      'required': ['exercise_uuid', 'exercise_version', 'exercise_los'],
      'additionalProperties': false,
    },
    
    'lo_def': {
      'type': 'string',
      'minLength': 1,
      'maxLength': 100,
    },
  },
}
```

### `/assign_course_ecosystem`
```ruby
{
  '$schema': 'http://json-schema.org/draft-04/schema#',
    
  'type': 'object',
  'properties': {
    'ecosystem_assignments': {
      'type': 'array',
      'items': {'#ref': '#definitions/ecosystem_assignment_def'},
      'minItems': 0,
      'maxItems': 10000,
    },
  },
  'required': ['ecosystem_assignments'],
  'additionalProperties': false,
  
  'definitions': {
    'ecosystem_assignment_def': {
      'type': 'object',
      'properties': {
        'course_uuid': {'$ref': '#standard_definitions/uuid'},
        'ecosystem_uuid': {'$ref': '#standard_definitions/uuid'},
        'ordered_at': {'$ref': '#standard_definitions/datetime'},
      },
      'required': ['course_uuid', 'ecosystem_uuid'],
      'additionalProperties': false,
    },
  },
}
```

### `/roster_update`
```ruby
{
  '$schema': 'http://json-schema.org/draft-04/schema#',
    
  'type': 'object',
  'properties': {
    'roster_updates': {
      'type': 'array',
      'items': {'#ref': '#definitions/roster_update_def'},
      'minItems': 0,
      'maxItems': 10000,
    },
  },
  'required': ['roster_updates'],
  'additionalProperties': false,

  'definitions': {
    'roster_update_def': {
      'type': 'object',
      'properties': {
        'course_uuid':  {'$ref': '#standard_definitions/uuid'},
        'period_uuid':  {'$ref': '#standard_definitions/uuid'},
        'student_uuid': {'$ref': '#standard_definitions/uuid'},
        'action': {
          'type': 'string',
          'enum': ['add', 'remove'],
        },
        'ordered_at': {'$ref': '#standard_definitions/datetime'},
      },
      'required': ['course_uuid', 'period_uuid', 'student_uuid', 'action', 'ordered_at'],
      'additionalProperties': false,
    },
  },
}
```
