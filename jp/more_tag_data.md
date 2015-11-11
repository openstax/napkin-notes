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

### Tags other than Learning Objectives

See the [container section of the tagging legend](https://github.com/openstax/tagging-legend/blob/master/README.md#container),
which defines how the extra data is stored in CNX content for non-LO tags.

Here's the algorithm for importing the extra tag information for non-LO tags:

1. When importing pages from CNX books, find elements where the first class is
   `ost-standards-def`.
2. Take the last class defined for that element, find (or create) the `Tag` with that
   value and update its `name` and `description` to match the value of the child elements with
   classes `ost-standards-name` and `ost-standards-description`, respectively.

### Learning Objectives

Learning objective tags are given names through a different syntax; see the [learning objectives section](https://github.com/openstax/tagging-legend/blob/master/README.md#learning-objectives-defined).  This learning objective definition is also the **only** place
in OpenStax where LO tags are linked to TEKS tags (TEKS tags are the only tags not attached to exercises in OpenStax
Exercises).  When we report tags for exercises in Tutor, we are responsible for also including any applicable TEKS tags;
this means that we must record the link between LOs and TEKS provided by this part of the tagging legend, and when we
report tags for exercises we need to pull and report those TEKS that match LOs on the exercise.

To record this linkage, create a new `LoTeks` join table in the `Content` subsystem.  It should have `lo_id` and `teks_id` fields,
which point to `Tag` objects.  This is clearly a very specific join table; one might wonder if we should
have a more generic name, but for now this is the only use case we have so we'll use this specific
name and migrate to something more generic later as needed.

Here's the algorithm for importing the extra tag information for learning objectives:

1. When importing pages from CNX books, find elements where the first class is
  `ost-learning-objective-def`.
2. One of the other classes defined in that element should should with `ost-tag-lo-`.
   This is the LO tag.  Find (or create) the `Tag` with that value and set its `name` to the
   content of the HTML element. (there is nothing to put in the `description`).
3. If there is also another class in the element that starts `ost-tag-teks-`,
   find (or create) the `Tag` with that value and add an entry into the `LoTeks`
   join table mapping the LO tag to the TEKS tag.  Note that there will not always be a TEKS
   tag in these LO definitions -- the Biology book does not use TEKS.

### Misc

1. Should we error out if these fields have already been defined? (we should probably at least log an error)

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

Note that when we get the tags for an exercise, we'll need to find and report all TEKS tags
for any LO tags on the exercise, as well.  At least for now, TEKS tags should be reported as
peers to the LO tags that brought them into the picture, not as children of them.

To support the possibility that one exercise matches multiple pages in the book, remove
current code changes that add `path` to exercise classes.  The `chapter_section` property of the
`lo` tags will be sufficient for what the frontend needs, and since an exercise can have
multiple LOs that means that it can also effectively have multiple `chapter_section` fields,
one per tag.
