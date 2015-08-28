

## There Is One Deploy Tag to Rule Them All

The same tag should
be applied to all repos used by the deploy tool,
be unique,
and be at least pseudo-sortable.

The current list of repos is:
```
accounts  biglearn-algs    biglearn-demos      exchange   exercises-js       tutor-js
archives  biglearn-common  biglearn-platform   exercises  tutor-deployment   tutor-server
```
though this could change.

A tag with a structure like:
```
DEPLOY_<YYYYMMDD>_<HHMMSS>_<SHORT_HASH>
```
would work
but the details are flexible.

A tool should be created to generate these tags:
```
create_deploy_tag
```

## There are Tools to Create Deploy Tags

Tools should exist to facilite tagging of repos.

A simple tool to automate tagging one or more repos:
```
tag_repos <TAG> <REPOS>
```

and another wrapper which automates
both tag creation
and application:
```
tag_for_deploy <BASEDIR>
```

## The Deploy Tools Use/Create a Deploy Tag as the Basis for Deployment

Currently there are a lot of manual steps to the deploy process,
but I think they are in the midst of becoming more automated.

It seems we want the tools to have the following usage:
```
deploy --environment <ENV> --tag <TAG> --basedir <DIR>

where:
  <ENV>    environment name (dev, qa, production, kev, etc.)
  <TAG>    existing tag to deploy
  <DIR>    base directory of repos to deploy
```
where some arguments could have sensible default values:
```
<TAG>  create a new tag using tag_for_deploy
       and apply it to the currenly checked-out code
<DIR>  current directory
```

The deploy tool should
place the deploy tag
in the deploy environment
in a standard place
so developers and code
can easily access it.

## The Deploy Tag is Pushed to GitHub

In order for a deploy to be reproducible by others,
its deploy tag needs to be pushed up to GitHub.

There should be a tool for this:
```
push_tag <TAG>
```
and in the case of 'real' deploys,
this should be probably done automatically
by the deploy tools.

## The Deploy Tag is Visible to Users of Tutor

There should be an easy way
for any user of `Tutor`
to retrieve the deploy tag.
This will provide an unambiguous reference
for bug reporting
and deployment verification.

## More is Okay

Additional tags with additional meanings
(e.g., `v2.1.4-beta-final`)
do not conflict with this model
and are totally fine.

They do not, however, fulfill the needs described here.
