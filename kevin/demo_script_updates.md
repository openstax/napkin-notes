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

We want to be able to specify the `scenario` name
and import 'phase' (currently `content`, `tasks`, or `work`)
one the ansible command line
for maximum convenience.

This parameter would need to work its way all the way to the server-side `demo` script.

We will likely want to allow `demo` to be its own import 'phase'
so that we can update the scenarios
without re-deplaying all of `Tutor`.

## Ecosystem Support

The `demo` script should be adjusted to handle fully-specified `Ecosystem` imports,
using timestamps and/or exercise manifests,
as well as `Course` `Ecosystem` histories,
including the ability to associate `Readings` and `Homeworks` to specific `Ecosystems`.

## School vs Regular Dates

`ContentConfigurationYamlMethod` helpers like `open_two_days_ago` should be split into:

* `open_two_days_ago`
* `open_two_school_days_ago`

to avoid confusion about hidden date adjustments that affect only certain `scenario` types.

## Additional Date Helpers

There should be additional `ContentConfigurationYamlMethod`:

* `open_n_days_ago(n)`
* `open_n_days_from_now(n)`
* `due_n_days_ago(n)`
* `due_n_days_from_now(n)`

and convenience methods for specific `n` should be defined in terms of these.

Care should be taken to account for timezones and other `Course`- or `User`- specific time settings.

As an alternative to the date helpers, `opens_at` and `due_at` helpers could be created that would output yaml text.  For instance: `<%= due_at 4.days.ago %>` would output call `school_day_on_or_before` internally and then output "due_at: YYY-MM-DD" into the yaml.

This would allow assignments to be specified as:
```yaml
    title: Read stuffs
    periods:
      - id: p1
        <%= opens_at 1.week.ago %>
        <%= due_at 2.days.from_now %>
        students: {...}
```

## HW Description Updates

The fields for `Homework` assignments need to include:

* `teacher_selected_exercise_count`
* `tutor_selected_exercise_count`

to allow each assignment to have a deterministic (and known) number of personalized and/or spaced practice exercises.

## People Validations

We should validate that two different people don't share the same handle (as is the case with `cm` currently).

This could be done by simply separating the list of users from their roles in the system.

## Parallelization of Tasks

Since this is `rake`, we could take advantage of parallel tasks and automatic dependency management.

For example, `Ecosystems` could be imported in parallel.  `Tasks` could be published and/or worked in parallel if `Timecop` allows it.  Some adjustments to `Tutor` might be needed to fully realize this.

## Split Script into 'Step Generation' and 'Step Execution' Phases?

(This is super hot-off-the-press, but...)

It seems like it'd be a lot easier to test the `demo` script
if we could separate what the setup code does
(content `.yml` into `Tutor` actions)
from what the action code does
(execute `Tutor` actions).

If we combined this with Parallelization of Tasks, we could see a significant speed improvement.

## Test Coverage

Maybe we should test all this stuff?

## Specific Bugs

```
Remove full name from rake script so it matches new courses 
Dante says: https://github.com/openstax/tutor-server/blob/master/lib/tasks/demo/demo_base.rb#L146 remove full_name from the line above
```

```
Fix bug where it does not answer personalized questions 
Dante says: to work the personalized, I think you just need a task.reload before https://github.com/openstax/tutor-server/blob/master/lib/tasks/demo/demo_base.rb#L276
```
