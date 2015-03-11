
- No one likes reading API docs
- Conventions can help in many cases





















```
submitlog:  ??? array? why 1-word?
abstract:   ??? has HTML?
revised:    ??? boolean?
legacy_id:  ??? why underscored?
parentId:
mediaType:
doctype:    ??? why lower?
website:    ??? type?
url:
firstname:  ???
buyLink:    ??? URL? relative?
changes:    ??? array?
```
from http://archive.cnx.org


- camelcase inconsistency
- casing inconsistency
- all-lowercasing
- infer type from name












```
submitlog:  "Added Connexions as maintainer. Upgraded to new version of CNXML."
abstract:   ""
revised:    "2011-07-26T16:21:29Z"
legacy_id:  "m12045"
parentId:   null
mediaType:  "application/vnd.org.cnx.module"
website:    "http://cnx.org"
url:        "http://creativecommons.org/licenses/by/3.0/"
firstname:  "Adan"
doctype:    ""
buyLink:    null
changes:    "Added Connexions as maintainer. Upgraded to new version of CNXML."
```
















API Documentation:


# Contrived Example

```coffee
task =
  title:
  open:
  completed:
  description:
  homepage:
  roles:
    copyright_holder:
    maintainer:
```

Some questions that arise (from just looking at the keys):

1. What is `open` and `completed` (both the type and existential)?
2. When should a field be past tense?
3. What is the type of `copyright_holder`?
4. What is the type of `homepage`?








# With the values it becomes a little clearer, but still questions

```coffee
task =
  title: "Homework 1"
  due: "2015-03-01T19:20:21Z"
  description: "Try to spend no more than <em>15</em> minutes"
  homepage: "http://cnx.org"
  roles:
    copyright_holder: [987, 876]
    maintainer: [876]
```

5. Can the title contain HTML?
  - validated differently on the server
  - handled differently in the browser
6. Is `due` really a date or did someone just enter that string in?

7. How do I change the `title` or `due`?
8. How do I remove the due date?
9. How do I change the copyright holders?
  - ... without changing the maintainers








# Proposal


1. suffix date fields with `*_at` and prefix boolean fields with `is_*`
2. never use past tense (see routes)
3. suffix array fields with `*s`
4. suffix URL fields with `*_url`
5. suffix HTML fields with `*_html`
6. (addressed above)
7. use `PATCH .` with payload `{title: "new title"}` to edit
8. use `PATCH .` with payload `{title: null}` to remove
9. Flatten the JSON ; )

```coffee
task =
  title: "Homework 1"
  due_at: "2015-03-01T19:20:21Z"
  description_html: "Try to spend no more than <em>15</em> minutes"
  home_page_url: "http://cnx.org"
  copyright_holders: [987, 876]
  maintainers: [876]
```




# Shallow JSON for PATCHing

Why shallow?

```coffee
title: "Homework 1"
due_at: "2015-03-01T19:20:21Z"
description_html: "Try to spend no more than <em>15</em> minutes"
home_page_url: "http://cnx.org"
roles:
  copyright_holders: [987, 876]
  maintainers: [876]
```

1. How to add/remove a maintainer without changing the `copyright_holders`?
	- unclear if missing `copyright_holders`  means to remove them or not

Alternate:

```coffee
title: "Homework 1"
due_at: "2015-03-01T19:20:21Z"
description_html: "Try to spend no more than <em>15</em> minutes"
home_page_url: "http://cnx.org"
roles:
  copyright_holders: [987, 876]
  maintainers: [876]
```










# Which fields are required for GETing or POSTing?

- Make them part of the URL
  - you have to document that anyway ; )

This opens up another question of whether the POST'd object should live in the same place as the POST. See below

Example from this past sprint:

```coffee
POST /courses/123/plans     {type: 'reading'}  is required
```

Alternate:
```coffee
POST /courses/123/readings     nothing is required
```





















# Adding more things into the GET (not just id's)

To list the copyright holders, the JS will still need to know how to convert an id to a name.
This includes documenting (and providing) a URL to specifically look up a user.

Instead of documenting another API endpoint, include the information in the `GET` JSON.
For example:


```coffee
maintainers: [{id: 876, first_name: 'John'}]
```


















# Editing Sets/Lists

It's unclear how to add/remove a maintainer in the above JSON.

Instead, have a route that offers PUT/DELETE and is named the same as the field in the JSON. *No documentation* ; )

`PUT/DELETE ./maintainers/876`

1. Makes clear what is being changed
2. multiple smaller calls make collaborative editing easier
  - since smaller changes to the server










# Include the canonical URL in the object

This allows objects to "live" somewhere other than where they are created or retrieved.

For example, `GET /courses/123/tasks` returns a list of tasks that actually "live" in `/tasks`. By "live" I mean there are mutation routes there.
