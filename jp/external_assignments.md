# External Assignments

External assignments are assignments that outside of the normal Tutor collection flow.  Eventually external assignments can hold uploaded files like PDFs or point off to some URL.  For a first pass, we won't worry about uploaded files, just URLs.

[Here's the mockup](http://mockups.openstax.org/Tutor_MVP_beta_release/start.html#p=add_external_assignment).

Most of the stuff in the mockup is generic task plan stuff (all of the stuff above the URL), and not something you'll need to worry about (tho FE folks will).

`TaskPlan`s have a `settings` JSON field that holds information specific to certain kinds of `TaskPlan`s.  The `settings` object for an external assignment will for the moment just have a `url` string field.  Keep in mind this doesn't mean that `TaskPlan` changes -- it is just a vessel for the `settings` populated by the FE.  But what we will need is an assistant to process these `TaskPlan`s, and it'll be the thing that checks for and uses the `url` field.

## External Assignment Assistant / Task Step

Write an external assignment assistant (there's a README in the `/app/subsystems/tasks/assistants` directory, hopefully up-to-date).  It will create `Task`s for the external assignment `TaskPlan`.  Since `Task`s, like `TaskPlan`s are generic, we'll need a task step that has the URL in it.

`TaskStep` is also generic, but each `TaskStep` points off to a `tasked` which has the details.  Add a `TaskedExternalUrl` model, which will hold a URL.

Add a representer to output that information (like how it is done for other `TaskedBlah`s).

## Templatized URLs

One of the uses of external assignments in the Fall will be to delivery surveys to students.  We want to be able to track which students completed which surveys.  To that end, we have an idea to templatize external assignment URLs so that a random student research identifier can be substituted in the URL for each assignee.

E.g. we could have the following URL:

```
https://some-external-site.com/survey/42?id={{research_id}}
```

Which for different students could be

```
https://some-external-site.com/survey/42?id=4XG7823E
https://some-external-site.com/survey/42?id=89DBA455
...
```

Here are the pieces:

1. Though it may not be the final solution, for the moment, add a research_id field to each user profile.  Make it a short random (unique) string.
2. Figure out a good way to templatize the URL (choosing appropriate delimeters, etc -- the above is just a guess, doesn't have to be exactly like that)
3. Modify the code (likely in the new assistant) to output URLs with the templatized value interpolated for each taskee
4. For right now, only support this research ID interpolation.
5. Add a view for administrators to see the research IDs next to each student name in a course.  Later we'll have official "Researchers" in the system with their own views, etc.  For the moment, we need a quick and dirty way for admins to see the mapping between students and their research ID.

Do this work in a separate PR after the main work above.

## Follow-on Task: Output assistant schemas in the API docs somewhere

Each assistant has a schema inside of it that is used to inform what different kinds ot `TaskPlan`s can hold in their `settings` field.  However, this information is not conveyed in the API docs.  Figure out a good place to expose it and make it happen :-)

This work can also be in a separate PR.
