# Baking and Recipes

Baking has become a critical step for publishing - however, it is not planned for it to cause publishing to fail. This is partly due to how long baking may take - much like PDF generation, it can take several hours, if there are external parts, like exercises, that need to be fetched and incorporated into the pages.

This slightly odd situation (is baking a publish blocker, or not?) comes about partly due to derived copies - publishing a new version of content impacts not only the immediate book, but any book that shares pages with it. It was decided that failure of related books to bake is _not_ a publication blocker, so by extension, it is not for any book. However, we want to be careful to not break existing books by publishing new content, but we cannot test every book that contains a given page.

## Selection of Recipe and Fallback

So, we will implement two ways to mitigate this potential problem. First, will we keep track of when and with what recipe a given book successfully baked. This will point to the actual recipe bits - the file used. In order to use a given recipe for more than one book, we are extending the `print_style` attribute to also select a default recipe. Note that this can be updated independently of re-baking a given book.

When a new version of a book is published, we will attempt to bake it with the recipe specified by the `print_style` parameter. There will be a table of recipes that are the _current_ recipe for given print style. If baking with that recipe fails, we will then retry baking with the last successful recipe for this book. If that succeeds, we update the webview, but also mark the state as `stale_recipe`. This way, the new content is available, even if changes in presentation from a new recipe are not. Note that uploading a new default recipe for a given `print_style` will also put books in this state.

If the `print_style` parameter value does not have a default recipe associated with it, we will then check to see if a file with that name has been attached to the book. If there is no file, the book will be marked `Done/Success`. This will allow us to rollout recipes gradually for existing print styles. If there is a file, this will serve as a local recipe for baking a specific book, while removing the need for a "magic filename" from our processing code. The fallback described above would still be used - if the current book doesn't bake, use the most recent successful recipe, unless it is the same one we just tried.

## Content Fallback and Delayed Baking

If both attempts to bake fail, we leave the existing baked content in place, and mark the book as `stale_content`. The latest version of the content will still be available, by viewing the raw version, via the `?is_baked=false` query parameter.

Publishing individual pages causes minor-version revisions of each book that contains that page. This leads to a thundering-herd problem when trying to do several page edits in a row each start a book, and all of its derived copies, to bake. To help resolve this, we will no longer trigger baking on minor version revisions. We instead will mark these books as
`pending`, and process them on a delayed schedule. An interface for directly triggering baking for a given book in the pending state will be provided, but a time-based process will also "sweep up" books in this state. However, only the most recent minor version will be baked - when multiple pages and edited and published, each publish event will set the book with the new minor version to `pending`, while setting the previously pending minor version to `raw_only`.

## Reporting Baking State

The state of baking of a given book will be available in the `/extras` page for that book. This will be used to drive additional UI in the `More Information` tab, where the "Print Style" is currently reported. If the state is `pending` or `stale_recipe`, a link to trigger immediate baking will be provided (this is a `POST`). Also, the most recent history of baking, with error messages, will be available here.

 In addition, a global "state of baking" page will give an overview of all books and their current baked state. This may it in with the publishing administrative pages, under `/a` Again, any that are not current will have links  available to attempt re-baking.

|    result     |    state      |  color/shape    |  emoji  |
|:-------------:|:-------------:|:---------------:|:-------:|
|  Done/Success | up_to_date    |  Green/circle   | check   |
|  Pending      | stale_recipe  |  Yellow/square  | exclaim |
|  Pending      | stale_content |  Yellow/square  | exclaim |
|  Fallback     | stale_recipe  |  Red/triangle   |    X    |
|  Fail         | stale_content |  Red/triangle   |    X    |

Pending conditions come about via injection of a new recipe (`stale_recipe`) or publishing of a new page version, causing book minor version rev (`stale_content`). Retransform of CNXML to HTML would also cause a `Pending/stale_content` state. These `pending` conditions are presumed to be resolved by an upcoming baking run.

Red Conditions (`Fallback` and `Fail`) indicate that an error occurred while baking, and new bits (recipe or content) need to be uploaded to resolve the condition. The content available for students to see is not current.



 ## Development Workflow  - Recipe Injection

Testing of recipes during development of new recipes requires the ability to "inject" the recipe into the dev or testing server, so that the event-based asynchronous baking process will pick them up and `re-bake` the books of interest. In order to support the recipe selection described above, recipe devs need to be able to  replace the recipe associated with a given `print_style`, as well as provide a per-book custom recipe in place of a style-based one.

We will create a cli tool similar to `cnx-archive-inject-resource` that is specialized for storing recipes in the archive.  This needs to handle 3 (and a half) cases:

1. Store a default recipe for a `print_style`

  a. update for an existing `print_style`

  b. new `print_style`,

2. Custom/local recipe for a single book

3. Set the `print_style` for a book

4. combination of 1. and 3.

5. optionally trigger immediate re-bake


`cnx-inject-recipe config.ini [--print-style stylename] [--bake-now] [--new] [--default] [uuid@var] [recipe.css]`

Case 1a: updating an existing `print_style`:

`cnx-inject-recipe config.ini --print-style os_my_style recipe.css`

or, allowing filename to serve as style name:

`cnx-inject-recipe config.ini os_my_style.css`

Case 1b: A recipe for a new `print_style`:

`cnx-inject-recipe --new config.ini --print-style os_new_style recipe.css`

or

`cnx-inject-recipe --new config.ini os_new_style.css`

 The `--new` is required, to avoid accidentally creating new styles with typos of existing styles.

 Case 2: Custom recipe for one book:

 `cnx-inject-recipe config.ini --print-style my_custom_style  aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee@12.34 recipe.css`

 This will upload the recipe, store it as a file associated with the given book with a filename of "my_custom_style".

 The name here can also default:

 `cnx-inject-recipe config.ini   aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee@12.34 my_custom_style.css`

Case 3: Set `print_style` for an existing book
In production workflow, this case is handled by republishing the book. This is a development/administrative bypass.

`cnx-inject-recipe config.ini --print_style os_my_style aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee@12.34`

 * Note `os_my_style` _must_ be an existing `print_style`.

Case 4: Update/new recipe and set a book to it:

`cnx-inject-recipe --default config.ini aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee@12.34 os_my_style.css`

`cnx-inject-recipe --default --new config.ini aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee@12.34 os_new_style.css`

All cases above that set the `print_style` for a given book
will enqueue that book for immediate baking. Adding `--bake-now` to any recipe upload will cause any books affected by the recipe to be re-baked. That is, if you change the default recipe for an existing print style, all books with that style are now `stale`. Using `--bake-now` will enqueue them to be re-baked.




### ------ old notes

 What about re-baking?
What conditions would trigger a need to rebake w/o republishing content?
  1 - change to cxnml-> HTML transforms
  2 - change in recipe


Before I go implement the error-thrower, I should say - one of the design goals behind the existing Oven class was that it never error on baking - I suppose it does need to be able to handle some sort of error return for not-parsable-input  - but if the CSS is CSS, and the HTML is an HTML tree, I expect to get no error. Currently, the oven.bake() method works directly on a tree, and returns nothing. That could be changed to return some object that reports on what rules were applied. Hmm, I see because of how tinycss2's parser works (basically the same - it doesn't throw errors, it returns an parseerror object), I'm effectively ignoring CSS parse errors as well. Not good. O.k. we need some work here.
