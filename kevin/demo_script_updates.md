## Rename the Script?

For reasons that will become clear throughout this document,
the `demo` script has (and/or will) become a tool used for much more than demo setup.

## Scenario-Based Organization

We should reorganize the `.yml` files into `scenarios`.
These scenarios will assume a clean install, and build up:

* users
* admins
* ecosystems
* courses
  * name, district, school, etc.
  * teachers
  * ecosystem history
  * periods
    * students
  * assignments
    * homework
      * ecosystem
      * covered pages
      * number of teacher-selected exercises
      * number of tutor-selected exercises
      * open date
      * due date
      * publish date
      * student performances
    * reading
      * ecosystem
      * covered pages
      * open date
      * due date
      * publish date
      * student performances

There are probably more things that need to be specified (e.g., exercise manifests).

It is likely that we'll want one subdirectory per `scenario`,
with the subdirectory name being the scenario name and a `scenario.yml` file as the top-level entry point:

```
  demo/scenarios/demo/scenario.yml
  demo/scenarios/spaced_practice1/scenario.yml
  demo/scenarios/qa1/scenario.yml
```

The `scenario.yml` files could potentially include other files
in the same directory
if that turns out to be a convenient way to organize the data.

## Ansible Integration

## Ecosystem Support

## School vs Regular Dates

## Additional Date Helpers

## HW Description Updates

## People Validations

## Parallelization of Tasks

## Test Coverage
