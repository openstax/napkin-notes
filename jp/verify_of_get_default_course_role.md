# Write a Domain::VerifyOrGetDefaultCourseRole routine (name up for debate)

When users specify roles on role-aware endpoints (e.g. the above), we need to
verify that the role actually belongs to the user.  If no role is specified
we need to choose a suitable default role.  If the user only has one role in a
course, that is obviously the default role.  If the user has more than one
role and one of those is a teacher role, that is the default.  Etc.  See the
pseudo-code below.  We should also allow a caller to limit the type of the returned
role (e.g. for the practice widget we are only interested in student roles)


```ruby
class Domain::VerifyOrGetDefaultCourseRole
  lev_routine

  def exec(course:, user:, role: nil, role_types: nil)
    # If role provided, make sure it belongs to user; if so, return it,
    #   if not, freak out.
    # If role not provided...
    #   Get the users set of roles for the given course, restricted to
    #   the role_types array if that is provided.
    #
    #   If there are no roles, freak out (forbidden?)
    #
    #   If there is one role, return it
    #
    #   If there are multiple roles and there is one teacher role return it
    #     (I don't think multiple teacher roles in one course are allowed)
    #
    #   Otherwise freak out (need more arguments)
  end
```

As a start use this routine in the practice widget endpoints.
