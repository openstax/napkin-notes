# Tutor CLUe caching plan

- Tutor CLUe caching will be done like this (for both student and period CLUe's):

  - Every day, at midnight or 2 AM, query Biglearn for ALL CLUe's for both students and periods.

  - Every minute, query Biglearn for all student and period CLUe's where the student
    (or some student in the period) answered a question in that topic in the last 4 minutes.
    (reason for 4 minutes: "fast" sparfa runs every 3 minutes and could update those CLUe's)
