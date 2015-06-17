# Teacher

- Calendar
  - ellipses
  - Popup has periods
- summary review (past HW/iReading)
- Timecop header (unused)
- HW Builder
  - Periods (add diff due dates)
  - Styling: 'Total Problems'
  - Styling: Exercise images
  - Required fields were added but fell out last-min https://github.com/openstax/tutor-js/pull/398
- Calendar spans multiple days when period due dates are diff
- Past dates on date picker
- Performance Report sorts
- Reference book (Teacher Edition toggle)


# Student

- Stepping through HW now has "Loading..." in Continue button
- Many steps adjusts the margin
- Refresh my memory only shows up if available, not always with "Try Another"
- Reference book (No teacher edition)

- Squashed Invariant errors


Bugs:

- Performance report has "Uncaught TypeError: Cannot read property 'isNameSort' of null" bug
- Probably due to /courses and /courses/1 returning diff JSON
  - Title links to /root ???
  - Home page shows "Student" role when teacher
- Open Date could be today?
- Even when open date is tomorrow the Task is doable
- Spaced Practice between periods is ordered the same?

- Cannot select "All Periods"
- Cannot Save Draft
