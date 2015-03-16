# Sprint 8 Practice Widget Approach & API (DRAFT)

## Background

Early ideas surrounding the practice widget suggested that it'd be a totally dynamic loop of
exercises, with no end per se -- the student would just stop practicing at some point.  The 
practice widget was a very ephemeral thing.

Those ideas have given way to the idea that the practice widget is a set of 5 practice
problems.  Once a student finishes a set of 5, they earn a star (not in alpha), and then
are given the chance to start on a new set of 5 practice problems.  

The UX approach is that the practice widget is still an ephemeral thing, but there at least several
reasons that why the backend would prefer it to not be so ephemeral: 

1. It'd be nice to remember which problems the students practiced so we don't give them again (unless we run out of other
problems)
2. For counting completed practice widgets for stars (of course this could be done by keeping a cached count of completed widgets).  
3. Storing the practice widget results for later review by teachers (for bonus credit or something) 
4. For letting students come back to a practice widget in progress.
5. For only asking BigLearn once for a list of 5 practice problems instead of asking it for a single exercise
   5 different times.

If we think about making them non-ephemeral, it becomes easier to think about reusing our existing 
`Task` / `TaskStep` machinery.  

## Proposal

Every student has one active practice widget per course.  They may have any number of prior,
inaccessible practice widgets in a course.  Practice widgets are just plain old `Task` objects
with 5 exercise steps, so we should be able to reuse the code from iReadings / homeworks.

When a student wants to start practicing they select some tags/chapters/pages/whatever and hit
a practice button.  This triggers a `POST` to the server, e.g.:

`POST /api/courses/123/practice(/:role_id)` with JSON payload specifying tags / pages.

This causes a number of things to happen in the backend:

1. The current active practice widget is closed, and any unworked problems are deleted (so 
they can be used later for the "first time").
2. A new practice widget `Task` is created, and BigLearn is called to get 5 exercises for it.
3. The new practice widget `Task` is returned to the client, just like what happens when `/api/tasks/123` is called.

This latest / active practice widget `Task` can be left and returned to via

`GET /api/courses/123/practice(/:role_id)`

Like any other `Task`, it contains a list of `TaskStep`s, all of which are exercises.  The steps can be
retrieved and updated with URLs just like existing `TaskStep`s:

```
GET   /api/courses/123/practice/steps/33
PATCH /api/courses/123/practice/steps/33
PUT   /api/courses/123/practice/steps/33
```

If it makes it easier to reuse existing exercise step react components, these practice widget task 
step URLs and normal `Task` task step URLs can be simplified to:

```
GET   /api/steps/33
PATCH /api/steps/33
PUT   /api/steps/33
```

This is because the `33` ID is globally unique and tells us everything we need to know to access
the step.

The optional `:role_id` field is on the main `POST` and `GET` because a user may have more than
one student role within a course.

## References

1. [Mockup](http://mockups.openstax.org/Tutor_MVP_v2/start.html#p=question_1a)
2. [Role-aware endpoints discussion](https://github.com/openstax/napkin-notes/blob/master/jp/api_endpoints_20150314.md#about-role-aware-api-endpoints)