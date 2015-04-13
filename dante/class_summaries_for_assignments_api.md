# Class summaries for assignments

Current, stats are shown in the `GET /api/plans/:id` route when the plan is published.
I propose, instead, to display stats only in a `GET /api/plans/:id/stats` route.
That way, we separate the route for reading the plan settings and the route for viewing the stats.
This also makes it so the FE has to call only one route (the stats route)
in order to display the class summary pages.

The stats route will be called from the calendar and from the class summary pages.
It will contain the output of the CalculateTaskPlanStats routine,
augmented to also include how many students picked each multiple choice answer
(for each exercise step), as well as the "big movers", "struggling" and "getting it" students.

Alternatively, we can create the `stats` route and a `detailed_stats` route.
`stats` would display what is currently shown in `GET /api/plans/:id`, while
`detailed_stats` would display the new structure, with the fields necessary for the class summary.

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
                "exercises": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/exerciseStepStatistics"
                    }
                },
                "large_change_students": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/studentStatistics"
                    }
                },
                "low_performance_students": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/studentStatistics"
                    }
                },
                "high_performance_students": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/studentStatistics"
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
                "correct": { // Alternative: "correctness" or "credit", "type": "number"
                    "type": "boolean"
                },
                "selected_count": {
                    "type": "integer"
                }
            },
            "additionalProperties": false
        },
        "studentStatistics": {
            "type": "object",
            "properties": {
                "assignments": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/studentAssignmentStatistics"
                    }
                }
            },
            "additionalProperties": false
        },
        "studentAssignmentStatistics": {
            "type": "object",
            "properties": {
                "total_count": {
                    "type": "integer"
                },
                "correct_count": {
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

