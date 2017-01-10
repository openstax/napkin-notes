<!--
- - -
title: OpenStax BAKING and RECIPES
layout: post
source-id: 1g51yQJFeawFV_SKmtZG7VUYLix8ygQqAPuqA41mlgYk
published: true
- - -
-->

# PUBLISHING COLLATED DOCUMENTS USING HTML5 and CSS-BASED CONTENT TRANSFORMATIONS

# GENERAL INFORMATION

When the standard operations of collation (such as numbering, sorting, copying, or moving content) are delayed until visual representation (display on a web page, composed for print, etc) a quality problem arises due to differences in software used to display book content -- ereaders, web browsers, printing tools, etc perform those collation operations in their own way, leading to frequent inconsistencies. This has been mitigated by the development of a publishing system that separates the collation of content from its eventual display. 

Collating early in the publication process ensures each published format is able to present content consistently as well as optimally. For example, a book might need to move and sort exercises in a particular way. In each format the published book will present the exercises moved and sorted in the same way because the content is collated beforehand by the same software. There may still be differences in how this content is visually presented, for instance it may be desirable to use an increased font size in an ebook reader. The goal is not an *identical* visual representation of content, but rather a *consistent collation* of content. The imaginary book in this example might have exercises displayed using different typography in print vs the web, but each should be labeled the same: "Exercise n", and have the same value of n.

At a 30,000 ft view, the project landscape is roughly:

* "Rulesets" (an extended subset of CSS) describe the transformation rules used to create the collation strategy in a specific book. Eg, move this there, number these that way, etc.

* Content is edited "raw", in a way that is easy to maintain from a content perspective. For example, solutions and problems in the content will be siblings under the same parent exercise, even if the solutions will only be displayed in an end of book answer key. To generate the collated version with solutions in the answer key you “cook” the document with cnx-easybake, using a recipe which knows how to build an answer key. 

The following links are the smaller pieces of infrastructure that combine to create the updated publishing system:

