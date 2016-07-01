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

As a **developer** I want to retain control over the evolution of the codebase over time _(PHILS: I am not sure what is meant by this)_

As a **developer** I want code consistency by other developers so the code is easier to understand.

As a **developer** I want future development (new features, refactor, new designs) to be easy to maintain.

As a **developer** I want changes in data structure to be relatively easy so that we can add formats or features easily.


### Ease of use

As a **developer** I want a clear file structure and logic pathways to reduce time wasted figuring out what does what and what is where.

As a **developer** I want easy access to PDF-specific needs (pagination/folio) so testing is quicker.

As a **tester** I want minimal regression-testing so code-changes do not impact more books than necessary.

### Fast creation

As a **developer** I want code to not be duplicated so there is less code to support.

As a **developer** I want code to be reusable/modular so creating/updating templates is easier.

As a **developer** I want to add new features easily because that is where the majority of my time is spent.

As a **developer** I want to fix bugs quickly _(PHIL: This item seems to list a problem but is missing a solution)


# General philosophy/concepts

## For cleaner/better code
  - never override an CSS declaration
  - keep our mixins simple, you shouldn't need a map and two days to find where that mixin was created  
  - from general to specific, keeping it as generic as possible

## For an ideal slots/skeleton framework
  - we add, we never remove (avoid regression testing)
  - the framework is versioned, as with an API
  - developers should never have to look at the skeleton
