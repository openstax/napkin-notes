# Data structures

## Exercise

same as `openstax/exercises` structure

## TaskStep

```coffee
type: "exercise"
exercise: (Exercise)
is_complete: true // PATCHable to true but not back to false
answer: ANSWER_ID
correct_answer: ANSWER_ID // only after the due_at has passed
feedback_html: ""
free_response_text: ""
recover_step: (TaskStep)

type: "reading"
type: "video"
type: "simulation"
```

## Task

```coffee
type: "homework", "practice", "reading", "simulation", "video"
steps: [ ... ]
is_completed: true
is_graded: true       // nice-to-have. can infer from grade_correct and grade_total
due_at: Date
open_at: Date // teacher modifiable
is_visible: true // teacher-modifiable
// Stats
grade_correct: 7
grade_total: 10
recovered: 2
```

## CalendarEvent

For non-Task events that are on a Calendar

```coffee
id:
url:  // (for GET, PATCH, DELETEing)
type: "holiday", "exam"
```
When `type: "exam"` then there is a covers: [(LO1), (LO2), (LO3)]

Need specific stats for the event. specific to event type. i.e.
`{type: "video", stats: { completed_count: 12, total_count: 20 } }`
TODO: how to aggregate multiple periods into one event?
TODO: Analytics (u318)


## LearningObject (or Tags)

```coffee
id:
title: ''
```

## Period

```coffee
id:
title: ''
```

## Class

```coffee
title: ""
instructor: User
periods: [(Period)]
events: [(CalendarEvent)]
```

## AuthenticatedUser

```coffee
name: ''
role: 'student'
actual_user: (AuthenticatedUser)  // This would be the teacher
```

# Routes

For a Sortable Version: <https://docs.google.com/spreadsheets/d/1oWv5OcGjNRdAgLW_0l0febQGDtLAf1BPM3LG3diikzQ/edit>

Notes:
- lowercase verbs are routes only the browser knows about.
- UPPERCASE verbs are usually prefixed with `/api/` for the backend and unprefixed for the frontend
  - unless the page being served is served directly by the backend or a redirect (`/admin`, `/login`, `/logout`)
- Curly braces are the sent payload (for `GET` the payload is in the QueryString)
- Double-parens means the JSON response needs to match these keys (state) for the story to occur
- Uppercase U means this is a display-only story

the calendar events should have the type in the URL (That way I can start rendering the page before I ajax get the data; static is good?)


## The AuthenticatedUser

```
GET    | /user
```

## Teacher

```
get    | / | u449

GET    | /terms | U-Terms
POST   | /terms {is_accepted:true} | U-Terms
GET    | /login | u300

GET    | /user | u303
PATCH  | /user {first_name, last_name, email} | u303

GET    | /classes | u304

GET    | .../book | u450
GET    | .../book/contents/[UUID] | u450
GET    | .../book/search {q} | u451
GET    | /search/classes/123/book {q} | u451 ALTERNATE

get    | .../calendar | u305 U334 U312 U335 U336
GET    | /classes/123 | u307 u308 u309

POST   | .../readings | u329
PATCH  | .../readings/234 {due_at} | u330

POST   | .../readings {due_at} | u313
GET    | .../readings/234 | u314
PATCH  | .../readings/234 {title, description, due_at, } | u314 u315
PUT    | .../readings/234/periods/1 {due_at, readings: []} | u314 u315
DELETE | .../readings/234 | u316
GET    | .../readings/234/analytics | u318
GET    | .../readings/234/preview {Task} | u319
GET    | .../tasks/345/report | u320

POST   | .../homeworks {due_at} | u321
GET    | .../homeworks/234 | u322
PATCH  | .../homeworks/234 {title, description, due_at, } | u322 u323
PUT    | .../homeworks/234/periods/1 {due_at, readings: []} |
DELETE | .../homeworks/234 | u324
GET    | .../homeworks/234/analytics | u326
GET    | .../homeworks/234/preview {Task} |
GET    | .../tasks/345 | u327

POST   | .../externals {due_at} | u333
GET    | .../externals/234 | u337
PATCH  | .../externals/234 {title, description, due_at, link_url, type: â€˜video', â€˜url'} | u334
PUT    | .../externals/234/periods/1 {due_at, readings} | u334 u335
DELETE | .../externals/234 | u336
GET    | .../tasks/345 |

POST   | .../exams |  (Or '.../preps')
GET    | .../exams/234 | u339
PATCH  | .../exams/234 {title, due_at, units, sections} | u339
PUT    | .../exams/234/periods/1 {due_at} | u339
DELETE | .../exams/234 | u324

POST   | .../announcements | u340
GET    | .../announcements/234 | u341
PATCH  | .../announcements/234 {title, description, start_at, due_at} | u341
PUT    | .../announcements/234/periods/1 {start_at, due_at} | u341
DELETE | .../announcements/234 | u342

GET    | .../analytics | u343

GET    | .../scores | u344
GET    | .../scores/export | u345

GET    | .../scores/students/345 | u346
GET    | .../students/345/scores | u346 ALTERNATE

GET    | .../readings/234/scores | u347
GET    | .../homeworks/234/scores | u348
GET    | .../externals/234/scores | u349

GET    | .../readings/234/students/345 | u350
GET    | .../homeworks/234/students/345 | u351

GET    | .../units | T-Course-Units TODO
PATCH  | /classes/123 | u353
GET    | .../students | u354

POST   | .../periods {title} | u355
PATCH  | .../periods/1 {title} | u356
DELETE | .../periods/1 | u356
PATCH  | .../periods [ id1, id2 ] | u357

PATCH  | .../students/345 {period} | u358
DELETE | .../students/345 | u359
PATCH  | .../students/345 {period} | u360
PATCH  | .../students/345 {name} | u361

POST   | .../students/345/password-reset | u362

PATCH  | /user { role: â€˜student' } | u363
```








