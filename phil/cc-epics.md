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

- [_] `CC1.04.005` [fe] see all exercises for section 
- [3] `CC1.04.006` [fe] link from exercise to Exercises
- [_] `CC1.04.007` [fe] know when changed
- <s>[pri2] `CC1.04.008` [fe] filter exercise list</s>
- <s>[pri2] `CC1.04.009` [fe] exercise counts</s>


## QA Review of Content

- <s>[pri2] `CC1.04.010` [fe] show book page_module with markup</s>
- <s>[pri2] `CC1.04.011` [fe] link to edit book page_module</s>
- <s>[pri2] `CC1.04.012` [fe] switch sections</s>


## Exercise Editing

- **[1] `CC1.04.013` [fe] simple edit**
- [2] `CC1.04.014` [fe] preview math/markdown
- [3] `CC1.04.015` [fe] publish exercise
- <s>[pri2] `CC1.04.016` save draft</s>
- <s>[pri2] `CC1.04.017` create new</s>


## Exercise Protection

- [_] `CC1.04.018` unauthenticated users do not get exercise answers



# Epic 05 - CNX Navigation

- [_] `CC1.05.001` CNX change login/legacy link
- [_] `CC1.05.002` CNX remove other links
- [_] `CC1.05.003` [spike] [fe] ToC with editor
- **[1] `CC1.05.003` [fe] CNX: Implement ToC (FE)**
- [_] `CC1.05.004` [spike] [fe] book seaarch UI
- [2] `CC1.05.004` [fe] CNX Search within a book (BE)
- [_] `CC1.05.???` CNX change "All Search" from global


# Epic 06 - CC Widget Mechanics / Infrastructure 

- **[1] `CC1.06.001` [spike] [fe] how to load CC widget**
- **[1] `CC1.06.001` [fe] CNX add to settings.json**
- [2] `CC1.06.001` [fe] CNX load widget
- [3] `CC1.06.001` [fe] CNX hide content


# Epic 07 - Student Registration, Enrollment, Login Authentication

- [_] `CC1.07.001` Write /api/enroll endpoint
- **[1] `CC1.07.009` [spike] [fe] login to tutor from cnx**
- **[1] `CC1.07.009` [fe] login to tutor from cnx**
- [2] `CC1.07.002` [fe] register using code
- [2] `CC1.07.???` [fe] widget shows page when not logged-in
- [_] `CC1.07.003` [fe] know registration was successful
- [_] `CC1.07.004` `CC1.07.005` `CC1.07.006` `CC1.07.007` [fe] change course/period
- [3] `CC1.07.004` [fe] change course/period confirmation messages
- [3] `CC1.07.008` [fe] support multiple CC courses
- [_] `CC1.07.010` [fe] ? widget shows student name
- [_] `CC1.07.011` show "Privacy & Policy" terms
- [_] `CC1.07.012` widget has profile editing
- [_] `CC1.07.014` Accessibility
- <s>[pri2] `CC1.07.013` Timeout policy</s>


# Epic 08 - Students performing assignments

- [2] `CC1.08.???` [fe] incorrect login page
- [_] `CC1.08.001` [fe] fetch exercises based on page id
- [4] `CC1.08.002` [fe] answer question 
- [4] `CC1.08.003` [fe] show answer feedback
- [3] `CC1.08.004` [fe] update Exercise design
- [_] `CC1.08.005` include Spaced Practice, `CC1.08.006` write CC "assistant"
- [_] `CC1.08.010` decide what to do when no questions
- [5] `CC1.08.012` [fe] show summary when done
- [_] `CC1.08.011` [fe] accessibility
- <s>[pri2] `CC1.08.013` [fe] refer to exercise id (link)</s>
- [_] `CC1.08.014` [fe] works on tablet


# Epic 09 - Student Progress Views

- [4] `CC1.09.001` [fe] see chapter/section completion 


# Epic 10 - Admin / Teacher Course setup

- [_] `CC1.10.003` SF create course registration codes
- [_] `CC1.10.002` SF->Tutor create course
- [_] `CC1.10.004` link course to teacher via registration code
- [2] `CC1.10.005` [fe] Teacher add/edit/remove periods
- [2] `CC1.10.007` [fe] Teacher add/edit/remove periods
- [2] `CC1.10.008` [fe] Teacher add/edit/remove periods
- [3] `CC1.10.006` [fe] Teacher list period registration codes
- [4] `CC1.10.009` [fe] Teacher rename course
- [4] `CC1.10.010` `CC1.10.011` [fe] Teacher add/remove teachers
- [4] `CC1.10.012` `CC1.10.013` [fe] Teacher move/remove students
- [_] `CC1.10.014` Admin can impersonate teacher
- [_] `CC1.10.015` Admin Bulk Change Ecosystems
- [_] `CC1.10.017` [fe] Show Roster
- <s>[pri2] `CC1.10.016` Teacher Customize registration code</s>


# Epic 11 - Teacher Login 

- non-dev
  - explain where to login


# Epic 12 - Delivering Assignments (Concept Coach readings and Non-Concept Coach HW)

- **[1] `CC1.12.???` (Navigation Epic) TOC: Fix unit numbering (CSS)**
- [2] `CC1.12.???` (Navigation Epic) TOC: Fix intro numbering (BE+CSS)

- non-dev
  - CNX upload/lock PDF
  - CNX change book title "... with CC"
  - CNX update/create homepages with links to CC


# Epic 13 - Teacher Views (settings, codes, roster, scores, analytics, data export)

- UX: decide things
NEED TO REVISIT
- [fe] make dashboard with ToC and %'s
