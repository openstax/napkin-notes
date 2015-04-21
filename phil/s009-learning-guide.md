# Learning Guide JSON

`GET /api/courses/1/guide`

```coffee
title: 'Physics'
page_ids: [ 234, 345, 456 ]
children: [
  { id:123, title: 'Kinematics', chapter_section: '5'
    questions_answered_count: 50
    current_level: 0.5
    page_ids: [ 234, 345, 456 ]
    children: [
      { id:1231, title: 'Kinematics in 1 dimension', chapter_section: '5.1'
        questions_answered_count: 30
        current_level: 0.1
        page_ids: [ 234, 345 ] # The name of this field should correspond to what /practice route expects
      }
      { id:1232, title: 'Kinematics in 2 dimensions', chapter_section: '5.2'
        questions_answered_count: 20
        current_level: 0.7
        page_ids: [ 456 ]
      }
    ]
  }
  ...
]
```
