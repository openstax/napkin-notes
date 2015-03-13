Just some brainstorming.

/api/my_courses
[
  {
    name: 'Physics',
    roles: [  # on the list, have to show two links
      {
        type: 'teacher'
        url: '/api/teacher/42/dashboard'
      },
      {
        type: 'student',
        url: '/api/student/87/dashboard'
      }
    ]
  },
  {
    name: 'Biology',
    roles: [ # on the list, can just click 'Biology' b/c only one role
      {
        type: 'student',
        url: '/api/student/43/dashboard'
      }
    ]
  }

]