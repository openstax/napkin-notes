

### Client configures CLUEs

### Precomputed CLUE Retrieval

### Endpoint

`HTTP GET /knowledge/precomputed_clue`

#### Input Body

Schema:

```json
{
    "$schema": "http://json-schema.org/schema#",
    "title": "precomputed clue retrieval input schema",
    "definitions": {
        "uuid": {
            "type": "string",
            "pattern": "^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$"
            },
            "precomputed_clue_id": {
                "$ref": "#/definitions/uuid"
        }
    },
    "type": "object",
    "properties": {
        "precomputed_clue_ids": {
            "type": "array",
            "items": {
                "$ref": "#/definitions/precomputed_clue_id"
            },
            "minItems": 1
        }
    },
    "additionalProperties": false
}
```

Valid examples:

```json
{
    "precomputed_clue_ids": [
        "535f7f86-4733-4681-98b9-82ee31420e98"
    ],
}
```

```json
{
    "precomputed_clue_ids": [
        "5f6ccc7b-35b2-4871-9b18-57cc77aae676",
        "668238b1-7341-41e9-ab43-659f107113d9",
        "535f7f86-4733-4681-98b9-82ee31420e98"
    ],
}
```

Invalid examples:

```json
{
    "precomputed_clue_pool_ids": [
    ],
}
```

#### Output Body

Schema:

```json
{
    "$schema": "http://json-schema.org/schema#",
    "title": "precomputed clue retrieval output schema",
    "definitions": {
        "uuid": {
            "type": "string",
            "pattern": "^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$"
        },
        "precomputed_clue_id": {
            "$ref": "#/definitions/uuid"
        },
        "value_zero_to_one": {
            "type": "number",
            "minimum": 0.0,
            "maximum": 1.0
        },
        "clue": {
            "type": "object",
            "properties": {
                "aggregate": {
                    "$ref": "#/definitions/value_zero_to_one"
                },
                "confidence": {
                    "type": "object",
                    "properties": {
                        "left": {
                            "$ref": "#/definitions/value_zero_to_one"
                        },
                        "right": {
                            "$ref": "#/definitions/value_zero_to_one"
                        },
                        "sample_size": {
                            "type": "integer"
                        },
                        "unique_learner_count": {
                            "type": "integer"
                        }
                    },
                    "required": [
                        "left",
                        "right",
                        "sample_size",
                        "unique_learner_count"
                    ]
                },
                "interpretation": {
                    "type": "object",
                    "properties": {
                        "confidence": {
                            "enum": [
                                "good",
                                "bad"
                            ]
                        },
                        "level": {
                            "enum": [
                                "low",
                                "medium",
                                "high"
                            ]
                        },
                        "threshold": {
                            "enum": [
                                "above",
                                "below",
                            ]
                        }
                    },
                    "required": [
                        "confidence",
                        "level",
                        "threshold"
                    ]
                }
            },
            "required": [
                "aggregate",
                "confidence",
                "interpretation"
            ]
        }
    },
    "type": "object",
    "properties": {
        "precomputed_clues": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "precomputed_clue_id": {
                        "$ref": "#/definitions/precomputed_clue_id"
                    },
                    "clue": {
                        "$ref": "#/definitions/clue"
                    }
                },
                "required": [
                    "precomputed_clue_id",
                    "clue"
                ]
            },
            "minItems": 1
        },
        "errors":{
            "items":{
                "type":"string"
                },
                "type":"array"
            },
        "message":{
            "description":"Descriptive message representing the status of the call.",
            "type":"string"
        }
    },
    "required": ["precomputed_clues"],
    "additionalProperties": false,
}
```

Valid examples:

```json
{
    "precomputed_clues": [
        {
          "precomputed_clue_id": "5f6ccc7b-35b2-4871-9b18-57cc77aae676",
          "clue": {
                "aggregate": 0.85,
                "confidence": {
                    "left": 0.51,
                    "right": 0.95,
                    "sample_size": 6,
                    "unique_learner_count": 4
                },
                "interpretation": {
                    "confidence": "good",
                    "level": "medium",
                    "threshold": "below"
                }
          }
        }
    ]
}
```

Invalid examples:

```json
{
    "precomputed_clues": [
    ]
}
```
