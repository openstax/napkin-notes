```
data = request(client_instance_uuid, client_assigned_xfer_uuid, previous_server_assigned_xfer_uuid=nil)
```
| client instance uuid | client-assigned xfer uuid | previous server-assigned xfer uuid | result |
|       :---:          |            :---:          |            :---:                   | :---   |
|        new           |            new            |            nil                     | new xfer from beginning |
|        new           |            old            |            *                       | error |
|        old           |            old            |        same as before              | resend previous xfer |
|        old           |            old            |     not same as before             | error |
|        old           |            new            |            nil                     | new xfer from beginning |
|        old           |            new            |            old                     | new xfer from appropriate offset |
|        old           |            new            |            new                     | error |


|              |  prev server req id nil  |  prev server req id == non-latest  |  prev server req id == latest |
|     ---      |          :---:           |                :---:               |          :---:                |
|**new app id**| new xfer from beginning  | ERROR                              | ERROR                         |
|**old app id**| resend last xfer         | resend appropriate xfer            | new xfer from last offset     |
