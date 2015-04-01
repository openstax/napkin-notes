## Proposal to cease disclosure of application_user concept

Currently Accounts has a User class which has multiple application_users.  The application_user is represented the mapping between an application and the underlying user.

We don't want to remove application_users from the system but we'd like to stop handing out it's ID to applications and have them deal only in terms of Users.  The accounts server will continue to consult the application_users model to ensure that users are only displayed to applications to whom they've registered.

Currently the application_user is used by three methods on the application_user_controller.

  * find_by_username, called via /application_users/find/username/:username.  It searches for a user by exact username.
  * updates: /application_users/updates.  Retrieves the number of updates for an application_user
  * updated: /application_users/updated.  Marks updates as read for the given application_user

There's also an index method on application_users that searches for users, but it returns only a user's JSON representation despite being under the /application_users endpoint.

This can be easily converted to only return the User's information by moving the methods to /users/ and only using the user's id, not the application_users.

The proposed endpoints would be:

  * find_by_username, /users/find/username/:username
  * updates: /users/updates.
  * updated: /users/updated.
  * index:  /users, already exists with seemingly identical behavior as /application_users

The endpoints will function just as they did on the original endpoint, but only the User portion of the  JSON will be returned.  The "unread_updates" property will be moved onto the User's representation.

### Current JSON for application_users

```json
{
    "id": 1,
    "unread_updates": 2
    "user": {
        "id": 1,
        "title": "Monsignor"
        "username": "nathanstitt",
        "first_name": "Nathan",
        "last_name": "Stitt",
        "full_name": "Nathan Stitt",
    },
}
```

### Proposed response

```json
{
    "unread_updates": 2
    "id": 1,
    "username": "nathanstitt",
    "title": "Monsignor"
    "first_name": "Nathan",
    "last_name": "Stitt",
    "full_name": "Nathan Stitt",
}
```

## Steps to implement

 * First add the new methods to the `/users` endpoint
 * Deprecate use of the `/application_users` endpoint
 * At some point, remove `/application_users`
