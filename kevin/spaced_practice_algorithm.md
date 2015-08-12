# The Algorithm

At the moment of publication for the current assignment:

1. fetch all published assignments of the current assignment's type (`homework`, `reading`)
1. exclude all assignments that are not open before the current assignment (even the current assignment)
1. sort the remaining assignments by due date (ascending)
  1. ties are broken by publication time (ascending)
1. append the current assignment
1. reverse the resulting list

# Examples

In these examples, the `k-ago history` shows which assignment occupies the kth-ago slot, starting with k=0 (the current assignment).

A normal assignment sequence:
```
pub     assgn          k-ago
order   dates          history
1:      -----          1
2:        -----        2 1
3:          -----      3 2 1
```

Assignments published out of chronological order:
```
pub     assgn          k-ago
order   dates          history
1:      -----          1
2:          -----      2 1
3:        -----        3 1
4:            -----    4 2 3 1
```

Multiple new assignments with same start dates:
```
pub     assgn          k-ago
order   dates          history
1:      -----          1
2:        -----        2 1
3:        ---          3 1
4:        -----        4 1
```

Past assignments with identical start and due dates:
```
pub     assgn          k-ago
order   dates          history
1:      -----          1
2:        -----        2 1
3:        -----        3 1
4:          -----      4 3 2 1
```

Past assignments with identical start dates but differing due dates:
```
pub     assgn          k-ago
order   dates          history
1:      -----          1
2:        -----        2 1
3:        ----         3 1
4:          -----      4 2 3 1
```

One assignment spanned by another:
```
pub     assgn          k-ago
order   dates          history
1:      ---------      1
2:        -----        2 1
3:          -------    3 1 2
```
