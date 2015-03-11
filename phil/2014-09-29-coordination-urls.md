# Coordination using the URL


The JS uses browser URLs to manage state and decide what needs to be displayed.

State is defined as the URL + your login type (student, teacher, admin, etc). **NOTE:** A "teacher" in one class can be a student in another.

This allows:

- users to bookmark a link
- press the back/forward button
- know what to fetch and how to render

So, each browser URL (route) can be thought of as a `GET` request that makes >= 1 API `GET` requests.


For the UX folks, each browser URL + login type needs some design for how the screen should look.

Given JP's big Doc, UX folks can (basically) just look at each line starting with `GET` and can mock up the UI.

To keep all these URLs somewhat sane, I'm hoping the backend uses similar routes.

## Example 1: Class Homepage

From `GET    /classes/012 (ALL) Class homepage` in [Throwaway Tutor API](https://docs.google.com/document/d/1huMUBYM3pqam_5wy8BmQ4-Q5mVOfV62qHHVKS4MyMY8) which is distilled from [JP's big Doc](https://docs.google.com/document/d/1rrwiyXUyb1l96CV63XqaTg8o_M817-ZLA74ztu5WkSI)

If we use http://philschatz.com/tutor-mockups/ as the mockup:

- UX: mock up what the screen looks like when the user goes to `/classes/012`
- FrontEnd: decide which API calls need to happen to display the task list (hopefully just 2 for this example)
- Backend: return JSON for the course and how I'm doing in it (`/api/classes/012`)
- BackEnd: return enough JSON to render the task list (`/api/classes/012/tasks`)


- BackEnd would return either an array of tasks (current + upcoming + completed) or have 3 calls:
  - `/api/classes/012/tasks?status=current`
  - `/api/classes/012/tasks?status=upcoming`
  - `/api/classes/012/tasks?status=completed` (to allow Paged Results)

- Backend would, for each task, include: my proficiency in each topic in the assignment

- Frontend would:
  - fetch course info
  - fetch task lists
  - create links for practice assignments, a link to set up a reminder


But the user story would be `GET    /classes/012 (ALL) Class homepage` and we could all coordinate around that one line.


## Example 2: Edit Plans

Again, from https://docs.google.com/document/d/1huMUBYM3pqam_5wy8BmQ4-Q5mVOfV62qHHVKS4MyMY8/edit

```
GET    {...       }/plans/123 (TEACH) See a specific task plan that will be assigned to students
PATCH  {...       }/plans/123 (TEACH) [2.1.b-d] assign tasks to educators or students
PATCH  {...       }/plans/123 (TEACH) [2.6.f] toggle show/hide comments
DELETE {...       }/plans/123 (TEACH) [2.1.e-f] remove a task plan (and any tasks that were created by it)
```

We can bite off parts of this but the UX folks would need to mock up the following (all the `GET`s):

```
GET    {...       }/plans/123 (TEACH) See a specific task plan that will be assigned to students
```

with an eye for the operations defined in `PATCH/POST/DELETE`.

FrontEnd would need to render the proper views for the GET and call the relevant `PATCH/POST/DELETE` to change the Plan

and BackEnd would need to modify the DB appropriately.


## Example 3: Plan Reporting

Not all the routes need to be available in the API. For example `./analytics` and `./preview` can be UI-only (storing state in the URL). But, these give the UX folks a place to hang their mockups and FrontEnd a place to squirrel away application state.

```
GET    {...       }/plans/123/analytics (TEACH) [8.1.a,c] analytics (completion %'s)
GET    {...       }/plans/123/preview (TEACH) [2.9] preview a single assignment
GET    {...       }/plans/123/tasks (GRADER) [2.6.c]  get a list of assignments I can grade
GET    {...       }/plans/123/students/123/analytics (TEACH) [8.1.a-c] task analytics for a specific student
POST   {...       }/plans/123/grading (GRADER) [7.1] batch upload CSV grades
```

And the last `POST` would probably go straight to the API (no frontend route) but there could be a review page at `GET   {...       }/plans/123/grading`
