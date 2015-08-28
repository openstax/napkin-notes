

## There Is Be One Deploy Tag to Rule Them All

The same tag should
be applied to all repos used by the deploy tool,
be unique,
and be at least pseudo-sortable.

Something like
`DEPLOY_<YYYYMMDD>_<HHMMSS>_<SHORT_HASH>`
would work
but the details are flexible.

The current list of repos is:
```
accounts  biglearn-algs    biglearn-demos      exchange   exercises-js       tutor-js
archives  biglearn-common  biglearn-platform   exercises  tutor-deployment   tutor-server
```
though this could change.

## There are Tools to Create Deploy Tags

`tag_repos <TAG> <REPOS>`

`tag_for_deploy <BASEDIR>`

## The Deploy Tools Use/Create a Deploy Tag as the Basis for Deployment

## The Deploy Tags is Pushed to GitHub*

* except in dev/experiments that are not meant to be shared

## The Deploy Tag is Visible to Users of Tutor

