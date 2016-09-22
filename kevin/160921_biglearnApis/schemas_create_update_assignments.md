### Endpoint

`/create_update_assignments`

### Request
```ruby
{
  '$schema': 'http://json-schema.org/draft-04/schema#',

  'type': 'object',
  'properties': {
    'assignments': {
      'type': 'array',
      'items': {'$ref': '#definitions/assignment'},
      'minItems': 0,
      'maxItems': 1000,
    },
  },
  'required': ['assignments'],
  'additionalProperties': false,

  'definitions': {
    'assignment': {
      'type': 'object',
      'properties': {
        'assignment_uuid': {'$ref': '#standard_definitions/uuid'},
        'sequence_number': {'$ref': '#standard_definitions/non_negative_integer'},
        'ecosystem_uuid':  {'$ref': '#standard_definitions/uuid'},
        'student_uuid':    {'$ref': '#standard_definitions/uuid'},
        'assignment_type': {
          'type': 'string',
          'minLength': 1,
          'maxLength': 100,
        },
        'opens_at': {'$ref': '#standard_definitions/datetime'}, ## NOTE: optional
        'due_at':   {'$ref': '#standard_definitions/datetime'}, ## NOTE: optional
        'assigned_book_container_uuids': {
          'type': 'array',
          'items': {'$ref': '#standard_definitions/uuid'},
          'minItems': 0,
          'maxItems': 500,
        },
        'assigned_exercises': {
          'type': 'object',
          'properties': {
            'core': {
              'type': 'array',
              'items': {'$ref': '#definitions/trial'},
              'minItems': 0,
              'maxItems': 1000,
            },
            'spaced_practice': {
              'type': 'object',
              'properties': {
                'goal_num_tutor_assigned': {'$ref': '#standard_definitions/non_negative_integer'},
                'tutor_assignment_completed': {
                  'type': 'boolean',
                },
                'exercise': {
                  'type': 'array',
                  'items': {'$ref': '#definitions/trial'},
                  'minItems': 0,
                  'maxItems': 1000,
                },
              },
              'required': [
                'goal_num_tutor_assigned',
                'tutor_assignment_completed',
                'exercise_uuids',
              ],
              'additionalProperties': false,
            },
            'personalized': {
              'type': 'object',
              'properties': {
                'goal_num_tutor_assigned': {'$ref': '#standard_definitions/non_negative_integer'},
                'tutor_assignment_completed': {
                  'type': 'boolean',
                },
                'exercises': {
                  'type': 'array',
                  'items': {'$ref': '#standard_definitions/trial'},
                  'minItems': 0,
                  'maxItems': 1000,
                },
              },
              'required': [
                'goal_num_tutor_assigned',
                'tutor_assignment_completed',
                'exercise_uuids',
              ],
              'additionalProperties': false,
            },
          },
        'required': ['core', 'spaced_practice', 'personalized'],
        'additionalProperties': false,
        },
      },
      'required': [
        'assignment_uuid',
        'sequence_number',
        'student_uuid',
        'ecosystem_uuid',
        'assignment_type',
        'assigned_book_container_uuids',
        'assigned_exercises',
      ],
      'additionalProperties': false,
    },
  },
  
  'definitions': {
    'trial': {
      'type': 'object',
      'properties': {
        'trial_uuid':    {'$ref': '#standard_definitions/uuid'},
        'exercise_uuid': {'$ref': '#standard_definitions/uuid'},
      },
      'required': ['trial_uuid', 'exercise_uuid'],
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
    'updated_assignments': {
      'type': 'array',
      'items': {
        'type': 'object',
        'properties': {
          'assignment_uuid': {'$ref': '#standard_definitions/uuid'},
          'sequence_number': {'$ref': '#standard_definitions/non_negative_integer'},
        },
        'required': ['assignment_uuid', 'sequence_number'],
        'additionalProperties': false,
      },
    },
  },
  'required': ['updated_assignments'],
  'additionalProperties': false,
}
```
