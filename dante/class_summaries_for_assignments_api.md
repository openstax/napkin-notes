# Class summaries for assignments

Current, stats are shown in the `GET /api/plans/:id` route when the plan is published.
I propose, instead, to display stats only in a `GET /api/plans/:id/stats` route.
That way, we separate the route for reading the plan and the route for viewing the stats.
This also makes it so the FE has to call only one route (the stats route)
in order to display the class summary pages.
The stats route will be called from the calendar and from the class summary pages.
It will contain the output of the CalculateTaskPlanStats routine,
augmented to also include how many students picked each multiple choice answer,
as well as the "big movers", "struggling" and "getting it" students.

`GET /api/plans/:id/stats`
```JSON
{
    "type": "object",
    "properties": {
        "course": {
            "$ref": "#/definitions/taskPlanPeriodStats"
        },
        "periods": {
            "type": "array",
            "items": {
                "$ref": "#/definitions/taskPlanPeriodStats"
            }
        }
    },
    "additionalProperties": false,
    "definitions": {
        "taskPlanPeriodStats": {
            "type": "object",
            "properties": {
                "mean_grade_percentage": {
                    "type": "integer",
                    "minimum": 0,
                    "maximum": 100
                },
                "total_count": {
                    "type": "integer"
                },
                "complete_count": {
                    "type": "integer"
                },
                "partially_complete_count": {
                    "type": "integer"
                },
                "period": {
                    "type": "object",
                    "properties": {
                        "id": {
                            "type": "integer"
                        },
                        "title": {
                            "type": "string"
                        }
                    },
                    "additionalProperties": false
                },
                "current_pages": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/pageTaskStatistics"
                    }
                },
                "spaced_pages": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/pageTaskStatistics"
                    }
                }
            },
            "additionalProperties": false
        },
        "pageTaskStatistics": {
            "type": "object",
            "properties": {
                "page": {
                    "type": "object",
                    "properties": {
                        "id": {
                            "type": "integer"
                        },
                        "number": {
                            "type": "string"
                        },
                        "title": {
                            "type": "string"
                        }
                    },
                    "additionalProperties": false
                },
                "student_count": {
                    "type": "integer"
                },
                "correct_count": {
                    "type": "integer"
                },
                "incorrect_count": {
                    "type": "integer"
                },
                "previous_attempt": {
                    "$ref": "#/definitions/pageTaskStatistics"
                }
            },
            "additionalProperties": false
        }
    }
}
```

Here's the current schema for comparison purposes:

```JSON
{
    "type": "object",
    "properties": {
        "course": {
            "$ref": "#/definitions/taskPlanPeriodStats"
        },
        "periods": {
            "type": "array",
            "items": {
                "$ref": "#/definitions/taskPlanPeriodStats"
            }
        }
    },
    "additionalProperties": false,
    "definitions": {
        "taskPlanPeriodStats": {
            "type": "object",
            "properties": {
                "mean_grade_percentage": {
                    "type": "integer",
                    "minimum": 0,
                    "maximum": 100
                },
                "total_count": {
                    "type": "integer"
                },
                "complete_count": {
                    "type": "integer"
                },
                "partially_complete_count": {
                    "type": "integer"
                },
                "period": {
                    "type": "object",
                    "properties": {
                        "id": {
                            "type": "integer"
                        },
                        "title": {
                            "type": "string"
                        }
                    },
                    "additionalProperties": false
                },
                "current_pages": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/pageTaskStatistics"
                    }
                },
                "spaced_pages": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/pageTaskStatistics"
                    }
                }
            },
            "additionalProperties": false
        },
        "pageTaskStatistics": {
            "type": "object",
            "properties": {
                "page": {
                    "type": "object",
                    "properties": {
                        "id": {
                            "type": "integer"
                        },
                        "number": {
                            "type": "string"
                        },
                        "title": {
                            "type": "string"
                        }
                    },
                    "additionalProperties": false
                },
                "student_count": {
                    "type": "integer"
                },
                "correct_count": {
                    "type": "integer"
                },
                "incorrect_count": {
                    "type": "integer"
                },
                "previous_attempt": {
                    "$ref": "#/definitions/pageTaskStatistics"
                }
            },
            "additionalProperties": false
        }
    }
}
```

