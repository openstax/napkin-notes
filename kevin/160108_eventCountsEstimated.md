Assuming:
* 10 clicks per minute/user
* 120 minutes/user/day
* all users are in mainland US timezones
* almost all users will use the system at some point in the evening (5-10pm)
* total of 500,000 users


The breakdown of population by timezone in the US is:
```
  Eastern   47%
  Central   33%
  Mountain   6%
  Pacific   14%
```
Assuming that the number of users will be broken down accordingly,
and those users use the system uniformly
during evening hours (5-10pm) in each timezone (approx):
```
EST   5-6   6-7   7-8   8-9   9-10
CST         5-6   6-7   7-8    8-9    9-10
MST               5-6   6-7    7-8     8-9   9-10
PST                     5-6    6-7     7-8    8-9   9-10
     ---------------------------------------------------
     0.10  0.16  0.21   0.20  0.20    0.11   0.04   0.03
                        <-------->
                         peak load
```
So at peak usage,
about 20% of all users will be using the system.


