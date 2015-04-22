# Class summaries for assignments

Current, stats are shown in the `GET /api/plans/:id` route when the plan is published. I propose,
instead, to display stats only in the `GET /api/plans/:id/events` (calendar route, being worked
on elsewhere), as well as in a new `GET /api/plans/:id/review` route. That way, we separate the
route for reading the plan settings and the route for viewing the stats. This also makes it so
the FE has to call only one route per page displayed.

The events route will be called from the calendar. It will contain the output of the
CalculateTaskPlanStats routine. The review route will be called from the class summary for an
assignment and will contain the output of CalculateTaskPlanStats routine, augmented to also
include how many students picked each multiple choice answer (for each exercise).

`GET /api/plans/:id/review`
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
                "id": {
                    "type": "integer"
                },
                "title": {
                    "type": "string"
                },
                "mean_grade_percent": {
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
                "exercises": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/exerciseStepStatistics"
                    }
                },
                "previous_attempt": {
                    "$ref": "#/definitions/pageTaskStatistics"
                }
            },
            "additionalProperties": false
        },
        "exerciseStepStatistics": {
            "type": "object",
            "properties": {
                "content_html": {
                    "type": "string"
                },
                "answered_count": {
                    "type": "integer"
                },
                "answers": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/answerStatistics"
                    }
                }
            },
            "additionalProperties": false
        },
        "answerStatistics": {
            "type": "object",
            "properties": {
                "content_html": {
                    "type": "string"
                },
                "correct": {
                    "type": "boolean",
                    "_comment": "Alternatively, correctness or credit with type: number"
                },
                "selected_count": {
                    "type": "integer"
                }
            },
            "additionalProperties": false
        }
    }
}
```

Here's the old stats schema for comparison purposes:

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
                "mean_grade_percent": {
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

