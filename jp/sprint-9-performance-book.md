# Performance Book APIs

There are two "performance books" on Tutor, one for students and one for teachers.  The student's
performance book looks just like the teacher one except it only has one row (for the student) and
has a few fewer clickable links.

Implement with the student role in mind first, then the teacher role next.

The performance book endpoint should be role-aware:

`GET /api/courses/:course_id/performance(/role/:role_id)`

When no role is specified, the user's default role for the course is used.

For alpha:
* We won't have clickable links
* We won't break down students by period.

## Proposed JSON

The proposed JSON uses a row-major approach to encode the table of data.

```coffee
  data_headings: [         # Number of data headings matches number of 'data' items in STUDENT_DATA
    {
      title: 'Reading 1'
      # later will include ID / link information here for course-wide teacher review page
    }
    {
      title: 'HW 1'
      class_average: 81.2  # Not included for student roles, used to create sub-heading row
    }
    {
      title: 'Reading 2'
    }
    {
      title: 'HW 2'
      class_average: 76.5
    }
  ]
  students: [
    STUDENT_DATA           # For student requestors, only their one STUDENT_DATA is included
    STUDENT_DATA
    ...
    STUDENT_DATA
  ]
```

With `STUDENT_DATA` defined as:

```coffee
  STUDENT_DATA =
    name: 'Johnny Tran'
    role: 3482
    data: [
      {
        type: 'reading'     # used to interpret this bit of data
        id: 456             # used later with 'type' to construct link to review page
        status: 'complete'  # one of ['not_started', 'in_progress', 'complete']
      }
      {
        type: 'homework'
        id: 890
        status: 'in_progress'
        exercise_count: 8
        correct_exercise_count: 4
        recovered_exercise_count: 6
      }
      {
        type: 'video'
        id: 1290
        status: 'complete'
      }
    ]
```
