Comparison of time taken to validate a `Response` request against its JSON schema,
using `json-schema` (ruby) and `jsonschema` (python) libraries.

My `Biglearn` architecture should normally operate 
in the 1-10 responses/request/client range,
meaning that ruby processes _should_ be pretty much okay 
and that python processes won't care.

The table makes it clear that many small requests
will have much less latency
than fewer larger requests. 

| *# responses* | *ruby* [sec]     | *python* [sec]    |
| ---:          | ---:      | ---:     |
|     1         |  0.006    |  --      |
|    10         |  0.021    |  0.003   |
|   100         |  0.195    |  0.018   |
|  1000         |  2.131    |  0.163   |
| 10000         | 19.840    |  1.622   |

I also ran experiments for `Ecosystem` messages.

For pathelogically large `ecosystems`,
it took ~60sec for the ruby validation,
and ~6sec for the python validation.
Despite these times being quite large,
`ecosystem`-related messages are relatively rare
and processed via a different stream then `response` messages.
So I think everything should be okay...
