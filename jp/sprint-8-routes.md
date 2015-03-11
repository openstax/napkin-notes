GET /api/courses/42/readings

  {
    "id":1,
    "title":"Chapter 1",
    "type":"part",
    "children": [
      {
        "id":2,
        "title":"Other chapter 1",
        "type":"part",
        "children": [
          {
            "id":1,
            "title":"Physical Quantities and Units",
            "type":"page"
          },
          {
            "id":2,
            "title":"Accuracy, Precision, and Significant Figures",
            "type":"page"
          }
        ]
      }
    ]
  }

GET /api/courses/42/plans/123

PATCH /api/courses/42/plans/123

GET /api/courses/42/plans

POST /api/courses/42/plans

POST /api/courses/42/plans/23/publish
