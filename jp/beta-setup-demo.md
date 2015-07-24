# Beta Setup Demo

## Reset the databases

1. `be rake db:reset db:migrate` on both accounts and tutor

## Connect Tutor and Accounts

2. On accounts: `be rake accounts:ost:create_apps[http://localhost:3001,password]`
3. On accounts: run console commands
  * `Doorkeeper::Application.all[1].uid`
  * `Doorkeeper::Application.all[1].secret`
4. In Tutor /.env file, set:
  * `OPENSTAX_ACCOUNTS_STUB=false`
  * `OPENSTAX_ACCOUNTS_CLIENT_ID` equal to the `uid` from above
  * `OPENSTAX_ACCOUNTS_SECRET` equal to the `secret` from above

## Home page, Zendesk, make first Tutor user

5. Visit Tutor @ `http://localhost:3001`
5. Show how 'Help' button goes to Zendesk
6. Click "Login"
7. Click "Sign up"
8. Username = "admin", password = "password", click "Register"
9. Click "Finish setting up my account"
10. Complete profile with name "Jimbo Admin".
11. Point out how there is no "I have read and agreed to these terms" b/c we arrived from Tutor.
12. Click "Register"
13. Returning to Tutor we are asked to sign terms. This is a feature that got close but didn't make it all the way.  I think we still need to do it - to make signing of terms a course-specific thing and to waive those signatures for our districts because that's what our district agreements say we can and should do.
14. Agree to the terms.  Obviously, these terms pages still need at least bare bones styling.
15. After agreeing to terms we arrive at a "no courses" page which is OK for this first brand new user.

## Make Jimbo an Admin in Tutor

16. Make Jimbo an admin on the console by running `UserProfile::MakeAdministrator[user: Entity::User.first]`
17. Reload the tutor page and click on the beautiful admin button.
18. Show that the admin console is responsive.

## Import a book

18. Import a book:
  * Archive URL: https://archive-staging-tutor.cnx.org/contents/
  * CNX ID: ccbc51fa-49f3-40bb-98d6-07a15a7ab6b7@1.1
  * Using this first version of Bio collection b/c it only takes 90 seconds to import and the content doesn't matter for this demo
  * Observe that we report the UUID, Version, and provide a link to the content on CNX
  * Point out that we could also import a different book or a different version of the same book -- just won't because takes too long.

## Tags

1. Click on "Tags" menu item.
2. Search for "aplo"
3. Click on the "1.18" tag, show form data.

## District & School Setup

1. Click on "Districts" menu item
2. Click "Add district"
3. Set name = "Houston Independent School District" and click "Save"
4. Point out this is where we will be indicating that HISD has their own terms of use that has been pre-agreed to by the district on behalf of the students.
4. Click on "Schools" menu item
5. Click "Add school"
6. Set name = "Booker T. Washington High School", choose HISD and click "Save"

## Course Setup

7. Click "Courses" menu item
8. Click "Add course"
9. Set name = "AP Biology", choose the high school, and click "Save"
10. Click "Edit course" -- point out the different tabs
  * Bug: Selected school not showing up in dropdown
11. Choose Jimbo as the teacher (for sake of speed)
  * Feature needed: remove teacher
12. Go to "Course books" tab.
13. Choose the one book we imported and click "Submit"
14. Click "Periods" tab.
15. Add two periods: "1st" and "2nd"
  * Would be nice to return to the periods tab after creating each period
16. Go to "Student roster" tab
17. Import CSV files into the two periods

## Student sign up

18. Paste into Skype the email sent to Kim
19. Copy the link from that email into an incognito browser
20. Show the invite page -- intent at this point is to be able to choose a password, but that currently isn't working.

## Changing User Info

1. As Admin in Tutor, show that can't edit users (explain that it isn't within Tutor's power to change generic Accounts credentials/info)
2. Jimbo is already an admin on Accounts (the first user of Accounts is automatically an admin in development -- in production we could do a command line call to make him an admin).
3. Go to Accounts, click "Dev console" -- in production this is only available to admins and is called the "Admin console".
4. Click on "Users" tab and search for kjd
5. Here's where Kim's account can be edited by an admin.  Click "Edit"
6. Note that Kim's kjd@example.com address is already verified -- this is because we clicked on her invite email link.
7. On this screen we can manually verify a user's email address (happens occasionally that users can't find email confirmation emails, whether they are in spam or whatever), or add a new email address and verify it.
  * Feature: should be able to delete unverified emails (maybe verified emails but that is trickier)
8. Change Kim's name.
8. Note that cannot reset Kim's password here.  This is because she does not currently have a password (not all accounts users will)
  * Makes me wonder if we need to disable social login for school users or somehow require that they set up a password authentication, in the likely case that their school blocks facebook etc.
9. Go back to user search and search for "admin" and see that Jimbo's password can be changed.

## As Jimbo, See Student Roster / Book Content

1. Go back to Tutor
2. As Jimbo, click "Main Dashboard" from admin menu
3. This will bring up calendar for one course
4. Click "Course Settings" in dropdown in top right
5. See Students
6. Click on a day and "add Reading"
7. Show readings, then click "Browse Book"

