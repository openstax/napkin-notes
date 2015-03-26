# Learning Guide JSON

`GET /api/courses/1/stats`

```coffee
title: 'Physics'
fields: [
  { id:123, title: 'Kinematics', number: '5'
    questions_answered_count: 48
    current_level: 0.5
    page_ids: [ 234, 345 ] # Maybe this would be pages instead (and contain all the info)?
    practice_count: 12
  }
  ...
]
```

`GET /api/courses/1/stats/topics/123`

```coffee
id: 123
title: 'Kinematics'
number: '5'
fields: [
  { id:234, title: 'Kinematics in one dimension', number: '5.1'
    questions_answered_count: 20
    current_level: 0.9
    practice_count: 4
  }
]
```
