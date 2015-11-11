## Notation

term | definition
----|-------------
CC  | Concept Coach
SPE | Spaced Practice Exercise
ToC | Table of Contents
OX  | OpenStax

## Tutor Imports CC-Specific Book

`OX Tutor`'s `ecosystem` creation process
will need to be updated
to handle the needs
of `CC-Specific Courses`.

The process will have a signature of the form:
```
ecosystem = CcImport(cnx_book_id, bookname)
```

`Pages` in CC-specific `Books`
will not have the normal tagging
present in High School `Course` content
(specifically, the `LO` tags will not be in the content,
but they will be on exercises in `OX Exercises`).

To compensate for this,
`OX Tutor` will automatically infer
an `LO` tag pattern of the following form:
```
<bookname>-ch<#c>sec<#s>-lo*

where:
  <bookname> = 'apbio', 'phys', etc. (passed as parameter to CcImport)
  <#c>       = chapter number for the current Page
  <#s>       = section number for the current Page
  *          = any digits
```
and query `OX Exercises` accordingly
to create the `Pool` of `Exercises`
to use as `CC` assessments
for the current `Page`.

## Tutor will have Special CC-Specific Courses

`OX Tutor` will need to support special `Courses`
which support new `CC` features
and (perhaps) do not support extraneous features
(like Calendar, etc.).

## Tutor Generates and Stores Per-Period CC Codes

`OX Tutor` will
generate and store
a per-`Period` `CC` `registration codes`
for each `CC-Specific Course`.

These codes will need to be made available
to third parties
for distribution to teachers and students.

## Tutor CC Widget

Certain `Cnx` `Pages` will contain
a `OX Tutor` `CC Widget`
(some javascripty something or other)
which will present
`OX Tutor`-generated content
to `Cnx` users.

The `CC Widget` will be given
the current logged-in `User` (if any)
and the `Book:Page` associated with the current URL.
That information will be passed on to `OX Tutor`.

#### Anonymous User Visits CC Page URL

If an anonymous (not logged in) user
visits a `Cnx` `Page` with a `CC Widget`,
the `CC Widget` will display a login screen.

#### Logged in User Visits CC Page URL

If a logged in `User`
visits a `Cnx` `Page` with a `CC Widget`,
the `CC Widget` display will depend
on whether or not `OX Tutor` can associate the combination
of `User` and `Book:Page` URL
with a `Student` in a `CC-Specific Course`.

##### `User`/`Book:Page` Combo Identifies a `Student`

`OX Tutor` will create
a `CC` `Task` for the `Book:Page`
for the current `Student`.
This new `Task` will be displayed
in the `CC Widget`.

The first assessment of the `Task`
will be shown and be workable
by the `Student`.

##### `User`/`Book:Page` Combo Does NOT Identify a `Student`

If the `User`/`Book:Page` combination
does NOT identify a `Student`
in a `CC-Specific Course`,
the `CC Widget` will display
a place to enter a `registration code`.

Upon receipt of the
`User`/`Book:Page`/`registation code` triple,
`OX Tutor` will create a new `Student`
in the appropriate `Period`
of the `CC-Specific Course`
associated with the `registration code`.

Now that `OX Tutor`
can identify the `Student`,
the previous workflow
can be followed.

## Student Completes First Concept Coach Exercise for a Given Page

Upon the completion of the first `CC` `Task` assessment,
`OX Tutor` will
add the current `Task` to the `Student's` event history
(setting the `history_time`)
and populate its `SPE` placeholders (if any).

## Student Scores (Online and Download)

`OX Tutor` will need to provide
`Teachers` of `CC-Specific Courses`
the ability to display and download
a table of `Student` scores.

The table will be organized
according to the `Book` ToC,
and columns with no `Student` data at all
will not be shown.
