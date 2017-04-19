# CNX APIs

https://cnx.org APIs are split into 4 areas and documented in greater detail in each repository.

You can retrieve published content using the [^cnx-archive] APIs (including search), and can change content using the [^cnx-publishing] APIs.

Browser URLs are managed and documented in [^webview].

## Identifiers

There are 4 types of identifiers used within https://cnx.org

- sha hash
- UUID
- Short UUID
- UUID and version

### Sha hash

### UUID

### Short UUID

### UUID and version



## Types

Content in cnx generally falls into 3 types:

- Resource
- Page
- Book
- Special

### Resource

A Resource is typically an image that is included as part of a [Page](#page). It is referenced in a [Page](#page) as `<img src="../resources/${SHA}/${OPTIONAL_FRIENDLY_NAME}">` in the HTML contents.

It is identified by a hash of its contents and may contain an optional filename.

Examples:

- https://cnx.org/resources/d47864c2ac77d80b1f2ff4c4c7f1b2059669e3e9
- https://cnx.org/resources/d47864c2ac77d80b1f2ff4c4c7f1b2059669e3e9/Figure_01_00_01.jpg

Resources are static and do not change. In order to replace an image, one has to edit the [Page](#page) and change the `<img src="..."/>` tag.


### Page

A Page is the content of a book. It is smaller than a Chapter, typically a Book Section.

A Page is identified by a UUID, a version, and an optional [Book](#book) UUID.

There are several variations of retrieving a Page but the URL format uses the following pattern:

`https://archive.cnx.org/contents/{OPT_BOOK_IDENTIFIER:}{IDENTIFIER}{OPT_EXTENSION}`

- `OPT_BOOK_IDENTIFIER` can be a [UUID](#uuid) or a [short UUID](#short-uuid) and may contain an optional `@{MAJOR_VERSION}.{MINOR_VERSION}` which indicates a particular version of the [Book](#book) this Page is in
  - Why include the [Book](#book) identifier?
    - typically numbering elements like Figures or Exercises are dependent on which Book this Page is in
- `IDENTIFIER` can be a [UUID](#uuid) or a [short UUID](#short-uuid) and may contain an optional `@{MAJOR_VERSION}` which indicates a particular version of the Page
- `OPT_EXTENSION` indicates which format should be returned. Valid values are `.html` or `.json`


Examples:

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

https://cnx.org/contents/031da8d3-b525-429c-80cf-6c8ed997733a

A book is the binding


## Retrieving Content



### Individual Books and Pages


### Search


## Publishing Content

https://github.com/Connexions/cnx-publishing#http-api

## Browser Links

https://cnx.org/contents/031da8d3-b525-429c-80cf-6c8ed997733a redirects to https://cnx.org/contents/Ax2o07Ul@9.74:HR_VN3f7@3/Introduction-to-Science-and-th



[^cnx-archive]: https://github.com/Connexions/cnx-archive
[^cnx-publishing]: https://github.com/Connexions/cnx-publishing
[^webview]: https://github.com/Connexions/webview


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
