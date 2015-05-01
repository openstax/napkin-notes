# Performance Book Export

Lets a teacher generate and download an Excel version of the performance book.  Experience has shown that the generation of files such as this can take more time than we want to spend in a single web request.  Therefore when implementing this feature we should do so in a background job.  There are a number of other reporting and external interactions we'll also want to run in background jobs later, so this will be a good experience for them.

## Workflow

1. The teacher arrives at the performance book page
2. There will be a section on the page showing previously exported files still available for download
3. If there isn't a good enough prior export in the export list, the teacher will click the "Export" button.
4. The FE will hit a `POST /api/courses/1/performance/export` endpoint with an empty body.
5. As long as the request is valid, that endpoint will queue a background job to generate the export.
5. The FE will begin to poll `GET /api/courses/1/performance/exports`, which eventually contain information about the generated file.  The FE can stop polling after there's a file in the exports endpoint that was created after the button was clicked.

## Exports Endpoint

```ruby
[
  {
    filename: 'Physics_I_Performance_20150430-193402.xlsx',
    url: 'the url to it',
    created_at: 'datetime here in FE format'
  },
  {
    # ... additional items
  }
]
```

## Workbook Content

The workbook should be an "xlsx" Excel file, containing two worksheets.  The first should contain some summary information, e.g. the course name, date the file was generated, etc.  The second sheet should contain the performance book data.

In the past we've built these spreadsheets using simple XML views like:

`https://github.com/lml/ost/blob/master/app/views/classes/class_grades.xls.erb`

Here's an example where we used some local helpers to get the job done (tho I believe this was a fair bit slower on the generation):

`https://github.com/lml/ost/blob/63bdec720e21840ca9a600c70a03b833886308ee/app/views/assignments/grades.xls.erb`

Gotta remember to have a `format.xls` like in

`https://github.com/lml/ost/blob/master/app/controllers/classes_controller.rb#L127-L141`

(actually should that be `format.xlsx`?)

Also need to add a MIME type:

`https://github.com/lml/ost/blob/63bdec720e21840ca9a600c70a03b833886308ee/config/initializers/mime_types.rb`

(might need a gem for this? see the Gemfile of github.com/lml/ost)

Here's a view that was used for defining a percent format:

`https://github.com/lml/ost/blob/63bdec720e21840ca9a600c70a03b833886308ee/app/views/shared/_xls_workbook.xls.erb`

## Assets

Over time, we'll have the need to store and provide access to a number of different files (PPTs attached to tasks by teachers, syllabus PDFs available at the course level, research reports, etc).

On the OpenStax College site, we had a need to display links to files on public web pages but have the links be restricted to only certain users.  To accomplish this, we had "secure attachments" and a mechanism for checking that the user requesting the link actually had permission to download the file.  On Tutor we probably don't need this kind of authorization check because all links to files will already be on pages where we've done an authorization already.  However, so that URLs to files cannot be randomly guessed, we should have a random hex string in the URL, e.g.

```
https://tutor.openstax.org/files/6d5ec690ae8b45c3447a393d224bb3d4/Physics_I_Performance_20150430-193402.xlsx
```

The filename should have meaning because the browser will by default save it with that name.

If possible, try to implement a 'file' (or 'attachment' or 'asset', etc) subsystem that manages file stuff.  Later this SS could control user / course disk quotas, etc.  There are probably three public routines: one to store a file, one to get file information (what is reported in the `exports` endpoint), and one to delete a file.  File models would polymorphically belong to some other object:

```ruby
class Files::Models::File < ActiveRecord::Base
  belongs_to :owner, polymorphic: true
end
```

And it may be helpful to have the category of file associated with that object so that external code can just retrieve certain files.  E.g. the a File object could have these fields:

```ruby
id: 2389,
owner_type: 'entity_course',
owner_id: 289,
category: 'teacher-performance'  # open to a different field name
                                 # 'teacher-performance' would just mean
                                 # something in the context of a Course owner
```

Then when we're getting the files for the `exports` endpoint, we could call:

```ruby
File::GetFiles[owner: a_course, category: 'teacher-performance']
```

## Background Processing

Rails 4.2 has ActiveJob now for dealing with background jobs, but we still need to choose an implementation that backs it up.  Would be good to hear a summary of the options and the pros and cons of each.

## Performance Book Endpoint

Update the existing performance book endpoint to contain the existing list of exports.  That way, when the FE brings up the performance book they don't need to make a separate query to get the exports that are already available.

## Notes

1. We'll be doing periods soon, but not right now.  For right now, we can have all student data in one spreadsheet.  Later, each period will be its own sheet within the overall workbook.
2. Filename should have course name and generation date in it.

## Things we can worry about later

1. Store on S3 in production (carrierwave / fog gems are handy)
2. Optionally set expiration dates for exports (e.g. "this file will be available for 7 days")

## Open questions

1. How do we test the background nature of this work?

