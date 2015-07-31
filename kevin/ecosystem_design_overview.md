
## Schema
```
Ecosystem
  | 1
  |
  | 1
Book
  | 1
  |
  | 1..*
Chapter
  | 1
  |
  | *
Page -----------+----------+---- ... ----+
  | 1..*        | 1        | 1           | 1
  |             |          |             |
  | *           | *        | *           | *
 Lo          HwCoreEx   HwDynEx  ...   OtherPools
  | 1..*        | 1        | 1           | 1
  |             |          |             |
  | *           | 1        | 1           | 1
Exercise -------+----------+---- ... ----+
  | 1..*
  |
  | *
Tag

NOT SHOWN:
  - Pages could have pre-computed Fragments
  - Fragments could (in some cases) have their own Exercise pools
```
