# Beta Setup Demo

## Reset the databases (Local Dev Only)

1. `be rake db:reset db:migrate` on both accounts and tutor

## Connect Tutor and Accounts (Local Dev Only)

2. On accounts: `be rake accounts:ost:create_apps[http://localhost:3001,password]`
3. On accounts: run console commands
  * `Doorkeeper::Application.all[1].uid`
  * `Doorkeeper::Application.all[1].secret`
4. In Tutor /.env file, set:
  * `OPENSTAX_ACCOUNTS_STUB=false`
  * `OPENSTAX_ACCOUNTS_CLIENT_ID` equal to the `uid` from above
  * `OPENSTAX_ACCOUNTS_SECRET` equal to the `secret` from above
4. On tutor-server, in `config/environments/development.rb`, set `config.cache_classes = true` so that
   when the dev server reloads initialized settings are not lost (see #494)
5. `bundle exec rails server` on both Tutor and Accounts

## Make first Tutor user

5. Visit Tutor @ `http://localhost:3001`
6. Click "Login"
7. Click "Sign up"
8. Username = "admin", password = "password", click "Register"
9. Click "Finish setting up my account"
10. Complete profile with name "Jimbo Admin".
11. Point out how there is no "I have read and agreed to these terms" (ON ACCOUNTS) b/c we arrived from Tutor.
12. Click "Register"
13. Returning to Tutor we are asked to sign terms.  This is what we expect because we haven't yet set up course-specific terms, and even if we had the admin user is not a member of a course with course-specific terms.
14. Agree to the terms.  Obviously, these terms pages still need at least bare bones styling.
15. After agreeing to terms we arrive at a "no courses" page which is OK for this first brand new user.

## Make Jimbo an Admin in Tutor

16. Make Jimbo an admin on the console by running `UserProfile::MakeAdministrator[user: Entity::User.first]`
17. Reload the tutor page and click on the beautiful admin button.

## Import a book

18. Import a book:
  * Archive URL: https://archive-staging-tutor.cnx.org/contents/
  * CNX ID: ccbc51fa-49f3-40bb-98d6-07a15a7ab6b7@1.1
  * Using this first version of Bio collection b/c it only takes 90 seconds to import and the content doesn't matter for this demo

## District & School Setup

1. Click on "Districts" menu item
2. Click "Add district"
3. Set name = "Rice Independent School District" and click "Save"
4. Point out this is where we will be indicating that RISD has their own terms of use that has been pre-agreed to by the district on behalf of the students.
4. Click on "Schools" menu item
5. Click "Add school"
6. Set name = "Will Rice High School", choose RISD and click "Save"

## District Terms Setup

Need to create a specialized terms "contract" for a district.  These terms will mask our standard terms and will be implicitly-signed.

1. In the admin menu, click on "Terms"
2. You should already see "general_terms_of_use" and "privacy_policy"
3. Click on "New Contract"
2. Fill in the fields with:
  1. Name: risd_1
  2. Title: RISD Terms of Use and Privacy Policy
  3. Content: If available, you can put public-viewable contract language here, in simple HTML format.  If not avaialble, put "Contact your district for more details."
3. Click "Create" (should see "Contract created" message)
4. Click "Publish"
5. Return to the admin menu (no easy button for this, just go to /admin)
6. Go to the "Targeted Contracts" menu item
7. Click "Add Targeted Contract"
8. Fill in:
  1. Contract Name: risd_1
  2. Target: RISD
  3. Masked Contracts: select `general_terms_of_use` and `privacy_policy`
  4. Is Proxy Signed?: check this (both of our districts are signing the agreements on behalf of students)
  5. Can show contents?: depends on what we put in the contents box when creating the special terms
9. Click "Submit"
10. Should be created and listed.

## Course Setup

7. Click "Courses" menu item
8. Click "Add course"
9. Set name = "AP Biology", choose the high school, and click "Save"
10. Click "Edit course" -- point out the different tabs
  * Bug: Selected school not showing up in dropdown (maybe not sticking from course creation)
11. Choose Jimbo as the teacher (for sake of speed)
  * Feature needed: remove teacher
12. Go to "Course content" tab.
13. Choose the one book we imported and click "Submit"
14. Click "Periods" tab.
15. Add two periods: "1st" and "2nd"
  * Would be nice to return to the periods tab after creating each period
16. Go to "Student roster" tab
17. Import CSV files into the two periods (there are valid example files in tutor-server/spec/fixtures/files)
  * Note: If you import a student into another class where the username is already in use by an existing Tutor user, that existing Tutor user will be the one added to the second class (the code will not warn you of this).
18. Go to "Courses" menu item and click "Students" next to the course; point out deidentifier
19. At this point, the teacher will need to give each student their password and those students will need to login.

## Student login

20. log out of tutor-server.
21. Look at the spreadsheet you imported and pick a student to relogin as.  From our example file, we'll log in as "carolb" with "password".
22. Within accounts, you'll see that Carol is immediately requested to change her password.
23. Note that she is not asked to sign contracts within Accounts (this should be the case for all users arriving from Tutor) and when she is redirected back to tutor she isn't prompted to sign anything.


