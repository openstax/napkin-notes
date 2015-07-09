# Teacher

- Builder
  - Reference book link
  - open/due dates
  - Validation
  - Save Draft
- Roster
  - Add student
  - change period
  - remove student
- Browse the book
- Perf Report
  - change period
  - full review
  - individual student
  - exports

# Student

- Biology Dashboard
- Show sections covered (bio)
- Learning Guide (physics)


# Bugs

- Editing draft removes Due date
- if TaskPlan is only assigned to 1 period then other period tabs should be disabled
  - impacts calendar popup, class aggregate view

## Calendar

- How is a draft determined?
- Handle state when is_publish_requested is true but TaskPlan isn't published yet


## HW Builder

- validation (open/due dates, and for each period)
- opensAt should be today by default
- Test Disabling Delete after opensAt
- Test Disable adding more exercises/Readings after opensAt date
- Disable editing opensAt after opensAt (I think. Maybe confirm w/ Fred?)
- ref [Assignment Management Behavior](https://docs.google.com/document/d/1CAyWKf-t2X5F79WtSR3SwGDZ1721ibvkLvRWqI20EyM/edit)


## Bio content (maybe BE)

- remove units
  - from chapter_section
  - sections should be a single module, not a chapter


## Roster

- remove unsupported buttons (reset pass, add student)

## Learning Guide

- styling the list is staggered (see demo) maybe fixed with new mockup (no Edit button)
- buttons should create a new Practice (with page_ids)


## Phil

Figure out how to test various states for TaskPlans, Tasks (overdue but can still answer), Exports
