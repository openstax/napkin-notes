## Technical standards for LMS integration

In order for Tutor to support the user stories we've identified, it will need to implement two standards: LTI & OneRoster.

### LTI

Learning Tools Interoperability (LTI) is a standard that allows a learning system to launch an external tool and run it as if it were an integrated part of the learning system.  Essentially it establishes some standard request parameters that the learning management system will submit to the tool when it is launched.

There have been three evolution's of the standard

[Version 1.0](https://www.imsglobal.org/specs/ltiv1p0/implementation-guide) was released in 2010 and is a simple "fire and forget".  The tool launches, but no specs exist for the tool to pass data (like grades) back to the learning management system.  This version was really only useful for e-textbooks.

[Version 1.1](https://www.imsglobal.org/specs/ltiv1p1/implementation-guide) adds a `lis_outcome_service_url` and `lis_result_sourcedid` parameters.  The `..._sourcedid` is an encrypted payload that is submitted to the `..._service_url`.  This allows the LMS to ensure that the outcome is properly labeled for the particular user, course, and link that are involved in the interaction.  The only type of grade supported by is a decimal number in range from 0.0 - 1.0.

[Version 1.2 & 2.0](https://www.imsglobal.org/specs/ltiv2p0/implementation-guide)  These specifications were just released (Jan 2016), and isn't yet implemented by any LMS. Clever and Canvas are working on support for it.

Version 1.2 is intended as a stepping stone to 2.0. Its API compatible with 2.0, but has the same capabilities as version 1.1.

Version 2.0 adds enhanced outcomes and discoverable services between the LMS and tools.  An administrator can install the tool by pasting a URL into the LMS and the two systems will communicate and arrive at a set of features that they both support.  For instance the LMS may not support giving email addresses to tools, and the tool may support many different types of outcomes.

A good introduction to the differences between the versions is: https://www.imsglobal.org/lti-v2-introduction

## One Roster

On drawback of LTI is that it only interoperates with external tools when the student clicks a link to work an assignment.  If a student never clicks on the link the tool will never know about them.  This makes implementing dashboard type data like "X of X have started/completed assignments" impossible.

Even students that have worked assignments via LTI can't really be remembered since no "drop" data is exchanged.  Even though Tutor might know student id XX has worked some assignments in the past, it couldn't infer that they failed to perform any future assignments.

A solution to these types of problems is "[OneRoster](https://www.imsglobal.org/activity/onerosterlis)"  It provides a method for the exchange of people, courses, and enrollments between the institution and tool providers.  It has specifications for CSV, JSON, and XML.  CSV seems to have the widest usage.

It does not provide passwords or other sensitive data.  An email field is optional and may not be included by all institutions.

[OneRoster CSV specification](https://www.imsglobal.org/lis/imsOneRosterv1p0/imsOneRosterCSV-v1p0.html)

## Interoperability Overview

Use of Tutor with these two standards would look something like:

The institution would provide a full OneRoster download when they decide to start using Tutor.  Most likely this would be only ingested only into Tutor, not Accounts (no passwords are included).

On a set schedule (HISD is daily), Tutor would download a change-set from the institution so it's data is up-to-date.

When a teacher is ready to assign work, they would create an assignment and obtain it's URL.  The URL would be copied into the LMS just as it is now.

Once a student clicks the link, their web-browser performs a POST request to Tutor.  The request includes the `user_id` which will match the roster provided.  Once the student completes the assignment, Tutor will report the grade back to the LMS via the url provided when launched.

Since Tutor would know the course roster for all students, the teacher dashboard and performance forecast would always be up-to-date.  Teachers could obtain detailed information on their student's activities from Tutor while still using their LMS for grading.

### Items for discussion

The below issues seem to suggest we'll have to design a "straight-jacket" FE version for LTI using students.
  * What happens if the student wanders outside the linked assignment and works other assignments?
  * Is seems like it's not possible to update grades once they are submitted unless the user re-clicks the assignment link.
    * What can we do if the user doesn't complete an assignment?

There are LTI arguments for launching embedding in an iframe (`launch_presentation_document_target`).
  * It's unclear to me if any LMS's actually do this, but if they do we may have sizing issues.

It would be possible to only implement LTI and skip OneRoster.  The Teacher's scores and performance forecast would lack data on students that haven't worked any problems, but that may be acceptable.
