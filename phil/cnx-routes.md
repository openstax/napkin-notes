# CNX APIs

https://cnx.org APIs are split into 4 areas and documented in greater detail in each repository.

You can retrieve published content using the [^cnx-archive] APIs (including search), and can change content using the [^cnx-publishing-api] APIs.

Browser URLs are managed and documented in [^webview].

## Identifiers

There are 5 types of identifiers used within https://cnx.org

- [sha hash](#sha-hash)
- [UUID](#uuid)
- [Short UUID](#short-uuid)
- [UUID and version](#uuid-and-version)
- [Short UUID and version](#short-uuid-and-version)

### Sha hash

These are used for identifying resources (_e.g._ images) and the value is an `sha1` hash, as provided by `sha1sum` of the resource file bits.


### UUID

This is an identifier that conforms to the `UUIDv4` format specification. It is created either by the author or automatically by the archive when publishing a new [Book](#book) or [Page](#page). Values provided by the author may be replaced at publish time, primarily to avoid collisions with existing values in the archive. These are guaranteed to remain stable, and refer to the same document over time (and usually over installs of the archive as well)

#### Composite Object UUID

A special subset of the [UUID](#uuid)s, this is an identifier that conforms to the `UUIDv5` specification. It is used for book components ([page](#page) or [chapter](#chapter)) that are not part of the book as published by the author, but that are created as part of the publishing/baking process: Composite Pages or Chapters.

 It is formed based on the [UUID](#uuid) of its parent container ([Book](#book), [Unit](#unit), or [Chapter](#chapter)), and a semantic key. This allows these ids to remain relatively stable as the book is revised.


### Short UUID

This is a computed string which is based on the first few bits of the UUID. These are not guaranteed to be stable over all time, but we will strive to extend, rather than replace them.

It is used to reduce the length of URLs to a [Book](#book), [Page](#page), or Unit/Chapter.

### UUID and version

A specific version of a [Book](#book) or [Page](#page) is identified by a `{UUID}@{VERSION}` string. In the code, this is often described as an `ident-hash`.

- Page Version: the version is a natural number (`@123`) and increments when a Page is published (either content or metadata changes)

- Book Version: the version is 2 numbers, `@{MAJOR}.{MINOR}`
  - the `{MINOR}` number increments when a Page in the book changes
  - the `{MAJOR}` number increments when the Book structure (adding/removing Pages or Chapters) or Book metadata changes, _i.e._ the book _per se_ is republished.


- Unit/Chapter Version: these track the Book Version for the book they are in. Note that this means that the minor version will increment if a page within this container changes, so there may be more than one minor version for different chapters in the same book, always equal to or less than the book's minor version.

- Composite Object Version: these also track the version of their parent container, since they typically depend on the content of all the pages in that container.


### Short UUID and version

This is similar to [UUID and version](#uuid-and-version) except that a short UUID is used instead of a full UUID


## Types

Content in cnx generally falls into 3 types:

- [Resource](#resource)
- [Page](#page)
- [Book](#book)
- Special

### Resource

A Resource is typically an image or other file that is included as part of a [Page](#page). An image is referenced in a [Page](#page) as `<img src="../resources/${SHA}/${OPTIONAL_FRIENDLY_NAME}">` in the HTML contents. Other resources may be offered for download, and would then be referenced with a similiar relative URL, as `<a href=../resources/${SHA}/${OPTIONAL_FRIENDLY_NAME}>displayed name</a>`

It is identified by a hash of its contents and may contain an optional filename.

A consequence of using a hash is that Resources can be replaced but never changed.


Examples:

- https://cnx.org/resources/d47864c2ac77d80b1f2ff4c4c7f1b2059669e3e9
- https://cnx.org/resources/d47864c2ac77d80b1f2ff4c4c7f1b2059669e3e9/Figure_01_00_01.jpg
- https://cnx.org/8a8609226c03365e5af58e42f2a82902bf91087d/Practica_3.pdf
- https://cnx.org/bc86ed52100c7bb021a90fef8f0bc21475dc15a2/rhymeworksheet.doc

Resources are static and do not change. In order to replace an image, one has to edit the [Page](#page) and change the `<img src="…"/>` or `<a href="…">` tag. A resource may be referenced from more than one page, but only needs to be uploaded once.

### Page

A Page is part of the content of a book. It is smaller than a Chapter, typically presented as a Chapter Section. It is typically longer than a printed book page.

[//]: # "RJR - rework to describe page and page-in-context, as well as composite pages"

A Page is identified by a UUID, a version, and an optional [Book](#book) UUID.

There are several variations of retrieving a Page but the URL format uses the following pattern:

`https://archive.cnx.org/contents/{OPT_BOOK_IDENTIFIER:}{IDENTIFIER}{OPT_EXTENSION}`

- `OPT_BOOK_IDENTIFIER` can be a [UUID](#uuid) or a [short UUID](#short-uuid) and may contain an optional `@{MAJOR_VERSION}.{MINOR_VERSION}` which indicates a particular version of the [Book](#book) this Page is in
  - Why include the [Book](#book) identifier?
    - typically numbering elements like Figures or Exercises are dependent on which Book this Page is in
- `IDENTIFIER` can be a [UUID](#uuid) or a [short UUID](#short-uuid) and may contain an optional `@{MAJOR_VERSION}` which indicates a particular version of the Page
- `OPT_EXTENSION` indicates which format should be returned. Valid values are `.html` or `.json`
  - If an extension is not provided, the `Accept:` header is used to determine which format to return.


Examples:

- https://archive.cnx.org/contents/1d1fd537-77fb-4eac-8a8a-60bbaa747b6d
- https://archive.cnx.org/contents/1d1fd537-77fb-4eac-8a8a-60bbaa747b6d.html
- https://archive.cnx.org/contents/1d1fd537-77fb-4eac-8a8a-60bbaa747b6d.json
- https://archive.cnx.org/contents/1d1fd537-77fb-4eac-8a8a-60bbaa747b6d@3.html
- https://archive.cnx.org/contents/HR_VN3f7.html
- https://archive.cnx.org/contents/HR_VN3f7.json
- https://archive.cnx.org/contents/Ax2o07Ul:HR_VN3f7.html
- https://archive.cnx.org/contents/Ax2o07Ul:HR_VN3f7

And in the browser:

- https://cnx.org/contents/1d1fd537-77fb-4eac-8a8a-60bbaa747b6d
- https://cnx.org/contents/1d1fd537-77fb-4eac-8a8a-60bbaa747b6d@3
- https://cnx.org/contents/HR_VN3f7
- https://cnx.org/contents/HR_VN3f7@3
- https://cnx.org/contents/Ax2o07Ul@9.74:HR_VN3f7@3
- https://cnx.org/contents/031da8d3-b525-429c-80cf-6c8ed997733a@9.74:1d1fd537-77fb-4eac-8a8a-60bbaa747b6d


### Book

A Book is a tree which closely resembles the Table of Contents.

- Leaf nodes **must** be [Page](#page)s
  - These Pages end up being rendered as Preface, Chapter Sections, and Appendixes
- Non-Leaf nodes end up being Units or Chapters, depending on the depth of the node

Example URL: https://cnx.org/contents/031da8d3-b525-429c-80cf-6c8ed997733a

Example API URL: https://archive.cnx.org/contents/031da8d3-b525-429c-80cf-6c8ed997733a

Example Book structure:

```
Physics Book
- Preface (Page 1)
- Unit 1
  - Chapter 1
    - Section 1.1 (Page 2)
    - Section 1.2 (Page 3)
  - Chapter 2
    - Section 2.1 (Page 4)
    - Section 2.2 (Page 5)
- Appendix A (Page 6)
- Appendix B (Page 7)
```


## Retrieving Content

Book content can be retrieved by:

- Manually finding the book on https://cnx.org
- Using the [Search API](#search-api)

Then, to retrieve the entire book, remove the Page ID in the URL and change the hostname from `cnx.org` to `archive.cnx.org`.

As an example, https://cnx.org/contents/Ax2o07Ul@9.74:HR_VN3f7@3/Introduction-to-Science-and-th becomes https://archive.cnx.org/contents/Ax2o07Ul@9.74


### Individual Books and Pages



### Search API

This API is described in detail at [^cnx-archive-search-api].

Basically, similar to GitHub search or other Google search, you can set filters by including a `?q=key:value+key2:value` in the querystring of https://archive.cnx.org/search?q= or https://cnx.org/search?q=. An example of some parameters include:

- http://archive.cnx.org/search?q=Relativity
- http://archive.cnx.org/search?q=Relativity+authorID:OpenStaxCollege+subject:"Science+and+Technology"

### Redirects

To handle the case of short UUIDs and optional version numbers several server redirects happen. To illustrate, we will use the following example:

1. Browser requests [https://cnx.org/contents/{UUID}](https://cnx.org/contents/031da8d3-b525-429c-80cf-6c8ed997733a)
1. JavaScript requests [https://archive.cnx.org/contents/{UUID}](https://archive.cnx.org/contents/031da8d3-b525-429c-80cf-6c8ed997733a)
1. server redirects to [https://archive.cnx.org/contents/{UUID}@{VERSION}](https://archive.cnx.org/contents/031da8d3-b525-429c-80cf-6c8ed997733a@9.74)
1. AJAX response contains the short UUID for the Book (`Ax2o07Ul`) and the Preface Page (`HR_VN3f7@3`)
1. JavaScript requests the Preface Page with the book ID to get the correct context
1. JavaScript changes the browser URL to [https://cnx.org/contents/{BOOK_SHORT_ID}@{VER}:{PAGE_SHORT_ID}@{VER}}/{TITLE_SLUG}](https://cnx.org/contents/Ax2o07Ul@9.74:HR_VN3f7@3/Introduction-to-Science-and-th)


## Publishing Content

Publishing content requires POSTing a specially-formatted ePUB as a payload.

This payload contains all the Books (usually 1), Pages, Resources, and metadata (like permissions).

See the [^cnx-publishing-api] for more details on the format and URLs.




[^cnx-archive]: https://github.com/Connexions/cnx-archive
[^cnx-archive-search-api]: https://github.com/Connexions/cnx-archive/blob/master/docs/search_api_doc.rst
[^cnx-publishing]: https://github.com/Connexions/cnx-publishing
[^cnx-publishing-api]: https://github.com/Connexions/cnx-publishing#http-api
[^webview]: https://github.com/Connexions/webview


---
---
---
---
---
---
---
---
---

Below be dragons

---
---
---
---
---
---
---
---
---
---
---
---
---


All the routes in https://cnx.org, https://archive.cnx.org, and CNX Publishing

# CNX Webview

- `/`
- `/workspace`
- `/contents`
- `/browse`
- `/tos`
- `/license`
- `/users/role-acceptance/{details}/`
- `/contents/`
- `/contents/{contentPattern}'`
```
  # Match and extract uuid and page numbers separated by a colon
  contentPattern =
    ///
    ([^:@/]+)     # uuid up to delimiter
    @?            # Optional @
    ([^:/?]*)     # Optional Revision
    :?            # Optional ':'
    ([^/?]*)      # Optional Page number or uuid
    /?            # Optional '/'
    ([^?]*)       # Optional Segment of title
    (\?.*)?       # Optional params
    ///
```


- `/donate/{/segment1?}{/segment2?}{/segment3?}{/segment4?}`
- `/search{?q}`
- `/about{?}`


# CNX Archive

- `/contents/{ident_hash}{:page_ident_hash?}{/ignore?}.html`
- `/contents/{ident_hash}{:page_ident_hash?}{/ignore?}.json`
- `/contents/{ident_hash}{:page_ident_hash?}{/ignore?}`
- `/resources/{hash}{/ignore?}`
- `/exports/{ident_hash}.{type}{/ignore?}`
- `/extras/{ident_hash}`
- `/search`
- `/search/{ident_hash}`
- `/search/{ident_hash}{:page_ident_hash?}`
- `/extras`
- `/sitemap.xml`
- `/robots.txt`
- `/content/{objid}{/ignore?}`
- `/content/{objid}/latest{/ignore?}{/filename?}`
- `/content/{objid}/{objver}{/ignore?}{/filename?}`


# Publishing

- `/contents/{ident_hash}`
- `/resources/{hash}`

## User actions API
- `/contents/{uuid}/licensors`
- `/contents/{uuid}/roles`
- `/contents/{uuid}/permissions`

## Publishing API
- `/publications`
- `/publications/{id}`
- `/publications/{id}/license-acceptances/{uid}`
- `/publications/{id}/role-acceptances/{uid}`
- `/contents/{ident_hash}/collate-content`

## Moderation routes
- `/moderations`
- `/moderations/{id}`
- `/feeds/moderations.rss`

## API Key routes
- `/api-keys`
- `/api-keys/{id}`
