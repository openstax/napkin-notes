### `/fetch_learner_clues`
```ruby
{
  '$schema': 'http://json-schema.org/draft-04/schema#',

  'type': 'object',
  'properties': {
    'learner_clue_requests': {
      'type': 'array',
      'items': { '$ref': '#definitions/clue_request'},
      'minItems': 0,
      'maxItems': 1000,
    },
  },
  'required': ['learner_clues'],
  'additionalProperties': false,

  'definitions': {
    'clue_request': {
      'type': 'object',
      'properties': {
        'book_container_uuid': {'$ref': '#standard_definitions/uuid'},  ## Ecosystem-specific uuid (not CNX uuid)
        'student_uuid':        {'$ref': '#standard_definitions/uuid'},  ## Course-specific Student uuid
      },
      'required': ['book_container_uuid', 'student_uuid'],
      'additionalProperties': false,
    },
  },
}
```

### `/fetch_teacher_clues`
```ruby
{
  '$schema': 'http://json-schema.org/draft-04/schema#',

  'type': 'object',
  'properties': {
    'teacher_clue_requests': {
      'type': 'array',
      'items': { '$ref': '#definitions/clue_request'},
      'minItems': 0,
      'maxItems': 1000,
    },
  },
  'required': ['learner_clues'],
  'additionalProperties': false,

  'definitions': {
    'clue_request': {
      'type': 'object',
      'properties': {
        'book_container_uuid':   {'$ref': '#standard_definitions/uuid'},  ## Ecosystem-specific uuid (not CNX uuid)
        'course_container_uuid': {'$ref': '#standard_definitions/uuid'},  ## Course-specific Period, Section, Class, etc., 
      },
      'required': ['book_container_uuid', 'course_container_uuid'],
      'additionalProperties': false,
    },
  },
}
```

### `/fetch_weakest_topics_pes`
```ruby
{
  '$schema': 'http://json-schema.org/draft-04/schema#',

  'type': 'object',
  'properties': {
    'personalized_exerises_requests': {
      'type': 'array',
      'items': {'$ref': '#definitions/personalized_exerises_request'},
      'minItems': 0,
      'maxItems': 1000,
    },
  },

  'definitions': {
    'practice_weakest_topics': {
      'type': 'object',
      'properties': {
        'ecosystem_uuid': {'$ref': '#standard_definitions/uuid'},
        'student_uuid':   {'$ref': '#standard_definitions/uuid'},
        'max_exercises_to_return': {
          'type': 'integer',
          'minimum': 0,
          'maximum': 100,
        },
      },
      'required': [
        'ecosystem_uuid',
        'student_uuid',
        'max_exercises_to_return',
      ],
      'additionalProperties': false,
    },
  },
}
```

### `/fetch_topic_pes`
```ruby
{
  '$schema': 'http://json-schema.org/draft-04/schema#',

  'type': 'object',
  'properties': {
    'practice_requests': {
      'type': 'array',
      'items': {'$ref': '#definitions/practice_request'}
      'minItems': 0,
      'maxItems': 1000,
    },
  },

  'definitions': {
    'practice_request': {
      'type': 'object',
      'properties': {
        'student_uuid':        {'$ref': '#standard_definitions/uuid'},
        'book_container_uuid': {'$ref': '#standard_definitions/uuid'},
        'max_exercises_to_return': {
          'type': 'integer',
          'minimum': 0,
          'maximum': 100,
        },
      },
      'required': [
        'student_uuid',
        'book_container_uuid',
        'max_exercises_to_return',
      ],
      'additionalProperties': false,
    },
  },
}
```

### `/fetch_assignment_pes`
```ruby
{
  '$schema': 'http://json-schema.org/draft-04/schema#',

  'type': 'object',
  'properties': {
    'pe_requests': {
      'type': 'array',
      'items': {'$ref': '#definitions/pe_request'}
      'minItems': 0,
      'maxItems': 1000,
    },
  },

  'definitions': {
    'pe_request': {
      'type': 'object',
      'properties': {
        'assignment_uuid': {'$ref': '#standard_definitions/uuid'}, ## Student-specific Assignment uuid
        'max_exercises_to_return': {
          'type': 'integer',
          'minimum': 0,
          'maximum': 100,
        },
      },
      'required': [
        'assignment_uuid',
        'max_exercises_to_return',
      ],
      'additionalProperties': false,
    },
  },
}
```

