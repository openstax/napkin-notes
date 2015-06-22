Currently the FE loads two endpoints every time it's loaded, both of which depend on and return user-specific information:

 * `/api/user` Contains the user name and the `is_admin` flag
 * `/api/user/courses` A list of all the courses the user belongs to, the role the user in them, and their periods.

I propose we merge the two endpoints into just the `/api/user` endpoint, with format:

```json

{
  name: "Bob Smith"
  is_admin: <true,false>
  courses: [  // array of courses just as it is now on /api/user/courses
    {
      id: "1"
      name: "Physics I"
      periods: [
        {id: "1", name: "1st"},
        {id: "2", name: "2nd"}
      ]
      roles: [
        {id: "2", type: "student"}
      ]
    }
  ]
}

```

If we do this, it will:
  * Slightly simplify the FE code by allowing interested components (Navbar, course listing, dashboard) to only listen on one store.
  * Allow the FE to fully render sooner since only one network request will be performed
