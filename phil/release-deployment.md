
- Master contains code decided on for this sprint.
- Long-running PR for big work, new branches for code someone else might be waiting on
- hotfixes are a new branch from a tag and get merged into master (and a new tag is created)
- Try to add Feature toggles
- git rebase for PR's

Also, Lakshmi's great doc: https://docs.google.com/document/d/1fd6jV5MKQIUFHz1mSv2O6GvsrHt9nBwyldibTIjTH8Y/edit


# Hotfixes

1. find the tag containing the bug (ie 11.0)
1. create a hotfix from that tag (ie `hotfix-all-the-errors`)
1. create a Pull Req to master
1. create a new tag based on `hotfix-all-the-errors` named 11.1
1. merge PR to master
1. using semver magic 11.1 is deployed
