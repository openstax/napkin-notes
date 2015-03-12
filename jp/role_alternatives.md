## Why roles are needed

A user takes on many roles within Tutor, e.g. "teacher", "student", "admin", etc.  Some users might have multiple roles within a course.  E.g. a physics teacher will have to have a "teacher" role in her course, but might also want to actually be a "student" in that course, or even temporarily assume the "student" role of one of their students to see what they see.

## Ways to store / convey current roles

### The server stores the active role in DB and session

The server would store one active role in the database and in the session.  The FE could access the role type via the `/api/user` endpoint (the one that gives info on the currently logged in user).  Based on that type information, the FE would change its display of certain pages (e.g. `/api/courses/123/dashboard`).  The backend would also give different results for requests based on the one active role (e.g. for `/api/courses/123/dashboard` the backend would give plan information when a teacher role is active or task information when a student role is active).

*Example:* `http://tutor.openstax.org/api/courses/123/dashboard`


### The current role is encoded in the URL

The role information is written inside the URL, e.g. `http://tutor.openstax.org/<role info>/endpoint`.  The server still stores which users have which roles (it does this no matter what), but the indication of which role to use for a certain request is passed as part of the URL.

*Example:* `http://tutor.openstax.org/api/teacher/456/dashboard`

### The current role is passed as a URL param

Just like encoding the role in the URL, but instead of within the main URL the role is passed as a parameter.

*Example:* `http://tutor.openstax.org/api/courses/123/dashboard?role=teacher456`

### The current role is passed in the HTTP header

Like the URL/param approaches, the role is passed in the HTTP request, just in the header, not the URL.

*Example:* `http://tutor.openstax.org/api/courses/123/dashboard (with 'role=teacher456' in header)`

## Tradeoffs

### Tradeoff features

1. **Clearer URLs:** A URL ending in `courses/123/dashboard` more obviously refers to a course dashboard vs a URL ending in `teachers/456/dashboard`.
2. **Share links:** One student can copy their `courses/123/dashboard` link and send it to a friend, but couldn't do so with `students/789/dashboard`.
3. **Different roles in different tabs:** A teacher could have their view open in one tab and show a student his view in another tab.
  * Scenario: A teacher is working at their desk and a student comes up and has a question about what they're seeing.  The teacher can open a new tab (without losing their work / place) and open that student's view in a different tab (temporarily assuming that student's "student" role).
4. **Pages bookmarkable:** if you bookmark a page, when you go back to it it shows the same role information

### Which methods have which features

|#| Feature                           | DB/Session         | URL | ?=param | HTTP header |
|-|-----------------------------------|--------------------|-----|---------|-------------|
|1| Clearer / simpler URLs            | Yes                | No  | Kinda   | Yes         |
|2| Share links                       | Kinda <sup>1</sup> | No  | No      | No          |
|3| Different roles in different tabs | No                 | Yes | Yes     | Yes         |
|4| Pages bookmarkable                | No                 | Yes | Yes     | No          |
|5| Who manages / gets the work       | BE                 | FE  | FE      | FE          |

<sup>1</sup> Sharing links will probably work, but in the same way that DB/Session role storage doesn't allow bookmarking, sharing links won't always work.

### Example URLs:

| Method      | URL       |
|-------------|-----------|
| DB/Session  | http://tutor.openstax.org/api/courses/123/dashboard |
| URL         | http://tutor.openstax.org/api/teacher/456/dashboard |
| ?=param     | http://tutor.openstax.org/api/courses/123/dashboard?role=teacher456 |
| HTTP header | http://tutor.openstax.org/api/courses/123/dashboard (with 'role=teacher456' in header) |


