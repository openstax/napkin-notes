
All endpoints below are in fact preceded with `/api`.  If one endpoint is reachable by multiple HTTP verbs, the additional verbs are listed on their own line(s) after the line containing the endpoint.

```
GET    /users
GET    /user
GET    /courses/:course_id(/:role_id)
GET    /tasks/:task_id
GET    /tasks/:task_id/steps/:id
PUT    /tasks/:task_id/steps/:id
PATCH
PUT    /tasks/:task_id/steps/:id/completed 
GET    /user/tasks
         We have this now and it lists all tasks for a user.  Do we keep it?  Do we 
         try to think of this as "GET /tasks(/:role_id)" instead?  Is a listing of 
         tasks even necessary?
GET    /courses/:course_id/readings                
GET    /courses/:course_id/plans                   
POST   /courses/:course_id/plans/:id/publish
POST   /courses/:course_id/plans            
GET    /courses/:course_id/plans/new        
GET    /courses/:course_id/plans/:id/edit   
GET    /courses/:course_id/plans/:id        
PUT
PATCH
DELETE

```
