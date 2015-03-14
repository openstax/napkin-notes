
All endpoints below are in fact preceded with `/api`.

1. `GET       /users`
1. `GET       /user`
1. `GET       /courses/:course_id(/:role_id)`
1. `GET       /tasks/:task_id`
1. `GET       /user/tasks`
  * Do we keep this?  Do we try to think of this as `GET /tasks(/:role_id)` instead?  Is a listing of tasks even necessary?
1. `GET       /api/tasks/:task_id/steps/:id`
1. `PUT/PATCH /api/tasks/:task_id/steps/:id`
1. `PUT       /api/tasks/:task_id/steps/:id/completed  


GET                       /api/tasks/:id                           
GET                       /api/courses/:id/readings                
GET                       /api/courses/:id/plans                   
POST                      /api/courses/:course_id/plans/:id/publish
POST                      /api/courses/:course_id/plans            
GET                       /api/courses/:course_id/plans/new        
GET                       /api/courses/:course_id/plans/:id/edit   
GET                       /api/courses/:course_id/plans/:id        
PATCH                     /api/courses/:course_id/plans/:id        
PUT                       /api/courses/:course_id/plans/:id        
DELETE                    /api/courses/:course_id/plans/:id        
