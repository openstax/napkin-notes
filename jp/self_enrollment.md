# Student Self Enrollment

In Concept Coach, students self-enroll by providing an "enrollment code" in a form.  The code is looked up to find a matching course/period and they are enrolled in it.  Students can also provide a code to change from one course / period to another course / period.

For a number of reasons (the code may be non-meaningful, the change may not transfer data, etc) we pretty much always want to get the student to confirm the change that is going to happen.  To support this, we've split the enrollment APIs into two parts, one that creates an "enrollment change" record (which stores confirmation information, info about what course/period the student is joining and leaving, etc) and a second that processes that enrollment change record after approval / confirmation.

## POST /api/enrollment_changes

The FE hits this API in one of the following situations:

1. Student signing up for a new CC book
2. Student changing courses/periods within the same book

### Input

```ruby
{
  enrollment_code: 'babbling monkey',
  book_cnx_id: 'UUID@VERSION'
}
```

### Output

If the POST is successful a `200` response will include:

```ruby
{
  id: 1002,
  from: { # may be null
    course: { # not full Course JSON which includes periods, roles, etc
      id: ...,
      name: ...
    },
    period: {
      id: ...,
      name: ...
    }
  },
  to: { # may be null
    course: { # not full Course JSON which includes periods, roles, etc
      id: ...,
      name: ...
    },
    period: {
      id: ...,
      name: ...
    }
  },
  status: 'pending',  # or 'succeeded', 'failed'
  requires_enrollee_approval: true
}
```

**Note that this does not process the enrollment change, it just says what the change is going to be.  It must be approved (see next endpoint) for the changes to take effect.**

If Tutor couldn't create the enrollment change, it will return a `422` with:

```ruby
{
  error: # one of:
    # 'already_enrolled' - already in the requested period
    # 'enrollment_code_does_not_match_book'
}
```

### Implementation

* Get the course and period matching the enrollment_code
* If the user is already in this course
  * If already in the ... fill in with notes from CC1.07.001

Notes:

* Prohibit users passing in their own values for the object -- Tutor is the only one who can set period IDs (in this case based on the enrollment code which acts as a sort of password)
* Freak out if enrollment course points to CC course but no CNX collection ID given
* If enrolling in a course previously dropped, make sure to reactivate old student


## PUT /api/enrollment_changes/1002/approve

The normal process will be to:

1. create a new EnrollmentChange with the endpoint above
2. Get the enrollee to review the returned specifics of the change.
3. Call this PUT endpoint to approve the change for the student, which will attempt to process the change.

If successful, the response will be `200` with:

```ruby
{
  id: 1002,
  from: ..., # same from above
  to: ..., # same from above
  status: 'succeeded',
  requires_enrollee_approval: true  # still true even tho have that approval now
}
```

Because we already did the POST step, errors will likely be rare.  But it is conceivable that courses or periods are no longer available.  When we implement this, we'll figure out the potential errors and would likely give back an `{error: 'blah'}` object like above.

## GET /api/enrollment_changes/1002

Does FE want a GET endpoint?

## ProcessEnrollmentChange

The routine that processes the enrollment change object....

## EnrollmentChange Model

```ruby
EnrollmentChange
----------------
enrollee_user_id
from_period_id
to_period_id
requires_enrollee_approval
enrollee_approved_at
requires_teacher_approval # for later
teacher_approved_at       # for later
teacher_approver_id       # for later; teacher object?  means don't really delete teachers
```
