Consider:
```
N = number of learners  = 1,000,000 (10^6)
K = number of concepts  =     1,000 (10^3)
Q = number of questions =    10,000 (10^4)
B = number of books     =        10 (really it's more like 5 but this makes the math easier)
```

Assuming any `learner`
can potentially answer any `question`
from any `book`,
here are the approximate sizes
of various `sparfa` matrices:
```
C = KxN = 10^3 * 10^6 * 10 = 10^10 bytes =  10GB (student conceptual mastery)
W = KxQ = 10^3 * 10^4 * 10 = 10^7  bytes =  10MB (question conceptual content)
S = QxN = 10^4 * 10^6 * 10 = 10^11 bytes = 100GB (scorecard/gradebook)
```
The vast majority (>90%)
of the entries in these matrices
will be zeros.

If we divide up all the data by `book`, 
we can divide all the values above
by a factor of 100:
```
C = 100MB
W = 100kB
S = 1GB
```
There is a good chance
that these matrices will be pretty sparse,
but (except for W) probably not 90% sparse...

In addition to the memory savings,
the division by `book`
provides a natural seam for parallelization.
