# Reference Book APIs

The reference book combines largely-unprocessed content from CNX with a table of contents so the user can navigate from section to section.  Additionally, each page of content returned should have references to the next and previous pages so the FE can offer "next" and "previous" buttons without having to query and search the TOC.

The API to query to the TOC is already complete: https://tutor-demo.openstax.org/api/docs/v1/courses/readings

Here's the candidate API endpoint for pulling page content.

`/api/courses/23/page/46`

```ruby
{
  prev_page_id: '34',
  next_page_id: '57',
  title: 'Acceleration and You: A Moving Experience',
  chapter_section: [4,2],
  content_url: "https://cnx.org/blah"
  content_html: "<html here>",
}
```

## Backend Tasks

1. The backend needs to be changed to store the previous and next page in Content::Models::Page.
2. Do we need all within-book links in the pages to go to other reference book pages instead of to CNX?  If so what does the FE need that link to look like?
- Yep. In cnx the URL lines up nicely so it is <a href="[UUID]#optional-link-to-element"> (or [UUID]@[VER])

## Questions

1. The frontend never needs to display a book part (CNX "collection") right?  (assuming pages (CNX "modules") are sufficient, if a user clicks on a chapter the FE can just display the first module?)
2. Do we want to include tags present on each page in the JSON? (for what purpose I don't know yet)
