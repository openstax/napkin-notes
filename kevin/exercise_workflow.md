## Background

This applies only to normal exercises - we're ignoring recovery questions,
refresh my memory, etc.  But maybe they follow the same pattern.

## Abbreviations

Abbrev  | Meaning
--------|--------
AT(PD?) | Assignment Type (Past Due?)
IR      | IReading
PW      | Practice Widget
HW      | Homework
FRA?    | Free Response Answered?
MCA?    | Multiple Choice Answered?
IS      | Initial Screen
FR?     | Free Response Screen Shown?
MC?     | Multiple Choice Screen Shown?
FB?     | Feedback Screen Shown?
\*      | Y or N (doesn't matter)

## Das Rules

AT(PD?)             | FRA? | MCA? | IS | FR? | MC? | FB?
--------------------|------|------|----|-----|-----|----
IR(\*),PW(\*),HW(Y) |   n  |  n   | FR |  y  |  y  |  y
                    |   y  |  n   | MC |  -  |  y  |  y
                    |   y  |  y   | FB |  -  |  -  |  y
      HW(N)         |   n  |  n   | FR |  y  |  y  |  -
                    |   y  |  n   | MC |  -  |  y  |  -
                    |   y  |  y   | MC |  -  |  y  |  -


