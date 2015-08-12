# The Algorithm

At the moment of publication for the current assignment:

1. fetch all published assignments of the current assignment's type (`homework`, `reading`)
1. exclude all assignments that are not open before the current assignment (even the current assignment)
1. sort the remaining assignments by due date (ascending)
  1. ties are broken by publication time (ascending)
1. append the current assignment
1. reverse the resulting list

# Examples

```
pub     assgn          k-ago
order   dates          history
1:      -----          1
2:        -----        2 1
3:          -----      3 2 1
```

```
pub     assgn          k-ago
order   dates          history
1:      -----          1
2:          -----      2 1
3:        -----        3 1
4:            -----    4 2 3 1
```

```
pub     assgn          k-ago
order   dates          history
1:      -----          1
2:        -----        2 1
3:        -----        3 1
4:        -----        4 1
```
