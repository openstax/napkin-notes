## Why Would We Ever Want Such a Thing?

* Admins Need to Know What Code to Deploy

* Users Need to Verify What Code They're Running

* Users Need to Identify Code in Bug Reports

* Developers Need to Reproduce Environments for Debugging

## There Is One Deploy Manifest to Rule Them All

A deply manifest
is a text file
containing one commit hash
per deployed repo:
```
tutor-server      d969dc1f88eabe71577157884604fddd05a6e497
tutor-js          f5476fdb225482e195d84828aae9fb4d6b72e91d
biglearn-platorm  817ad1bea59a76732c6142f499618ae3cb7d3728
...
```

Manifests are committed
to a `tutor-manifests` repo,
and referenced unambiguously
by their path, filename and commit hash:
```
git show <hash>:<path><filename>

where:
  <hash>      = git commit hash (can be abbreviated)
  <path>      = path to manifest file (see below)
  <filename>  = manifest filename (see below)
```

Manifest filenames have the form:
```
manifest_YYYYMMDD_HHMMSS_<hash>

where:
  YYYY    = year
  MM      = month of year  (01..12)
  DD      = day of month   (01..31)
  HH      = hour of day    (00..23)
  MM      = minute of hour (00..59)
  SS      = second of hour (00..60) <-- yes, that's correct...
  <hash>  = 6(?) random hex characters to protect against accidental collisions
```
where all times should probably be Zulu (GMT).

Manifest files are placed in one of two repo directories:
```
  .../shared/    = shared manifests (pushed to GH)
  .../working/   = expermimental, local manifests (not pushed to GH)
```

## Deply Tool Usage

```
deploy --env <ENV> [--dir <BASEDIR>] [--manifest <MANIFEST>]

where:
  <ENV>      = target environment (dev, qa, demo, production, etc.)
  <BASEDIR>  = directory under which repos are located
               (default: '.')
  <MANIFEST> = manifest git filename (<hash>:<path><filename>)
               (default: create new manifest)
```
or:
```
deploy --share <MANIFEST>

where:
  <MANIFEST> = manifest git filename (<hash>:<path><filename>)
```

Note that there will likely be many additional control flag
(partial vs complete deploy,
resetting of databases, etc.)
that are not shown here.
They will have sensible defaults.

## Deployment Workflow

### Deployment from Currently Checked-out Code

```
deploy --env <ENV> --dir <BASEDIR>
```
A new manifest will be created
in the `.../working/` directory of `tutor-manifests`
and committed on the `working` branch
(which will be created if necessary).

The workflow will automatically continue
using the newly-created manifest
as described below.

### Deployment from Existing Manifest

```
deploy --env <ENV> --dir <BASEDIR> --manifest <MANIFEST>
```


### Sharing of Manifests

```
share <MANIFEST>
```

The current list of repos (though subject to change) is:
```
accounts  biglearn-algs    biglearn-demos      exchange   exercises-js       tutor-js
archives  biglearn-common  biglearn-platform   exercises  tutor-deployment   tutor-server
```

A tag with a structure like:
```
DEPLOY_<YYYYMMDD>_<HHMMSS>_<SHORT_HASH>
```
would work
but the details are flexible.

## These Tags Don't Move or Get Deleted

Just in case anyone was wondering...

## There are Tools to Create Deploy Tags

Tools should exist to facilite tagging of repos.

A tool should be created to generate these tags:
```
create_deploy_tag
```

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

Note that if no tag is given to the deploy tool,
a new tag is created,
applied it to the codebase,
and used it as the basis for deployment.
If a tag is given, however, no tags are created.

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
