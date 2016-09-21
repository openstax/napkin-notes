## Creating an Ecosystem

Because all `courses` must have an associated `ecosystem`,
`Tutor` must create at least one `ecosystem`
before creating any `courses`.

An `ecosystem` consists of:
* an `ecosystem uuid` that identifies the given `ecosystem`
* a `book` attribute describing:
  * the `CNX uuid` and `CNX version` of the book (for reference) 
  * the `subject partitions` for the book
  * the contents of the book:
    *  nested `book containers` (units, chapters, page-modules, etc.)
    *  `exercise pools` associated with each `book container`
* `exercise` metadata for all exercises in the `book`
  * the `exercise uuid` that uniquely describes the `exercise`
  * the `Exercises uuid` and `Exercises version` (to allow `Biglearn` to deal with divergence as it sees fit)
  * the `los` associated with the `exercise` (these act as hints to `SPARFA`)

When `Tutor` tells `Biglearn` about a new `ecosystem`,
`Biglearn` will acknowledge the `ecosystem`
and mark its status as `processing`.
Once `SPARFA` computes the initial `W` and `d` matrices for the `ecosystem` (which could take several minutes),
`Biglearn` will update the `ecosystem`'s status to `ready`,
indicating to `Tutor` that the `ecosystem` can be assigned to a `course`.

Reference links:
* request and response schemas for the `ecosystem` creation endpoint
* request and response schemas for the `ecosystem` status query endpoint

## Creating a Course

## Updating the Course Roster

## Creating/Updating Assignments

## Working Assignments

### Spaced Practice Exercises

### Personalized Exercises

## Performance Forecast

### Student

### Teacher

## Practice Widget

### Practice a Specific Topic

### Practice Worst Topics

## Updating a Course's Ecosystem

