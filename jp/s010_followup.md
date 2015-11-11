## Performance Book

1. Order tasks by due date (unordered now)
2. Filter out any tasks that are not 'reading' or 'homework' type (me adding practice tasks to the setup script is what caused the performance book to not work during demo)
3. Try to improve the queries (preloading, including submodels) so it is faster

## Learning Guide

1. Specs
2. I think Phil / Darren removed the duplicate 'id' field you were worried about Joe
3. Ask phil to merge the napkin-note PR on the learning guide API

## Fix CreateProfile

1. Change it so it doesn't take a `attrs` field (kind of like taking `options={}`, which is problematic)
2. People are calling it with passwords, but nothing is happening with those.
3. What is the purpose of this routine?  Just for test/dev?  If so, consider moving to dev folder.  
4. Take name arguments as well to set in account?

## Lev

1. when a fatal_error occurs we should know that immediately.  Lev was built with web forms in mind and there we needed to gracefully bubble up the error.  For most of our uses tho, we need to know right away.  Expressly running a routine converts errors to exceptions.  We need to generalize this and maybe make it happen configurably.

## In general

1. Start favoring named arguments over unnamed arguments or `options={}` arguments.

## Fix the TOC visitor (without breaking other users)

1. Right now the TOC visitor doesn't return the title of the book (it returns one level down from the top of the TOC which worked for an old collection that had a part titled 'root' at the top, but not for the sample book which has a top-most part with the real book title).  Might need to talk with Content team / CNX to figure out differences between the formats.  Learning guide should be giving back the book title at the top level but it can't because of how the TOC visitor currently assumes the top level should be thrown away.

## Rake script

1. We need to make the rake script easier to maintain.  I'm thinking more private methods and storing more individual variables (like storing Pages in an array so we don't continually have to use some query with an offset to get them). 
2. Would be cool for the rake script to look like a long list of one-line commands to set up the state.
3. Ideally we should have a spec for the rake script -- just to test that the endpoints provide the information we expect; otherwise we won't be able to maintain it (we'll never know if we're breaking old scenarios)

## SchemaPrinter

* Need to fix the schema printer to be able to handle cases where the decorator is chosen differently for different items in a list, e.g. https://github.com/openstax/tutor-server/blob/master/app/controllers/api/v1/courses/dashboard_representer.rb#L114-L123
* Used to be some way to do this with an Uber callable

## tutor-server issues

1. Look through recent tutor-server issues -- there are some small things to be done there.
