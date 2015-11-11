Here's an exercises DB with a draft exercise containing logic and a generated figure.


The page to edit this exercise is:

http://localhost:3002/exercises/e5d/edit

You'll probably have to log in as me to access this exercise.  You can do this by clicking the "Dev Console" link in the upper right corner, clicking the "Users" tab, searching for "jps", then clicking "Sign in as" next to my name.
You may have already noticed that the integration of logic into the editor is not all the way there yet.  This is what I was working on a while back before getting pulled in other directions, so I kind of stopped mid way.
First, let's talk about the Library model in Exercises.  Libraries are (fairly obviously) bits of code that can be used by all authors.  In the future, we'll hopefully have a suite of convenience functions that authors can use (e.g. functions to give numbers in different random distributions, functions to select a random name from an array, etc etc).  
Note that libraries will not be limited to just JS.  We'll also eventually have libraries for Latex reusable macros (a requested feature from our users).  
You can access the libraries through the Dev Console, under the "Misc" tab, which takes you here:

http://localhost:3002/admin/libraries

In the DB above, there are two libraries:

Libraries are versioned resources in Exercises.  Once a library has been used by an exercise, it cannot be changed -- however, a new version can be created and then released/published.  Versions live in LibraryVersion models.
The "Setup" library is required by all exercises that have logic (it has a DB field marked to indicate that).  It contains the code that lets us control the seeding of the javascript random number generator.  Since we want to be able to address and reproduce any computer-generated variant of an exercise, controlling the seeding is very important (we always want variant 42 of question 87 to have the same "randomly"-generated content). 
The Raphael library wraps Raphael.js, providing some extra glue to let us embed figures from it.
If you click on the library links, you can see the code by clicking on the version number on the next screen (these UIs are all very rough).
Exercises are attached to LibraryVersions.  If you examine the exercise linked to above using the console you'll see that it is linked to two versions:

1.9.3-p392 :001 > ex = Exercise.find(5)
  Exercise Load (8.5ms)  SELECT "exercises".* FROM "exercises" WHERE "exercises"."id" = ? ORDER BY number ASC, version DESC LIMIT 1  [["id", 5]]
 => #<Exercise id: 5, locker_id: nil, locked_at: nil, number: 1, version: 1, license_id: 1, published_at: nil, embargo_days: 0, embargoed_until: nil, only_embargo_solutions: false, changes_solutions: false, created_at: "2014-01-18 17:05:48", updated_at: "2014-01-31 02:10:27", background_id: 101, title: nil, logic_id: 7> 
1.9.3-p392 :002 > ex.logic
  Logic Load (0.1ms)  SELECT "logics".* FROM "logics" WHERE "logics"."id" = 7 LIMIT 1
 => #<Logic id: 7, code: "x = Math.random();\n\ndrawing = RaphaelDrawing();\n \ne...", variables: ["x", "drawing", "answer_a"], created_at: "2014-01-31 02:10:27", updated_at: "2014-04-17 19:46:06", library_version_ids: [2, 3]> 

Versions 2 and 3 belong to the Libraries shown above.  

The exercise should look like:

![](https://github.com/openstax/napkin-notes/blob/master/images/templated-exercise.png)

Note that one big missing piece in the UI is that the Logic view doesn't show which library versions are selected or let the author change / add / delete library versions.  This needs to be added.  The plan is that only the "Setup" library is required.  The others will be optional.  In addition to supporting Raphael, we could have a different library for Paper.js, etc, and the author can choose what works best for them.  By caching these external libraries inside our LibraryVersions, we ensure that both derivations of this exercise and solutions to this exercise can continue to get the same results over time.
In this exercise, you can see that we define a random variable "x" and we also define a "drawing" variable.  These variables are exposed to the rest of the exercise content below.  If variables aren't listed in the "Available variables" section, they won't be accessible below.  Values for these variables can be inserted into Content areas by surrounding the variable names with equal signs, e.g. "=x=".  Note that I might not have connected the logic to all of the Content areas in the exercise yet, might only work for the top-level background Content for the exercise.  
The JS in the logic only runs in the author's editor window.  When an author clicks the "Save" button on the logic window, it generates data for the specified number of permutations and saves it to the exercise via an API call.
For Quadbase, we tried to run an exercise's JS server-side whenever a student viewed an exercise.  This had all sorts of issues (concurrency, working to sandbox the code, making it not suck up server resources, speed, etc, etc) to the point where we had to turn the feature off.  Switching to a world where the onus is entirely on the author to write and run the code makes the world a better place on all of these dimensions. 
If you click the little up / down arrows you can iterate through the permutations and see the figure and variables change dynamically.  When someone views an exercise (not in the editor) we'll just show one permutation.  We'll also let the permutation number (the effective seed) be passed as a URL parameter so that that one permutation can be accessed permanently.
