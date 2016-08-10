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
          'minItems: 1,
        },
      },
      'required': ['exercise_uuid', 'exercise_version', 'exercise_los'],
      'additionalProperties': false,
    },
    
    'lo_def': {
      'type': 'string',
      'minLength': 1,
      'maxLength': 1000,
    },
  },
}
```
