# CoffeeScript Conventions

- read <https://github.com/styleguide>
- 2 spaces
- camelCase
- omit return unless necessary
- use `unless` instead of `if not`
- use `if` predicate if one line (`blah() if true`)
- omit `()` when defining functions with no args
- use `()` unless last arg is multiline (function or object)
- use `{foo, bar} = baz` when possible (for require calls, etc)
- use Promises for async operations
- Promise `.then` is on another line
- Do not use `.done` or `.fail` for promises (for ES6 compliance)
- use `x = require('foo')` instead of `define ['foo'], (x) ->` syntax
- use Markdown for comments (see `biscotto` item)
- code in a method should be eparated by at most 1 newline
- method calls should be separated by 2 newlines
- classes that are created an used by JavaScript should be prefixed with `js-` and **must not** be in the CSS
- classes that are created by JavaScript and used in CSS should be prefixed with `ui-` and **must** be in the CSS
- biscotto for docs
- use `\`import foo from bar\`` for coffeescript if using ES6 `import` syntax


# LESS/CSS Conventions

- read <https://github.com/styleguide>
- 2 spaces indent
- local mixins start with `.x-`
- use `import 'foo';` instead of `import url('foo.less');`
- style the element, then any `&...`, followed by child selectors (`> ...`), followed by descendant selectors (empty space)
- comma-separated selectors are each on a new line
- a single rule is on the same line as the selector
- use 2 newlines to mark the end of a scope that is > 20 lines long
- use Markdown for comments
- if the styling is complicated then use namespaces and separate selectors from rules
- classes that are created by JavaScript and used in CSS should be prefixed with `ui-` and **must** be in the CSS

# Markdown Conventions

Follow <https://github.com/cirosantilli/markdown-styleguide> (maybe skip the numbered lists one)

# Commit Conventions

1. Pull Request should:
  - have screenshot if possible
  - have accompanying Travis-CI tests
1. Use 'WIP' in PR title for work-in-progress Pull Requests that may require feedback
  - add a checklist to clarify when the WIP work is done
1. Messages convey intent ('Add x' instead of 'Added x')
1. No periods in bullet points
1. Tag with issue number at the beginning with the fully qualified repo name if different (`lml/ost#231: Add stuff`)
1. Rebase and push -f freely to get the commits crisp and clean in the topic branches
1. Use <https://github.com/atom/atom/blob/master/CONTRIBUTING.md#git-commit-messages> emoticons if you choose to use them
1. If a CHANGELOG file is desired, maybe https://github.com/philschatz/octokit.js/blob/commit-message-conventions/CONTRIBUTING.md for automated changelogs


# API Conventions

- use lowercase and underscore in JSON keys
- use underscore sparingly
- pluralize JSON keys containing Objects or arrays
- when naming keys:
  - `*_html` for arbitrary HTML content
  - `*_url` for URLs
  - `*_at` for Dates
  - `is_*` for booleans
- only `GET` requests use query string
- Paged results return link headers to next/previous/first/last
- Use `GET` which yields an HTTP 200/404 for boolean queries that test membership in a set (like `GET /classes/123/students/234`)
- Use `PUT` for sets (like `PUT /classes/123/students/234`)

## Collections

- pluralize URL parts (use `/books` instead of `/book`)
- shove required identifiers into URL when possible
  - `POST /classes/123/assignments` instead of `POST /assignments?class=123`
- Manipulating Sets (assuming `/books/1` is the root):
  - `GET /books/1` returns more info than necessary (ie `tags` show up as a key in the JSON)
  - `GET /books/1/tags` yields an array of all tags in book 1
  - `GET /books/1/tags/2` yields 200 or 404, no body (boolean question. asks if tag 2 is set in the book)
  - `PUT /books/1/tags/2` adds 2 to the set of tags (200 response, no body)
  - `DELETE /books/1/tags/2` yields 200
- Manipulating Lists (assuming `/books/1` is the root):
  - `GET /books/1/authors` yields an array whose values are the User objects (maybe reduced fields)
  - `GET /books/1/authors/2` yields 200 or 404 (boolean question. "is author in the list")
  - `PUT /books/1/authors` with JSON body `[3, 42]` replaces the list
  - `PUT /books/1/authors/2` yields 200 (appends to the list)
  - `DELETE /books/1/authors/2`

# Instant Messaging

Can we use XMPP instetad of skype? and https://meet.jit.si instead of Hangout?
Plus, we could start doing deployments via IM using <https://hubot.github.com/> which would be *awesome* ; )


## Updating Object Attributes

Use `PATCH`

- missing keys mean that field is not changed
- a key means "replace", not "merge with existing data" (for lists or objects)

To remove an attribute include `attributename: null` in the JSON.


## Async Operations

Send a `POST` and receive a 202 (Accepted) with a URL (in header and body) to obtain the status of the operation.

```
POST /books/1/publish
{ whatever_you_need_to_send }
```

If the `POST` is expected to create a new resource URL then the Link should be to the final URL of the resource.

The 202 response (assuming `23` is the new version number of the book):

```
Location: /books/1@23

/books/1@23
```

If the operation is still running send a 202 and return JSON representing the progress of the operation.

Once the async operation is done send a normal 200 response.


## Update Multiple Objects at once

**NOTE:** This is only needed if multiple operations need to happen at once.

The following are *mostly* only for completeness. 99% of the time these cases would not be implemented.

### Update multiple objects of the same type

```
PUT /books
{
  '1': { name: 'Physics' },
  '2': { name: 'Sociology' }
}
```

The 200 response is:

```
{
  '1': { name: 'Physics',   ...},
  '2': { name: 'Sociology', ...}
}
```

### Create multiple objects of the same type

```
POST /books
[
  { name: 'Physics'   },
  { name: 'Sociology' }
]
```

The response is:
```
[
  {id: '123', name: 'Physics',   ...},
  {id: '234', name: 'Sociology', ...}
]
```

### Delete several

To delete serveral books at once send a JSON array with the ids:

```
DELETE /books
[ '123', '234' ]
```


### Multiple objects of different types

If they are different types maybe a special `PUT /objects` URL with a JSON `{}` where each key is `[type]/[id]` (to match the URL).

```
PUT /objects
{
  'books/1'  : { name: 'Physics by John' },
  'authors/2': { first_name: 'John' }
}
```

The 200 response is:

```
{
  'books/1'  : { name: 'Physics by John', ... },
  'authors/2': { first_name: 'John', ... }
}
```

### Multiple operations on multiple objects of multiple types

The following will update book 1, create 2 new books, and delete 2 tags

```
PUT /objects
{
  'books/1' : { name: 'Physics' },
  'books' : [
    { name: 'Sociology' },
    { name: 'Biology' }
  ]
  'tags/3': null
  'tags/4': null
}
```

and the 200 response:

```
{
  'books': [
    { id: '123', name: 'Sociology', ...},
    { id: '234', name: 'Biology', ...}
  ]
}
```
