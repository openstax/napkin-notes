# Reference Book APIs

The reference book combines largely-unprocessed content from CNX with a table of contents so the user can navigate from section to section.  Additionally, each page of content returned should have references to the next and previous pages so the FE can offer "next" and "previous" buttons without having to query and search the TOC.

The API to query to the TOC is already complete: https://tutor-demo.openstax.org/api/docs/v1/courses/readings

Here's the candidate API endpoint for pulling page content.

`/api/page/:uuid(:version)`

e.g.

`/api/pages/e4c329f3-1972-4835-a203-3e8c539e4df3@2.14`

or

`/api/pages/e4c329f3-1972-4835-a203-3e8c539e4df3` (latest we have)

```ruby
{
  content_html: "<html here>",
}
```

The `title`, `chapter_section`, previous and next links, etc will be read from the TOC endpoint.

## Backend Tasks

1. Store the CNX UUID and version in Content::Models::{Page, BookPart}.
2. For right now, read access to the page API does not need to be restricted.
3. During import, convert all link urls to absolute urls, except for urls pointing to the book being imported, which should be converted to reference view urls; this will require looking at the collection before import and building a table of all modules inside the book so we can know which are internal and which are external.

## Questions

1. The frontend never needs to display a book part (CNX "collection") right?  (assuming pages (CNX "modules") are sufficient, if a user clicks on a chapter the FE can just display the first module?);
  * JP: I believe this is correct
2. Do we want to include tags present on each page in the JSON? (for what purpose I don't know yet)
  * Don't know yet, skip for now.
3. Do we need all within-book links in the pages to go to other reference book pages instead of to CNX?  If so what does the FE need that link to look like?
  * PS: Yep. In cnx the URL lines up nicely so it is `<a href="[UUID]#optional-link-to-element">` (or `[UUID]@[VER]`)

