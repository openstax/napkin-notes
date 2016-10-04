# Motivation and scope

Talking about what code version is where is getting increasingly difficult.

Current methods include using

* Milestone-based release animal nickname
  * Code tagged with corresponding version numbers
  * Used in [oer.exports](https://github.com/Connexions/oer.exports)
* Commit hash
  * Not human parsable, but exact
  * Used for deployments in `manifestly`
  * Used primarily by Tutor/Coach devs, devops, and QA
* Sprint-based naming
  * Non-specific, difficult to trace back to exact code
  * Used primarily by Tutor/Coach project managers and QA
* [PEP 440](https://www.python.org/dev/peps/pep-0440/)
  * Used in CNX


Here, we try to define a common way across OpenStax to version.  The versioning should:

* Easy for humans to reference
* Refer to an exact revision of the code
* Adoptable across all projects

Also, ideally, it would:

* Be used by and makes sense to all roles

# Method

Code will be given a version name and tagged when deployed to non-dev servers. **Once a tag is created, it cannot be changed.**  Version naming will [follow semantic versioning](http://semver.org/).

> Given a version number MAJOR.MINOR.PATCH, increment the:

> * MAJOR version when you make incompatible API changes,
> * MINOR version when you add functionality in a backwards-compatible manner, and
> * PATCH version when you make backwards-compatible bug fixes.
>
> Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.

Release candidates should be tagged/versioned with a suffix like so -- `v1.0.0-RC1`.  When the candidate becomes official and is released to production, the official release tag -- `v1.0.0` -- can then be added.

Version name will largely be determined by developers.  Potentially confusing will be how to decide between incrementing the `MAJOR` vs `MINOR` versions, especially for frontend codebases.  In these cases, increment as follows:

* MAJOR version when you make incompatible UI changes
  * redesigning, adding, or removing features
  * cross-feature/component/model/file refactoring
  * additional breaking dependency updates
* MINOR version when UI changes are minor
  * also per sprint release
* PATCH version is as stated above
  * i.e. hotfixes.

Since semver is a widely adopted versioning system, newcomers and outsiders will find the versioning familiar.  Additionally, for any packages that OpenStax may be put into a package management system, having semantic versioning will help with a standard install/setup process.

# Questions

1. Should there be a file, something like `.openstax-version` in the code with the version number?
  * No.
1. What number do we start at?
  * Project dependent.
1. Where should dependencies of versioning between OpenStax projects be recorded?
  * How to describe the range of dependencies between different projects?
  * Can the range be used to do some automated checking for whether or not the versions being used are compatible?
1. How many versions do we need to continue to support?
  * 2 -- the one in production and the one in development
  * Challenges with BE vs FE
1. What about projects that depends on multiple languages?  How do we describe language/package dependency?
  * Not fully discussed/outside of scope
  * Python
    * `requirements.txt`, `setup.py`, where to put Python version?
    * [tox.ini](https://tox.readthedocs.io/en/latest/)
  * Ruby
    * `Gemfile`, `.ruby-version`
  * JavaScript
    * `package.json`, `.nvmrc`


# Concrete Steps

1. Decide within projects what number to start with.
1. With this sprint/next release, tag code with version number.
1. Tag anything that gets released.

This topic was discussed at COP on 2016-09-27 and 2016-10-04.
