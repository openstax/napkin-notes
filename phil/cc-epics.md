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

- [fe] CC1.04.005 see all exercises for section 
- [fe] CC1.04.006 link from exercise to Exercises
- [fe] CC1.04.007 know when changed
- [fe] CC1.04.008 [2] filter exercise list
- [fe] CC1.04.009 [2] exercise counts


## QA Review of Content

- [fe] CC1.04.010 [2] show book page_module with markup
- [fe] CC1.04.011 [2] link to edit book page_module
- [fe] CC1.04.012 [2] switch sections


## Exercise Editing

- [fe] CC1.04.013 simple edit
- [fe] CC1.04.014 preview math/markdown
- [fe] CC1.04.015 publish exercise
- [2] CC1.04.016 save draft
- [2] CC1.04.017 create new


## Exercise Protection

- CC1.04.018 unauthenticated users do not get exercise answers



# Epic 05 - CNX Navigation

- [spike] [fe] ToC with editor
- [spike] [fe] book seaarch UI
- CNX change login/legacy link
- CNX remove other links
- CNX change "All Search" from global
- [fe] CNX: Implement ToC (FE)
- [fe] CNX Search within a book (BE)


# Epic 06 - CC Widget Mechanics / Infrastructure 

- [spike] [fe] how to load CC widget
- [fe] CNX add to settings.json
- [fe] CNX hide content
- [fe] CNX load widget


# Epic 07 - Student Registration, Enrollment, Login Authentication

- [spike] [fe] login to tutor from cnx
- [fe] register using code
- [fe] change course/period
- [fe] support multiple CC courses
- show "Privacy & Policy" terms
- [fe] widget shows page when not logged-in
- [fe] ? widget shows student name
- ? widget has profile editing


# Epic 08 - Students performing assignments

- [fe] answer question (& feedback)
- [fe] update Exercise design
- [fe] send exercises based on page id
- include Spaced Practice
- [fe] incorrect login page
- [fe] show summary when done
- [fe] accessibility


# Epic 09 - Student Progress Views

- [fe] see chapter/section completion 


# Epic 10 - Admin / Teacher Course setup

- SF create course registration codes
- SF->Tutor create course
- link course to teacher via registration code
- [fe] Teacher add/edit/remove periods
- [fe] Teacher list period registration codes
- [fe] Teacher edit course
- [fe] Teacher add/remove teachers
- [fe] Teacher add/remove students
- Admin can impersonate teacher


# Epic 11 - Teacher Login 

- non-dev
  - explain where to login


# Epic 12 - Delivering Assignments (Concept Coach readings and Non-Concept Coach HW)

- (Navigation Epic) TOC: Fix unit numbering (CSS)
- (Navigation Epic) TOC: Fix intro numbering (BE+CSS)

- non-dev
  - CNX upload/lock PDF
  - CNX change book title "... with CC"
  - CNX update/create homepages with links to CC


# Epic 13 - Teacher Views (settings, codes, roster, scores, analytics, data export)

- UX: decide things
NEED TO REVISIT
- [fe] make dashboard with ToC and %'s
