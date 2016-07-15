# Global Requirements
This document's aim is to identify needs and requirements from all the Openstax products that are using a common html file and common CSS styling

### General needs

As a **student/instructor** I want the different formats (webview, epub, pdf, tutor) to be similar enough to do my homework and reading assignments easily.

As **Openstax** I want the styling to be similar so there is brand identity and a consistent "look and feel" within the constraints of the various digital formats.

As a **developer** I want the code to be easily approachable and efficiently accessed/modified by all teams so I can make changes faster.

# Product Specific

## PDF styles/framework

### Maintenance

As a **developer** I want the code to scale to multiple books so adding a new book is simple.

As a **developer** I want to easily refactor the code so it can evolve over time (need refactor usecases).

As a **developer** I want code consistency by other developers so the code is easier to understand.

As a **developer** I want future development (new features, refactor, new designs) to be easy to maintain.

As a **developer** I want changes in data structure to be relatively easy so that we can add formats or features easily.

As a **developer** I want the code to be well documented and organized so bug fixing is easier.

As *OpenStax* I want to make sure people cannot create infinite loops
  - _(CSS by itself is NOT turing complete)_
  - _(something about running untrusted code and whatnot)_


### Ease of use

As a **developer** I want a clear file structure and logic pathways to reduce time wasted figuring out what does what and what is where.

As a **developer** I want easy access to PDF-specific needs (pagination/folio) so testing is quicker.

As a **tester** I want minimal regression-testing so code-changes do not impact more books than necessary.

### Fast creation

As a **developer** I want code to not be duplicated so there is less code to support.

As a **developer** I want code to be reusable/modular so creating/updating templates is easier.

As a **developer** I want to add new features easily because that is where the majority of my time is spent.


# General philosophy/concepts

## For cleaner/better code
  - never override an CSS declaration
  - keep our mixins simple, you shouldn't need a map and two days to find where that mixin was created
  - from general to specific, keeping it as generic as possible

## For an ideal slots/skeleton framework
  - we add, we never remove (avoid regression testing)
  - the framework is versioned, as with an API
  - developers should never have to look at the skeleton

---

# Phil's Stories

# CSS Stories

As a **new Developer** I want to...

1. know how to make my first contribution so I can contribute quickly


As a **Developer** I want to...

1. change files and run tests easily so I am confident I didn't break anything with my change
  - _(naive styling test: pixel-compare each PDF (just needs to verify nothing changed) )_
  - _(naive collation test: generate the HTML & diff)_
1. take an existing book and quickly add a new "feature"
1. take an existing book and change some collation to make a new book
1. quickly make a new book from scratch
1. generate HTML from parts of books or entire books (with caching a-la-makefile) easily from the commandline
1. have "unit tests" for the CSS files so I don't have to generate the whole book
  - _(also acts as "runnable documentation")_
1. have a validation structure that I can rely on to prevent me from producing/committing unusable code
 - _(ruleset validation against cnx-epub  publishing)_
1. maintain as little documentation as possible because keeping documentation in sync is error-prone
  - _(including scripts to generate the HTML, installing dependencies, etc. (ie [Runnable Documentation](http://githubengineering.com/runnable-documentation/)) )_
1. associate the CSS files for books with the code somewhere in GitHub and keep them in sync
  - _(:cake: commit hooks which republish?)_
1. an option to add debugging information to the output to see where things came from
  - _(:cake: including sourcemap into the CSS file maybe :smile:)_
1. have the passes to be abstracted away because most of those will not change frequently
1. write simple CSS as long as I know what the mixins are and create few (if any) of my own mixins.
  - (:thought_balloon: The analysis done by kerwin+derek(?) should contain all the mixins)


As an **External user** I want to...

1. easily tweak the default numbering/collation for my book because I may want to refer to things differently


As a **Translator** I want to...

1. easily change strings and numbering because languages have different conventions
1. easily change LTR to RTL


As **openstax** I want to...

1. have strings & numbering to work in multiple languages because a lot of the content is not in english
1. have a default numbering/collation for non-openstax books
  - _(maybe also affects the cnxml2html conversion for things like exercises (they'll need to not lose some metadata))_


# HTML Stories

- As an **External user** I want the cooked HTML format to "look reasonable" without having CSS because my LMS may not support custom CSS
- As **openstax** I want to have an editable raw format that does not contain human-repeated text or non-structural elements because keeping them in-sync is difficult


# Documentation-generation Links

1. http://list.ly/list/IkE-auto-generate-css-reference-documentation suggestions for generating documentation
1. http://primercss.io/ and https://github.com/primer/primer
 1. Actual example: http://primercss.io/buttons/ and https://github.com/primer/buttons (not suggesting separate repos but am suggesting some doc-generation)
1. https://github.com/primer/stylelint-config-primer
1. http://warpspire.com/kss/styleguides/ "Living" documentation
1. https://github.com/ericponto/jekyll-dss
1. http://sassdoc.com/
1. https://inch-ci.org/github/sass/sass (CI for documentation)