[CSS Selectors for ElementTree-compatible (lxml...) documents](https://github.com/Connexions/cssselect2) - Custom selectors

[cnx-easybake, 'Bake in' manipulations of HTML files](https://github.com/Connexions/cnx-easybake/) - Parse CSS Rulesets and generate HTML documents out of the transformations described.

[Rulesets for cooking OpenStax textbook](https://github.com/Connexions/cnx-recipes)[s](https://github.com/Connexions/cnx-recipes) - These are the "Recipes" for cooking OpenStax Textbooks

# WORKFLOW and TOOLS

From this point forward this document will only be useful for nerds who need specific technical details.

For content managers who want to generate cooked versions of books and developers who want to create rulesets for new books, the best starting place is the cnx-recipes repository. Scripts/ exist to bake content using rulesets (and cnx-easybake). Rulesets/ provides the infrastructure to make it easier to create rulesets for new books.

```sh
git clone https://github.com/Connexions/cnx-recipes.git

cd cnx-recipes

./scripts/setup 
```

Now you can edit the file books.txt to point to content you want to develop a ruleset for. This is done via finding the UUID of the book you want to edit and adding it to books.txt following the inline format. On cnx.org/cte-cnx-dev.cnx.org/tea.cnx.org/etc, find the book you want and then click "More Information" and copy the ID. Now you can run the following command to install the content:

```
./scripts/fetch-html insert-book-name-here
```

Or

```
./scripts/fetch-html --all
```

To fetch the content for all books configured in books.txt.

Once you have added a ruleset and book (with uuid) to books.txt and fetched the book contents you can build a single page cooked HTML document of the book using the following command:

```
./scripts/bake-book insert-book-name-here
```

When Rulesets are updated, they need to be compiled from SCSS to CSS. This can be done with sass using the compile-books script.

```
./scripts/compile-books
```

This is a good stopping point where you should explore the cnx-recipes [README](https://github.com/Connexions/cnx-recipes/blob/master/README.md), and also explore the scripts/ directory. The scripts there are extremely convenient. They are easy to understand, and written in [bash](http://www.tldp.org/LDP/Bash-Beginners-Guide/html/) script.

# HTML5 for OpenStax TEXTBOOKS

--

# THE BAKING PROCESS

This section is intended to introduce new developers to the cnx-easybake algorithm and various parts of the code.

Generally speaking the cnx-easybake application parses CSS files and an lxml tree and operates repeatedly on the tree cycling through "steps" such as “pending”, “counters”, etc. The CSS is parsed into “actions” that take place at the end of those steps. Those actions modify the element tree.

**Note:** Unlike CSS, each block is evaluated in-order which it occurs in the file and every declaration is evaluated (even duplicate declarations) in-order. This may be confusing when using the `::outside` and `::before` pseudo-selectors because multiple `::before { … }` blocks will create multiple elements even if the selectors are the same.

# CSS for RECIPES

This section describes the extended subset of CSS3 understood by the cnx-easybake software. 

Declarations:

`string-set`  [[ [{{identifier}}](http://dev.w3.org/csswg/css-values-3/#identifier-value) [{{content-list}}](http://dev.w3.org/csswg/css-content-3/#ltcontent-listgt)] [, [{{custom-ident}}](http://dev.w3.org/csswg/css-values-3/#identifier-value) [{{content-list}}](http://dev.w3.org/csswg/css-content-3/#ltcontent-listgt)]* ] | none

`content-list` = [ {{string}} | {{counter()}} | {{content()}} | attr({{identifier}}) ]+

One or more pairs of an identifier naming the string and a content-list describing how the string's value is constructed.

`node-set`  [[ [{{identifier}}](http://dev.w3.org/csswg/css-values-3/#identifier-value) ]]

An identifier naming the current node/element.

`move-to`  [[ [{{identifier}}](http://dev.w3.org/csswg/css-values-3/#identifier-value) ]]

'move-to' causes the element or pseudo-element to be removed from the flow and reinserted at a later point in the document. The content is reinserted using the 'pending()' value of the 'content' property.

**Note:** This will cause the element to be unselectable until it is inserted back into the DOM which may cause confusion (ie when moving a Note or Exercise during the same time when lists are being wrapped)

`copy-to`  [[ [{{identifier}}](http://dev.w3.org/csswg/css-values-3/#identifier-value) ]]

'copy-to' causes the element or pseudo-element to be copied to a later point in the document. The content is reinserted using the 'pending()' value of the 'content' property.

`class`  [[ [{{string}}](http://dev.w3.org/csswg/css-values-3/#identifier-value) ]]

For pseudo-elements, an optional class attribute which will be baked into the html node.

`container`  [[ [{{identifier}}](http://dev.w3.org/csswg/css-values-3/#identifier-value) ]]

For pseudo-elements, an optional element type for the node baked into the html.

`data-*`

`attr-*`

For pseudo-elements, attributes for the node baked into the html.

`content`

Set an element's text to generated content.

`sort-by`

`counter-reset`

`counter-increment`

Functions:

`Attr`

`String`

`Content`

`Counter`

`Pending`

`Nodes`

`First-letter`

`uuid`

Pseudo-classes:

`:pass`

`:deferred`

Pseudo-selectors:

`::before`

`::after`

`::outside`

# AUTHORING RECIPES

Now is a good time to consult the cnx-recipes rulesets [README](https://github.com/Connexions/cnx-recipes/tree/master/rulesets).

The Recipes are compiled using a CSS preprocessor called [SASS](http://sass-lang.com/guide).

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?

# DOCUMENTATION TODO

The following areas need authors for documentation:

* Server-side aspects of CTE. What servers do what, how do servers make use of rulesets, how are things stored and shared internally between servers/applications, etc.

* TEA content, servers, etc.

* Recipes.

* Cnx-easybake -- we need algorithm/implementation details.
