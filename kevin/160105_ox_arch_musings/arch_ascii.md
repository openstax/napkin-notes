```

                FE
                 |
        +--------+--------+       HTTP (websockets?)
        |        |        |
      API_1    API_2 ... API_N    API ENPOINTS (Rails, etc.)
        |        |        |
        ===================
        MESSAGING BACKBONE        Kafka; versioned schema messages (JSON?)
        ===================
        |        |        |
       S_1      S_2  ... S_M      SERVICES:
               |   |                independently
DEV_1   x      |   |                  - scheduled
               |   |                  - developed
DEV_2          | x |                  - tested
               |   |                  - released
DEV_3   x      |   |      x           - versioned
               |   |                  - scaled
QA_1    x      |   |                  - monitored
               |   |                  - repoed(?)
QA_2           | x |                  - BLAMmable
               |   |
SH_1    x      |   |
               |   |
SH_2           | x |      x
               |   |
DO_1           | x |
               |   |
                S_2
                TEAM
```
