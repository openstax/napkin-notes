# Overview

Whenever an exercise gets updated, openstax exercises creates a new
version of the exercise.  While this maintains the integrity of the
exercises subsystem, it has certain undesirable side effects in other
subsystems.  This document discusses some of those problems and
potential solutions for them.


# Versioning policy


1.  When does an exercise get a new version?

    1.  Whenever the content is updated
    2.  When the question changes "significantly"

    Option (ii) is preferable as it allows us to correct typos and
    other minor errors while not causing ripple effects across the
    system.

    [Edit: After discussions with JP]

    The above can be accomplished by:

    1.  Mutating an existing version for minor updates and creating
        new versions for major updates (or)
    2.  Creating new versions for minor updates and creating new
        exercises for major updates.  This involves changing the
        canonical exercise id to not have version qualifiers.

2.  What do we do with older versions?

    1.  Mark them as obsolete
    2.  Don't do anything special and let the end user systems exclude
        them if and when necessary
    3.  One of the above based on the actual change

    Option (i) is preferable as it avoids the issue of two versions of
    the same exercise coexisting.


3.  Does biglearn need to know about the "versions" concept?

    This depends on our partitioning scheme.   When tutor asks for a
    personalized question it should specify a tag that targets the
    questions that are to be considered.

    Lets say for Class A, exercise 303@1 was included.  All the students
    in class A should only get 303@1 even if a new, shiny version of 303,
    303@2 has been made available.  So tutor should be able to tell
    biglearn not to use 303@2 for Class A.  However, Class B, a newly
    setup class should not use 303@1 but use 303@2.

    Given these requirements, it is best for biglearn not to know about
    exercise versions.


# Import process

1.  Exercises import process should be idempotent.  Importing the same
    spreadsheet twice should not change the system in any way.
2.  Exercises import process should be incremental.  Importing a
    spreadsheet with changes should only propagate the changes and leave
    the unchanged content as is.
3.  Exercises import process should be order independent.  Importing sheet-A
    and then sheet-B should be the same as importing sheet-B and then sheet-A.
    This requires that our id generation scheme should be tweaked to use the
    exercise number provided by the content team.
