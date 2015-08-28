## Needed Features

At the very least, admins need to be able to:

* add new students to a period
* move existing student between periods
* delete unopened assignment
* issue assignment to student

## Going-in Approach

I envision a table.

On the horizontal axis would be assignments (per period).
On the vertical axis would be students (all, not per period).
Each cell is a checkbox.

There would also be two buttons: `assign` and `delete`.

The admin would check the appropriate boxes and then the action, and it would happen.

There are many ways the UI could be tweaked to make it more usable,
and I leave those as implementation details.  Some ideas are:
* filter students by selecting them
* filter assignments by selecting them
* conveniences for selecting all/ranges of buttons

It is also important to note that,
at least for now,
open assignments cannot be deleted.

## When We Want It

Soon.

On/Before | Would be...
----------|------------
9/8       | great
9/14      | pretty ok
later     | meh...