### `/create_ecosystem`
```ruby
{
  '$schema': 'http://json-schema.org/draft-04/schema#',

  'type': 'object',
  'properties': {
    'ecosystem_uuid': {'$ref': '#standard_definitions/uuid'},
    'book': {
      'cnx_uuid': {'$ref': '#standard_definitions/uuid'},
      'cnx_version': {
        'type': 'string',
        'pattern': '^\d+\.\d+$',
      },
      'subject_partitions': {  ## revisit this to make sure it works as expected for econ, etc.
        'type': 'object',
        'properties': {
          'primary': {'$ref': '#definitions/subject_partition'},
          'secondary': {
            'type': 'array',
            'items': {'$ref': '#definitions/subject_partition'}
            'minItems': 0,
            'maxItems': 10,
          },
        },
        'required': ['primary', 'secondary'],
        'additionalProperties': false,
      },
      'contents': {
        'type': 'array',
        'items': {
          'type': 'object',
          'properties': {
            'container_uuid':        {'$ref':, '#standard_definitions/uuid'},
            'container_parent_uuid': {'$ref':, '#standard_definitions/uuid'},
            ## (optional) CNX uuids, versions (not available for Chapters, Units)
            'pools': {
              'type': 'array',
              'items': {'$ref': '#definitions/pool'},
              'minItems': 0,
              'maxItems': 20,
            },
          },
          'required': ['container_uuid', 'container_parent_uuid', 'pools'],
          'additionalProperties': false,
        },
        'minItems': 1,
        'maxItems': 500,
      },
    },
    'exercises': {
      'type': 'array',
      'items': {'$ref': '#definitions/exercise'},
      'minItems': 0,
      'maxItems': 10000,
    },
  },
  'required': ['ecosystem_uuid', 'book', 'exercises'],
  'additionalProperties': false,

  'definitions': {
    'subject_partition': {
      'type': 'string',
      'minLength': 3,
      'maxLength': 100,
    },
    'pool': {
      'type': 'object',
      'properties': {
        'category': {
          'type': 'string',
          'enum': ['CLUE', 'SPE', 'PE'],  ## SPEs come from past PEs
        },
        'monikers': { ## revisit this to make sure it works in all cases
          'type': 'array',
          'items': {
            'type': 'string',
            'minLength': 3,
            'maxLength': 100,
          },
          'minItems': 1,
          'maxItems': 20,
        },
        'exercise_uuids': {
          'type': 'array',
          'items': {'$ref': '#standard_definitions/uuid'},
          'minItems': 0,
          'maxItems': 500,
        },
      },
      'required': ['category', 'monikers', 'exercise_uuids'],
      'additionalProperties': false,
    },
    'exercise': {
      'type': 'object',
      'properties': {
        'uuid':              {'$ref': '#standard_definitions/uuid'},
        'exercises_uuid':    {'$ref': '#standard_definitions/uuid'},  ## could change this to execises_number
        'exercises_version': {'$ref': '#standard_definitions/non_negative_integer'},
        'los': {
          'type': 'array',
          'items': {'$ref': '#definitions/lo'},
          'minItems': 1,
          'maxItems': 100,
        },
      },
      'required': ['uuid', 'exercises_uuid', 'exercises_version', 'los'],
      'additionalProperties': false,
    },
    'lo': {
      'type': 'string',
      'minLength': 1,
      'maxLength': 100,
    },
  },
}
```

### `/decommision_courses`

### `/update_course_ecosystem`
just the course uuid

### `/prepare_course_ecosystems`
```ruby
{
  '$schema': 'http://json-schema.org/draft-04/schema#',
    
  'type': 'object',
  'properties': {
    'ecosystem_assignments': {
      'type': 'array',
      'items': {'#ref': '#definitions/ecosystem_assignment'},
      'minItems': 0,
      'maxItems': 1000,
    },
  },
  'required': ['ecosystem_assignments'],
  'additionalProperties': false,

  'standard_definitions': _standard_definitions,
      
  'definitions': {
    'updates': {
      'type': 'object',
      'properties': {
        'update_uuid':               {'$ref': '#standard_definitions/uuid'},
        'course_uuid':               {'$ref': '#standard_definitions/uuid'},
        'ecosystem_uuid':            {'$ref': '#standard_definitions/uuid'},
        'map':                       {'$ref': '#definitions/map'},
        'sequence':                  {'$ref': '#standard_definitions/non_negative_integer'},
      },
      'required': ['course_uuid', 'ecosystem_uuid', 'sequence'],
      'additionalProperties': false,
    },
    'map': {
      'properties': {
        ## from, to ecosystem uuids
        ## pages to pages
        ## exercises to pages
      },
    },
  },
}
```

### `/update_rosters`
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
        'course_container_uuid':  {'$ref': '#standard_definitions/uuid'},  ## where does the hierarchy get defined?
        'student_uuid':           {'$ref': '#standard_definitions/uuid'},
        'action': {
          'type': 'string',
          'enum': ['add', 'remove'],
        },
        'sequence': {'$ref': '#standard_definitions/non_negative_integer'},
      },
      'required': ['course_uuid', 'period_uuid', 'student_uuid', 'action', 'sequence'],
      'additionalProperties': false,
    },
  },
}
```

### `/create_or_update_assignment`
```ruby
  event_uuid
  student_uuid
  assignment_uuid
  ecosystem_uuid
  assignment_moniker  ## hw, reading, pw, etc.
  opens_at (optional)
  due_at   (optional)
  [book_container_uuids]
  [assigned_exercise_uuids]
  sequence
```

### `/archive_periods`

### `/record_student_responses`

### `/update_exercise_exclusions`

### `/update_assignments`

