# Epic 03 - Content Ingest/Import

- [spike] Review tagging legend for CC
- [spike] "magic mapping" Review LO description documen
- [spike] check if content versioning impacted by CC-import

# Epic 04 - Exercise Editing and Q/A

## QA Role and Error Reporting

- show errors on import (papertrail link?)
- Add analyst Role
- add ecosystem comment
- add delete ecosystem button

## QA Review of Exercises

- `CC1.04.005` [fe] see all exercises for section 
- `CC1.04.006` [fe] link from exercise to Exercises
- `CC1.04.007` [fe] know when changed
- `CC1.04.008` [fe] [pri2] filter exercise list
- `CC1.04.009` [fe] [pri2] exercise counts


## QA Review of Content

- `CC1.04.010` [fe] [pri2] show book page_module with markup
- `CC1.04.011` [fe] [pri2] link to edit book page_module
- `CC1.04.012` [fe] [pri2] switch sections


## Exercise Editing

- **[1]** [fe] `CC1.04.013` simple edit
- `CC1.04.014` [fe] preview math/markdown
- `CC1.04.015` [fe] publish exercise
- [pri2] `CC1.04.016` save draft
- [pri2] `CC1.04.017` create new


## Exercise Protection

- `CC1.04.018` unauthenticated users do not get exercise answers



# Epic 05 - CNX Navigation

- `CC1.05.001` CNX change login/legacy link
- `CC1.05.002` CNX remove other links
- `CC1.05.003` [spike] [fe] ToC with editor
- **[1]** `CC1.05.003` [fe] CNX: Implement ToC (FE)
- `CC1.05.004` [spike] [fe] book seaarch UI
- `CC1.05.004` [fe] CNX Search within a book (BE)
- CNX change "All Search" from global


# Epic 06 - CC Widget Mechanics / Infrastructure 

- **[1]** `CC1.06.001` [spike] [fe] how to load CC widget
- **[1]** `CC1.06.001` [fe] CNX add to settings.json
- `CC1.06.001` [fe] CNX hide content
- `CC1.06.001` [fe] CNX load widget


# Epic 07 - Student Registration, Enrollment, Login Authentication

- `CC1.07.001` Write /api/enroll endpoint
- **[1]** `CC1.07.009` [spike] [fe] login to tutor from cnx
- `CC1.07.002` [fe] register using code
- `CC1.07.003` [fe] know registration was successful
- `CC1.07.004` `CC1.07.005` `CC1.07.006` `CC1.07.007` [fe] change course/period
- `CC1.07.004` [fe] change course/period confirmation messages
- `CC1.07.008` [fe] support multiple CC courses
- `CC1.07.009` [fe] login to tutor from cnx
- `CC1.07.010` [fe] ? widget shows student name
- `CC1.07.011` show "Privacy & Policy" terms
- `CC1.07.???` [fe] widget shows page when not logged-in
- `CC1.07.012` widget has profile editing
- `CC1.07.013` Timeout policy
- `CC1.07.014` Accessibility


# Epic 08 - Students performing assignments

- `CC1.08.001` [fe] fetch exercises based on page id
- `CC1.08.002` [fe] answer question 
- `CC1.08.003` [fe] show answer feedback
- `CC1.08.004` [fe] update Exercise design
- `CC1.08.005` include Spaced Practice, `CC1.08.006` write CC "assistant"
- `CC1.08.010` decide what to do when no questions
- [fe] incorrect login page
- `CC1.08.012` [fe] show summary when done
- `CC1.08.011` [fe] accessibility
- `CC1.08.013` [fe] [pri2] refer to exercise id (link)
- `CC1.08.014` [fe] works on tablet


# Epic 09 - Student Progress Views

- `CC1.09.001` [fe] see chapter/section completion 


# Epic 10 - Admin / Teacher Course setup

- `CC1.10.003` SF create course registration codes
- `CC1.10.002` SF->Tutor create course
- `CC1.10.004` link course to teacher via registration code
- `CC1.10.005` [fe] Teacher add/edit/remove periods
- `CC1.10.007` [fe] Teacher add/edit/remove periods
- `CC1.10.008` [fe] Teacher add/edit/remove periods
- `CC1.10.006` [fe] Teacher list period registration codes
- `CC1.10.009` [fe] Teacher rename course
- `CC1.10.010` `CC1.10.011` [fe] Teacher add/remove teachers
- `CC1.10.012` `CC1.10.013` [fe] Teacher move/remove students
- `CC1.10.014` Admin can impersonate teacher
- `CC1.10.015` Admin Bulk Change Ecosystems
- `CC1.10.016` [pri2] Teacher Customize registration code
- `CC1.10.017` [fe] Show Roster


# Epic 11 - Teacher Login 

- non-dev
  - explain where to login


# Epic 12 - Delivering Assignments (Concept Coach readings and Non-Concept Coach HW)

- **[1]** (Navigation Epic) TOC: Fix unit numbering (CSS)
- (Navigation Epic) TOC: Fix intro numbering (BE+CSS)

- non-dev
  - CNX upload/lock PDF
  - CNX change book title "... with CC"
  - CNX update/create homepages with links to CC


# Epic 13 - Teacher Views (settings, codes, roster, scores, analytics, data export)

- UX: decide things
NEED TO REVISIT
- [fe] make dashboard with ToC and %'s
