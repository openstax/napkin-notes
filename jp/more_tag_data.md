# More Tag Data

Right now we just store the raw tag from CNX and Exercises content, e.g. `ost-tag-lo-k12phys-ch04-s01-lo01`.
The [tagging legend](https://github.com/openstax/tagging-legend/blob/master/README.md) defines human readable
tag names and descriptions that we should also import while importing the book.

## Add more data fields to Tag

To the `Tag` class in the `Content` subsystem, add the following columns:

1. **name**: a string, may be null
2. **description**: a text field, may be null

Add a `chapter_section` method to `Tag` that extracts the chapter and section (e.g. `"5.2"`) from
`lo` type tags using a regular expression matcher. E.g. for `ost-tag-lo-k12phys-ch04-s01-lo01` the
`chapter_section` is `"4.1"`.  For non-`lo` tags, return `nil`.

## Extract extra tag information when importing books

See the [container section of the tagging legend](https://github.com/openstax/tagging-legend/blob/master/README.md#container),
which defines how the extra data is stored in CNX content for each tag.  Note that the [learning objectives section](https://github.com/openstax/tagging-legend/blob/master/README.md#learning-objectives-defined) earlier in the document is currently incorrect: learning
objectives should have the same format as is described in the container section.

Here's the algorithm for importing the extra tag information:

1. When importing pages from CNX books, find elements where the first class definition starts with
   `ost-` and ends with `-def`.
2. For each other class in that element that starts with `ost-tag-`, find the `Tag` with that
   value and update its `name` and `description` to match the value of the child elements with
   classes `ost-blahblah-name` and `ost-blahblah-description`, respectively.

Should we error out if these fields have already been defined? (we should probably at least log an error)

## Rename path fields to chapter_section

`path` is too generic of a name to describe `"5.2"`.  Rename any use of `path` to `chapter_section`.
While better than `path`, this isn't a super great name either, but if we think of something better we can change it later.

## TagRepresenter

Create a `TagRepresenter` to that has the following properties:

1. **id**: the raw tag value, e.g. `ost-tag-lo-k12phys-ch04-s01-lo01`
5. **type**: the tag type, can be verbatim the tag type from the ActiveRecord enum as a string
2. **name**: the tag name, e.g. `(4C)`
3. **description**: the tag description
4. **chapter_section**: the `"5.2"` value or what was previously called `path`, will only
   exist for `lo` type tags.

## ExerciseRepresenter

Modify the `ExerciseRepresenter` to output a `collection :tags` using the `TagRepresenter`.

To support the possibility that one exercise matches multiple pages in the book, remove
current code changes that add `path` to exercise classes.  The `chapter_section` property of the
`lo` tags will be sufficient for what the frontend needs, and since an exercise can have
multiple LOs that means that it can also effectively have multiple `chapter_section` fields,
one per tag.
