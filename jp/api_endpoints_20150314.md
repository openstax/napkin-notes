# API Endpoints

The following is a discussion of OX Tutor's current API endpoints.

## Current List of Endpoints

All endpoints below are in fact preceded with `/api`.  

```
GET    /users
GET    /user
GET    /courses/:course_id(/:role_id)
         For course information, e.g. teachers, periods offered, etc
GET    /courses/:course_id/events(/:role_id)
GET    /tasks/:task_id
GET    /tasks/:task_id/steps/:step_id
PUT    /tasks/:task_id/steps/:step_id
PATCH  /tasks/:task_id/steps/:step_id
PUT    /tasks/:task_id/steps/:step_id/completed 
GET    /user/tasks
         We have this now and it lists all tasks for a user.  Do we keep it?  Do we 
         try to think of this as "GET /tasks(/:role_id)" instead?  Is a listing of 
         tasks even necessary?
GET    /courses/:course_id/readings                
GET    /courses/:course_id/plans
POST   /courses/:course_id/plans
GET    /courses/:course_id/plans/new        
GET    /courses/:course_id/plans/:plan_id 
         For all routes ending in /plans/:plan_id, is the /courses/:course_id prefix
         necessary?
PUT    /courses/:course_id/plans/:plan_id 
PATCH  /courses/:course_id/plans/:plan_id 
DELETE /courses/:course_id/plans/:plan_id 
GET    /courses/:course_id/plans/:plan_id/edit   
         I think this is unnecessary in an API
POST   /courses/:course_id/plans/:plan_id/publish
```

## About Role-aware API Endpoints

Several of our endpoints are "role-aware", that is, they accept optional role information in the URL.  
So far, these endpoints are only `GET`s.  If the role information is not provided, the backend should 
assume that the calling user's default role made the call.  Any role-aware endpoint should return
the current role identifying information, in addition to the role type (e.g. 'student', 'teacher', etc)
if the role identifying information doesn't already include it.  It is the frontend's responsibility
to remember the user's current role information (likely in memory and not just in the URL as not all
endpoint URLs are role-aware).

The "role information" in the URL only needs to be an ID.  The backend can figure out the type of
the role if needed.  However, if it is helpful, the role information can be a type and an ID, e.g.
`(/:role_type/:role_id)` instead of `(/:role_id)`.