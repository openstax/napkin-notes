# Tasks

### Add role-aware controller endpoints for the learning guide statistics

```
GET /api/courses/:course_id/stats(/role/:role_id)
... possibly some finer grained endpoints too ...
```

These endpoints need to return statistcs for the specified (or default) role
for the specified course.

These rough steps need to happen (maybe not every time or exactly as described if data is cached):

1. Get the Book for the specified Course
2. Get the table of contents for the Book, with each level of the TOC having
   the list of learning objects contained in that level. (e.g. if a chapter has
   4 pages and each page has 3 learning objectives, the chapter will have 12
   learning objectives)
3. For each level of the book and each student:
  1. call off to BigLearn's CLUE endpoint, passing the
     student's exchange identifier and the list of tags for that level of the book.
     Record the returned CLUE for the level/student pairing.
  2. compute and store the number of
     practice widgets completed for that level (the number of Tasks with type 'practice' that have
     5 completed problems and that have tags that match the tags for this level -- this tag data is currently not available on the practice widget tasks as there was previously no need to remember it, so for sprint 9 we can just fake the number of completed practice widgets)
  3. compute and store the number of completed exercises for the level (this count can maybe be updated
     every time a student completes a question?)
4. Return the data as JSON

### Write representers for the course stat data

The representers should help with the above.

### Handling role-aware endpoints

Nathan is working on implementing the following -- you should use it when he's done.

https://github.com/openstax/napkin-notes/blob/master/jp/verify_of_get_default_course_role.md
