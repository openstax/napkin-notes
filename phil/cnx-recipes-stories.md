These are organized into 3 areas: Documentation, Design (cognitive load), and Debugging.

# Documentation

## As a developer I want documentation for Tools/Workflow used in cnx-recipes so I can quickly perform common tasks

Common tasks:

- fetching a book(s) from a server
- baking a book(s) locally
- baking a book(s) on the server
- seeing what changed in the baked book as a result of recipe changes
- how to debug things when they go wrong (ie telling easybake to only run a subset of passes and then output)


## As a developer I want documentation for extensions to CSS

This provides a quick way to look up which CSS declarations are available and how to use them. Similar to http://www.princexml.com/doc/properties/

Features:

- selectors (`:pass`, `::outside`, `::deferred`, `::before`, `::after`, `:match(^[a-zA-Z])`, ...)
- declarations (`attr-*: val;`, `class: name;`, `content: val;`, `container: div;`, `move-to: bucketName;`, `copy-to: bucketName;`, `string-set: name val;`, `group-by: "span::attr(sortKey)";`, ...)
- functions (`target-counter(...)`, `pending(bucketName)`, `content()`, `string(name)`, ...)


## As a developer I want documentation for general recipe structure/mixins so I know how to tweak an existing recipe or write one from scratch

This includes a high-level description of how the recipes work, an explanation of the passes and dependencies between all the mixins.


## As a developer I want documentation for common design patterns used to I can quickly recognize these patterns

An example would be: using `:deferred` to construct strings that are then passed elsewhere or relying on execution order and using `::after` to construct/copy elements



## As a developer I want documentation for recipe scss/css files so I can read to understand why mixins and files are organized the way they are

This would include adding sassdoc comments on mixins describing what they depend on and how they work as well as inline comments about why a possibly-confusing approach was used.


# Design (cognitive load)

## As a CSS developer I want recipes to "be more like CSS" (CSS selectivity and cascading) so I can reason about what is going on

The current rulesets are very programmer-focused, relying on keeping the state of the baking process in one's head and having to know about things like execution order.
Phil thinks that an expectation from CSS developers is that the rulesets operate much like CSS on a webpage (very little state is needed to keep in one's brain).

Also, most languages come with a debugger but CSS+ does not, which makes it difficult to reason about what is happening.
This results in very long wait times to bake a book and then infer what happened by slowly looking through an entire baked book to see what happened.


## As a CSS developer I want less state to maintain in my head so I do not become scared of making changes

The CSS output from rulesets are like reading assembly code and trying to infer what is happening.
A large source of this is from having multiple passes and buckets that get filled and emptied.
Another source of this is not having Debugging tools to see the state of execution at some point.


## As a maintainer reduce rulesets to a set of configuration options

oer.exports suffers from bit-rot; old books are rarely touched and new advances/code-structure is not "backported" to those books, making them even more fragile.


# Debugging

## As a developer I want to print messages to the console so I can see what is happening

All programming languages have this feature; it is **the** go-to tool for debugging, especially in the absence of a debugger.

`cnx-easybake` currently prints out a log of everything that happens but that is useful for debugging easybake, not a ruleset.
It is extremely useful for a developer to choose what messages to print and when.


## As a developer I want to print the state of the executing program so I can see what is happening

`cnx-easybake` maintains a lot of state (DOM, counters, string, pending buckets) and in the absence of a debugger (and setting breakpoints)
allowing the developer to dump the state is the closest approximation possible.

To do this, easybake would have to print out an annotated DOM which shows the values of the state for various elements.


## As a developer I want unit tests to make sure I did not break anything

The current strategy seems to be "use the book" but this is a time-consuming process.

The styleguide comes a long way (and solves additional use-cases which makes it more likely to be maintained) but there should be a place/way for other unit tests to be included.


## As a developer I want baking to be faster so I do not have to pause working for 10 minutes and wait to see results

Currently it takes 10 minutes to rebake a book like physics. This makes developing the book very time-consuming because the developer is waiting to see if their code change worked.

This story could be addressed by other stories in this epic like (less-state/reduce-passes, or unit tests)


## As a developer I want a debugger/inspector so I can step through the code and see which rules are being applied

Browsers offer these tools (JS debugger, style inspector) and this sort-of works for the first pass but does not work for seeing what is happening in subsequent passes over the document.


## As a developer I want tests to start with CNXML instead of raw HTML

Currently, editing the cnxml->html conversion is done in a bubble and there is no good way to see if those changes actually fix a book.

The process also takes many steps:

1. edit rhaptos.cnxmlutils
1. push the changes up to a server (developers do not know how or may not have access)
1. find all the modules in a book
1. re-publish all the modules in the book
1. run the build-single-page-epub-thingy script on the server (which talks directly to the database)
1. copy the built-single-page HTML file back locally
1. bake the book locally and see if the XSLT changes fixed the problem

If several of these steps could be done locally then it would greatly increase the confidence of cnxml->html changes.


## As a developer I want to easily edit rhaptos.cnxmlutils and easybake and start up a debugger so I can fix bugs in those repositories

This may just require documentation and making sure the baking scripts will start up a debugger.
