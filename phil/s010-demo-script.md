
# SIGN IN AS STUDENT

- Show student dashboard
- explain parts
- click past work Tab
- click "iReading 3 # 3"
- click through to Lawnmower man
- click "Refresh my Memory"
- click through to another question
- click "Try Again"

- back to dashboard and click a HW 3#3
- click through and answer a problem
- point out no "Feedback"
- click the `*`
- answer them all 
- click the `*`

- go back to Dashboard
- point out "View Feedback" and "View Recovery"
  - HW 3#3 says answered but not in the Feedback/Recovery because not graded
- re-click HW and change answers


# SIGN OUT

- Log in as teacher
- go to calendar
- click FWD/Backwards in the months
- click iReading
- click Homework (point out score)
- click April 30
- add a new HW (point out date is already populated)
- Demo teacher performance book


# Go to :8000

- Show Student dashboard
- click "Learning Guide"
- click Chapters



# Notes for next sprint

- what should happen when student clicks around a HW and answers a question? - should it go to the 1st unanswered question or the next question?

### Student dashboard

- for "This week" HW that has all questions answered should:
  - not have feedback link yet
  - still be clickable (to change answers)

### Learning Guide
  - SVG assets need to be in CSS. See https://github.com/openstax/tutor-js/pull/151#discussion_r29336508

### Calendar
  - Bug. Items on the 1st day of the next month show up: https://cloud.githubusercontent.com/assets/253202/7392809/34af30c8-ee58-11e4-9b74-0f2854291b2f.png
  - when going back (browser back) to the calendar from a Plan. does not repopulate the calendar

### Exercise Builder
  - If I add a new HW, add some problems, and then press “Save as Draft”, go back to the calendar, and click the HW only the title seems to be saved (there is no due date and no problems selected)

### BE'ish
  - In HW Builder: "Introduction" is still in the list
  - dashboard does not re-fetch data (need to always .load and let API cache)
  - why does glossary show up in "iReading 3 # 3"?


# Corresponding bits from https://www.pivotaltracker.com/epic/show/1704862

**Leftover from Sprint 9**
- [x] Student views Learning Guide and clicks to practice a chapter and a section (u411) [Joe BE, Darren/Nathan FE, Jason/Fred UX] <1> 
- [ ] Teacher views spaced practice metrics on Quick Look Analytics (i-Reading performance from calendar) (u310) [Dante, Amanda/Jing] <2> 

**New for Sprint 10**
- [x] Student dashboard - list view (u364) [Kevin BE <2>, Darren/Nathan FE <2>, Fred Vis <1>)
  - [x] Click homework item (u365)
  - [x] Click reading item (u365.5)
  - [ ] Click learning guide link (u371)
  *Stretch goal*: Click on HW where due date has passed (u409)
- [x] IReading Student chooses Refresh my memory (u388) [Dante <0>, Jing <2 or 3>] 
- [x] Student does HW
  - [ ] Student works spaced practice problems on HW (u458)  [Kathi <1> Kevin <2>, Amanda/Jing <2>, Fred <2>]  (will need evaluation for alpha)
  - [ ] Student works machine learning problem from HW (u460) [Kevin, <2>, Amanda/Jing <2>, Fred <2>]
  - [ ] Student submits HW (u408) [Kathi/Jason <1>, Dante <2>, Amanda/Jing <2 or 3>) (will need evaluation for alpha)
  - [x] Bugfix (don't show feedback before due date) (Amanda FE/test <1>, Dante BE <1>)
- [x] Teacher dashboard - calendar month view (u305) [Kevin BE, Amanda/Jing FE] <1>
  - [x] Teacher adds hw, ireading from the + in the calendar (u329) <1>
  - [-] *Stretch goal Teacher adds hw, ireading from clicking on the date in the calendar (u329) <3>
  - [x] *Stretch goal*: Teacher views Quick Look Analytics for the HW (u311) [Dante, Amanda/Jing] <2 or 3>
- [ ] Visual polish
  - [ ] Student does i-readings - 7 tickets (u542, u390) [Fred/Dak] <2>
  - [x] Teacher builds homework assignment  (u322)  [Jing, Fred/Dak] <1>
  - [ ] Student does HW (e071)  [Fred/Dak] <3>
