# Overview

The following schemas show the changes in the CLUE API to take into
account confidence intervals.

To get confidence intervals back, the caller must provide a `true`
value for `include_confidence_intervals` parameter.  When that
parameter is provided, the API result will contain a `confidence`
attribute for every CLUE returned.  The `left` and `right` properties
of the `confidence` attribute provide the percentage deviation on each
endpoint.


```python
#: Input schema for the get clue API.
clue_input_schema = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "title": "clue-input",
    "description": """
                   Schema for input parameters to the get clue request
                   in biglearn.
                   """,
    "type": "object",
    "properties": {
        "learners": {
            "type": "array",
            "description": """
                           learner ids to include when getting the current
                           level of understanding. The CLUE values are
                           aggregated for all of these learners.
                           """,
            "items": {
                "type": "string",
                "description": """
                               The unique id of the learner for whom the
                               questions are requested.
                               """,
                "maxLength": 255
            }
        },
        "aggregations": {
            "type": "array",
            "description": """
                           Tag queries for aggregation. CLUE aggregates
                           are presented for each of the tag queries in
                           this list.
                           """,
            "items": {
                "type": "string",
                "minItems": 1,
                "maxLength": 255,
                "description": """
                               Tag query to group the current
                               level of understanding.
                               """
            }
        },
        "include_confidence_intervals": {
            "description": """
                           If true, confidence intervals for CLUE values are
                           returned as part of the resultset.
                           """,
            "type": "boolean",
            "default": False,
         }
    },
    "additionalProperties": False,
    "required": ["learners", "aggregations"]
}

#: Output schema for the clue API.
clue_output_schema = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "title": "clue-output",
    "description": """
                   Schema of response provided by the get clue
                   request in biglearn.
                   """,
    "type": "object",
    "properties": {
        "aggregates": {
            "type": "array",
            "description": """
                           List of aggregation results for the given tag queries.
                           """,
            "items": {
                "type": "object",
                "minItems": 1,
                "description": """
                               A mapping of CLUE aggregate value with the
                               given tag query.
                               """,
                "properties": {
                    "tag_query": {
                        "description": """
                                       The tag query that represents
                                       this aggregate.
                                       """,
                        "type": "string"
                    },
                    "aggregate": {
                        "description": """
                                       The aggregated CLUE value for this tag
                                       query.  Its a value between 0 and 1,
                                       where 0 represents no understanding and
                                       1 representes complete understanding.
                                       """,
                        "type": "float",
                    },
                    "confidence": {
                        "description": """
                                       Confidence interval for the given CLUE.
                                       """,
                        "type": "object",
                        "properties": {
                            "left": {
                                "description": """
                                               The left endpoint of the confidence 
                                               interval for the given CLUE.
                                               """,
                                "type": "float"
                             },
                            "right": {
                                "description": """
                                               The right endpoint of the confidence 
                                               interval for the given CLUE.
                                               """,
                                "type": "float"
                             },
                         },
                        "required": ["left", "right"],
                        "additionalProperties": False
                     }
                }
            }
        },
        "message": {
            "type": "string",
            "description": """
                           Descriptive message representing the status
                           of the call.
                           """
        },
        "errors": {
            "type": "array",
            "items": {
                "type": "string"
            }
        }
    },
    "additionalProperties": False,
    "oneOf": [
        {
            "type": "object",
            "required": ["aggregates"]
        },
        {
            "type": "object",
            "required": ["errors"]
        }
    ]
}
```
