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