## Student:

```
GET    | /classes/123 | u364 u365 u365.5 u367 u368 U371 U372 U375 U376 U377
GET    | .../tasks/234 | u366
get    | .../calendar | u373
get    | .../readings/234/review | u379 u380
GET    | .../book | u381
GET    | .../book/contents/[UUID] | u381
GET    | .../book/search {q} | u382
GET    | /search/classes/123/book {q} | u382 ALTERNATE
GET    | .../tasks/234 | u383
PATCH  | .../tasks/234 {is_complete:true} | u384
GET    | .../tasks/234 | u385
GET    | .../tasks/234 | u389
get    | .../tasks/234/introduction | u386
GET    | .../tasks/234/steps/1 | u387 OPTIONAL
PATCH  | .../tasks/234/steps/1 {free_response_text} | u391
PATCH  | .../tasks/234/steps/1 {answer} | u392
GET    | .../tasks/234/steps/1 ((correct_answer)) | u393
GET    | .../tasks/234/steps/1 ((feedback_html)) | u393
POST   | .../tasks/234/steps/1/recover | u388
GET    | .../tasks/234/steps/1 ((recover_step)) | u388
GET    | .../tasks/234/steps/1 ((is_completed:true)) | u395
GET    | .../tasks/234/steps/1 ((type:'external')) | u396
GET    | .../tasks/234/steps/1 ((type:'simulation')) | u397
get    | .../tasks/234/steps/boilerplate | u397.5

GET    | .../tasks/234 ((type:'homework')) | u398
GET    | .../tasks/234/steps/1 ((type:'exercise', not(free_response_text) )) | u399
GET    | .../tasks/234/steps/1 ((type:'exercise', free_response_text, not(answer) )) | u400
GET    | .../tasks/234/steps/1 ((type:'exercise', free_response_text, not(answer) )) | u401
GET    | .../tasks/234/steps/1 ((type:'exercise', free_response_text, answer)) | u402
GET    | .../tasks/234/steps/1 ((type:'exercise', feedback_html)) | u404
get    | .../tasks/234/steps/1 | u405
PATCH  | .../tasks/234/steps/1 {free_response_text} | u406
PATCH  | .../tasks/234/steps/1 {answer, is_completed:true} | u407
PATCH  | .../tasks/234 {is_completed:true} | u408
GET    | .../tasks/234 ((is_graded)) | u409
get    | .../tasks/234 | u410
GET    | /classes/123 | u449
POST   | .../tasks/234/steps/1/recovery | u449.5
GET    | .../tasks/234/steps/1/recovery | u449.5
PATCH  | .../tasks/234/steps/1/recovery {free_response_text, answer, is_completed} | u460
PATCH  | .../tasks/234/steps/999 {free_response_text, answer, is_completed} | u460 ALTERNATE
GET    | .../tasks/234 ((steps:[{recovery:(TaskStep)}])) | u462
GET    | .../analytics | u411
GET    | .../practices {tags:[LO1, LO2]} | u412 u416 u417 u418
POST   | .../practices {tags:[LO1, LO2]} -> (Task) | u412 u416 u417 u418 ALTERNATE
GET    | .../scores | u414
GET    | .../effort | u415
GET    | .../analytics | u418.5 TODO
GET    | .../practices/234 ((not(free_response_text) )) | u419
PATCH  | .../practices/234 {free_response_text} | u419
GET    | .../practices/234 ((free_response_text, not(is_completed)} | u420
PATCH  | .../practices/234 {answer, is_completed} | u420
GET    | .../practices/234 ((is_graded)) | u421 u422
_TODO  | | u423 TODO
GET    | .../practices/234/analytics | u426 u427
```
