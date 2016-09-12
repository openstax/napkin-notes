# Content Manager Press

## Table of Contents

* Product Description
* Product Usage Mockup
* Software Deliverables
* Strategy
  * Human Resource Needs
  * Suggested Action Timeline
* Tasks
* Abbreviations and Acronyms

## Product Description

A short lived project to address CPT1.01.01 as a service run in the OpenStax Cloud and used by Content Managers.

The CNX Press product has two components:

1. Command-line interface (CLI) -- Used by Content Managers to acquire and submit content for validation, preview and publication.
2. HTTP API -- Interacted with via the CLI to provide content validation, preview and publication.

The CLI acts as a wrapper around a fully functional an HTTP API. The HTTP API will run as a separate service from existing services because it will change architectural roles throughout its lifetime (see also Suggested Action Timeline). The CLI tool will therefore require only minimal dependencies, because the brunt of the work will be done in the external service.

The HTTP API service will be the component of this project that will change over time. It's anticipated CLI workflow a Content Manger uses will largely remain the same. Over time the HTTP API will add features (see Suggested Action Timeline for more details).

## Product Usage Mockup

The Content Manager (CM) will utilize this project via the terminal or command-line. Tenatively for the purpose of this document we'll call the executable CLI component: `berg`.

Here are a number of different ways to potentially use the CLI:

(Note, `<stderr>` here just denotes that the output is over stderr, not that is is actually printed.)

Download:

```sh
$ berg download col11406/latest
Downloading col11406 version 1.9
... cached at ./.download-cache/col11406_1.9_complete.zip
./.download-cache/col11406_1.9_complete.zip
$ echo $?
0
$ berg download -q col11406/1.9
./.download-cache/col11406_1.9_complete.zip
$ echo $?
0
```

Acquisition and expansion:

```sh
$ berg get col11405/latest
Downloading col11405 version 1.2
... cached at ./.download-cache/col11405_1.2_complete.zip
Expanding to ./col11405
./col11405
$ echo $?
0
$ berg get -q col11405/1.2
./col11405
$ echo $?
0
$ berg get col11405/1.2
Downloading col11405 version 1.2
... using cached copy at ./.download-cache/col11405_1.2_complete.zip
Expanding to ./col11405
<stderr>./col11405 already exists, existing without expansion of the download
$ echo $?
1
```

The expansion part of this will delete the `index.cnxml` file and replace it with the `index_auto_generated.cnxml` file.

Validation:

```sh
$ cd ./col11405
$ berg validate .
Validating col11405 ...
Ok. :)
$ echo $?
0
$ echo "<content>foo bar</content>" >> ./m37151/index.cnxml
$ berg validate .
Validating col11405 ...
<stderr>Some xml validation message for about the extra xml
Failed. :(
$ echo $?
1
```

Login:

```sh
$ berg login
Username: *******
Password: xxxxxxx
Authenticating ...
<stderr>Failed to authenticate user *******.
$ echo $?
1
$ berg login
Username: *******
Password: *******
Authenticating ...
May the schwartz be with you. :)
$ echo $?
0
```

This will enable you to do authenticated actions, such as preview and publish.

List endpoints:

```sh
$ berg endpoints add --name local http://localhost:6543
$ echo $?
0
$ berg endpoints
ID               URL
---------------  -------------------------------------------------------------
dev (default)    https://press-dev00.cnx.org
local            http://localhost:6543
prod             https://press.cnx.org
qa               https://press-qa00.cnx.org
$ echo $?
0
$ berg endpoints --mark-default local
$ echo $?
0
$ berg endpoints | grep 'default'
local (default)  http://localhost:6543
$ echo $?
0
```

Publication:

```sh
$ cd ./col11405
$ berg publish .
Validating col11405 ...
Pushing source to <configured uri (e.g. https://press.cnx.org)> for publication
... Validating col11405
... Persisting m37151
... Persisting m37152 (changed) version 1.5
... <etc.>
... Persisting col11405 (changed) version 1.3
https://cnx.org/content/col11405/1.3
$ echo $?
0
$ berg publish -q .
http://cnx.org/content/col11405/1.3
$ echo $?
0
```

Preview:

```sh
$ cd ./col11405
$ berg preview .
Validating col11405 ...
Pushing source to <configured uri (e.g. https://press.cnx.org)> for preview
... Validating col11405
... Converting cnxml to html
... Building PDF preview
https://press.cnx.org/previews/ab98fe5
```

## Software Deliverables

Two new applications will be created.

1. CM CLI utility (`berg`) -- is the direct interface for the CMs to the HTTP API in the Press service.
1. Press service (HTTP API) (`press`) -- is an HTTP API we will use to mimic Zope style publications. It will also act as the hub for validating content and potentially prototyping a PDF preview service.

Three new library packages will be used/created to fulfill the implementation of the above applications:

1. `cnxml` -- for validating collxml and cnxml content. This package will likely contain the RNG files for validating the content and not much more than that.
1. `cnx-completezip` -- for constructing, deconstructing and validating the completezip format. This package will depend on `cnxml` for validating the contents of a completezip.
1. `cnx-db` -- an database abstraction library for unifying database interactions between projects (i.e. cnx-publishing and cnx-archive). Provides a layer of abstraction between HTTP and database interactions, though the library itself will be designed based on existing database logic found in cnx-publishing and cnx-archive.

As a side-effect, we will also be improving the `cnx-publishing` and `cnx-archive` codebase by unifying the database logic in `cnx-db`. This will unify, abstract and speed up the tests for these packages. Additionally, if future usecases arise that require access to the database (yes, it could happen... can you see the future?) we will be in a good position to simply use the database layer in those cases.




## Strategy

### Human Resource Needs

We'll need a project manager (Bruce P.) to lead scrum, slate the work for a sprints and update the timeline as needed.

We'll need 2-3 developers (Michael M., Ross R. and Karen C.) to effectively coordinate changes between 2 products. At any given point in time, there are only 2-3 tasks that can be done in parallel.

We'll need someone from QA (Alan C.) to facilitate and organize the testing.

The feedback collection activies will require someone (Alan C. maybe?). This might seem like a small amount of work. If done properly it should effectively caputure the user's thoughts enough so that the developer doesn't need to interrupt the resouce with future information gathering.

Deployments will require devops and hinge on `cnx-deploy` being in use. There will be some new provisioning of boxes if the parallel instance of `cnx-publishing` is used for the A and hidden B testing/comparison.

### Suggested Action Timeline

The **Task section** within this document is an example of a linear set of tasks with **deliverable checkpoints**. One or more checkpoint areas could be included in a sprint. The idea is is to deliver features as soon as possible. While they will not be complete, they will progressively get better and start to fulfill the Content Manager's (CM) workflow as we understand it.

The command-line interface (CLI) component, tentatively named `berg`, is the foundation for interacting with an external shared service, we are tentatively calling `press`, to do publications and other activities. The Press service will provide an HTTP API for validating, publishing, previewing, etc.

The CLI will be kept purposely simple and dependency-less (if possible) to make the application installable on any platform. By providing a solution for those that don’t want to or cannot install the required dependencies, we make a tool for a wider audience and utilize our existing system architecture in the process.

The Press HTTP API for submission of content in the completezip format. For the purposes of calling this service something useful, it is called CNX Press or just Press thoughout this document. It is also documented as `press` in the technical details of this document.

#### Prerequisites

The initial deliverables are building blocks that will be used throughout the project. We will create libraries for interacting with data. This will enable the the CLI and Press to share the same logic to achieve their goals.

#### Initial efforts

The initial efforts concentrate on establishing the foundations of the CLI component and have it installed on the CM's machine to solidify the practice of using the tool. Later, it will act as the main interface for achieving the CM's workflow.

By concentrating on the CLI first, we give a deliverable item that can be minimally used. This will establish a baseline ensuring that all CMs can and have installed the tool for use. This establishes the assumption that the core interface is installed and functional.

#### Interate ...

Initially, the Press HTTP API will accept completezip formatted content and validates it. Later we will take this same service add the ability to publish content to the archive similar to how Zope would have done the publication. This will crudely eliminate the need to publish via Zope. As a result, we can further work towards decommisioning Zope altogether.

#### Iterate ...

Press will provide a means for transforming the completezip payload to an internal EPUB. (This can be done in parallel with the Zope style publication. Think of it like an experiment for working out the kinks. Effectively it puts real eyes on the EPUB and html formats.) Doing this will repurpose the service as an Authoring component rather than a Publishing one. The service will start to look and act more like what `cnx-authoring` does and less like what `cnx-publishing` does. In fact, this change to transforming the content to use the internal EPUB is to allow Press to submit an EPUB as a publication payload to Publishing.

#### Iterate ...

Note, these later iteration items might not even be necessary, because by this time we may have been able to fully develop an authoring environment.

#### Iterate ...

Later still... we will completely disable the parallel Zope style publication logic. The service will now proxy information to Publishing.

#### Iterate ...

Finally, we throw Press away in favor of using Publishing directly.




## Tasks

### Implement `cnxml`

#### Description

Create the `cnxml` package that wraps the process for validating collxml and cnxml using the RNG files in the legacy codebase. This package can optionally provide a CLI interface component to invoke its logic (e.g. `cnxml-validate index.cnxml`).

#### Exit Criteria

* The `cnxml` package has been created and contains 100% test coverage.
* The unit tests should cover:
  * validation of a collxml document
  * validation of a cnxml document
  * cases that show error reporting for invalid collxml and cnxml
* A `v1.0.0` tag has been created and released.

#### Benefits

* Provides a reusable single purpose package.

### Implement `cnx-completezip`

#### Description

Create the `cnx-completezip` package for constructing and deconstructing a completezip file. This package should also utilize `cnxml` for validating the contents of the completezip. This package can optionally provide a CLI interface component to invoke its logic (e.g. `cnx-completezip show col11405_1.2_complete.zip`).

This can be based off the EPUB classes in `cnx-epub`. Please make notes where you improved things so that we can later refactor `cnx-epub` with this improvements.

#### Exit Criteria

* The `cnx-completezip` package has been created and contains 100% test coverage.
* The unit tests should cover:
  * validation of a completezip file structure
  * validation of the contents within the completezip file struture
  * cases that show error reporting for invalid completezip file structure
* A `v1.0.0` tag has been created and released.
* (nice-to-have) Captured notes on improvements to cnx-epub class structure.

#### Benefits

* Provides a reusable single purpose package.
* We'll stop recreating this everytime we need something that makes something that is completezip like.

### Implement `berg`'s `download` command

#### Description

See the Usage Mockup for CLI details. Acquire specific version information about the requested content before downloading. Error if the content does not exist. Create the download cache directory if it doesn't exist. Check the download cache for the requested content. Download the complete zip to the download cache. Outputs the location of the downloaded file.

#### Exit Criteria

* The Usage Mockup and the actual output match or have been adjusted
* `berg download --help` is helpful
* The unit tests should cover 100% of the `download` command:
  * creation of the download cache directory if it does not exist
  * error when the content cannot be found
  * error when the service is unavailable (legacy is down or you are disconnected)
  * uses the cached download when the same request is made again
  * Maps 'latest' to a version number before downloading, so that it can check the download cache
* A tag and release has been made.

#### Benefits

* Provides a single reliable action to acquire the completezip for a piece of content

### Implement `berg`'s `get` command

#### Description

See the Usage Mockup for CLI details. Utilizes the logic of `berg download`. Expands the content into a non-versioned directory (e.g. `col11405_1.2_complete.zip` expands to `col11405`). Outputs the location of the expansion directory.

#### Exit Criteria

* The Usage Mockup and the actual output match or have been adjusted
* `berg get --help` is helpful
* The unit tests should cover 100% of the `get` command:
  * error the expansion directory already exists
* A tag and release has been made.

#### Benefits

* Provides a single reliable action to acquire an expand the contents of the completezip

### Implement `berg`'s `validate` command

#### Description

See the Usage Mockup for CLI details. Outputs friendly message on success.

#### Exit Criteria

* The Usage Mockup and the actual output match or have been adjusted
* `berg get --help` is helpful
* The unit tests should cover 100% of the `get` command:
  * error the expansion directory already exists
* A tag and release has been made.

#### Benefits

* Provides a single reliable action to validate the contents of the completezip
* Provides the ability to validate the content before pushing for publication

- - -
Deliverable(s) reached: `berg {download, get, validate}`
- - -

### Create `press` HTTP service

#### Description

Create a distribution and package for the `press` HTTP API. It should be a pyramid application that responds to nothing in particular (404 everywhere).

#### Exit Criteria

* The `press` package has been created
* A tag and release has been made.

#### Benefits

* A separate package means we can easily throw away the service once the other tools have replaced it
* Will be a non-critical place to experiment with using cnx-db as an abstraction layer

### Implement `validate` within `press`

#### Description

Create the API endpoint for receiving and validating a completezip payload. Utilize `cnx-completezip` to do the validation. On validation error, the response should be the information coming out of the `cnx-completezip` library. On success, return 200.

(Optionally, experiment with [pyramid_swagger](https://pyramid-swagger.readthedocs.io/en/latest/) as a means for defining the endpoint's API definition.)

#### Exit Criteria

* The validation endpoint has been created and has 100% test coverage
* The tests should cover:
  * validation of a completezip file structure
  * validation of the contents within the completezip file struture
  * cases that show error reporting for invalid completezip file structure
* A tag has been created and released
* (nice-to-have) Usage of swagger.io and `pyramid_swagger` and notes about the good and bad of using it

#### Benefits

* A dependency-less service to validate content
* (optional) Experiments with a library and service that could be utilized to create and document our APIs

### Implement Authorization and ACLs in `press`

#### Description

Utilize `openstax_accounts` within `press` to authenticate users. Crib/steal logic from `cnx-publishing` where necessary. Please make note of any improvements to the stole code.

#### Exit Criteria

* Add basic authentication permissions to the validation endpoint
* Documentation on how to authenticate using `curl`, `wget`, `requests` or [`http`](https://httpie.org/) (recommended)
* The tests should cover:
  * authenticated validation using existing validation tests
  * failure to authenticate
* A tag has been created and released
* (optional) Document improvements made to any stolen `cnx-publishing` logic

#### Benefits

* Provides a means for acknowledging who made the request for publication, preview, etc.

### Implement `berg`'s `login` command

#### Description

See the Usage Mockup for CLI details. Utilizes the documented procedure in the work done while implementing the authentication and ACL in `press`. Provide a means for logging into the site. Save the credentials for followup actions. Output a friendly message on success.

#### Exit Criteria

* The Usage Mockup and the actual output match or have been adjusted
* `berg login --help` is helpful
* The unit tests should cover 100% of the `login` command:
  * authenticates against the `press` service (mocked)
  * save credentials/keys/cookie on success
  * error on authentication failure
* A tag and release has been made

#### Benefits

* Provides a way to authenticate with the service without doing any weirdness outside the tool

### Implement Zope-like publication within `press`

#### Description

Create the API endpoint for receiving a completezip payload. Utilize the work done in the previous validation endpoint to validate the content. Provide the same validate feedback as the validation endpoint.

After validation, commit the contents to the database making sure to use the legacy id and version in order to invoke the triggers associated with the legacy content. On success, return 200. On failure, log the failure & traceback and return 500.

(Optionally, experiment with [pyramid_swagger](https://pyramid-swagger.readthedocs.io/en/latest/) as a means for defining the endpoint's API definition.)
(Optionally, experiment with making this async.)

#### Exit Criteria

* The publish endpoint has been created and has 100% test coverage
* The tests should cover:
  * (should not cover) validation, because this logic is being reused
  * persistence of the content in the database
  * the triggers have run to a degree of success (we do not need to re-test the triggers here)
  * cases that shows logging an error during persistence
* A tag has been created and released
* (nice-to-have) Usage of swagger.io and `pyramid_swagger` and notes about the good and bad of using it
* (nice-to-have) Usage of async and notes about the good and bad, lessons learned

#### Benefits

* Provides a means of publishing legacy content without Zope

### Implement `berg`'s `publish` command

#### Description

See the Usage Mockup for CLI details. Gives information about the progress of the publication. Outputs URL to the published content (given from the `press` service`).

#### Exit Criteria

* The Usage Mockup and the actual output match or have been adjusted
* `berg publish --help` is helpful
* The unit tests should cover 100% of the `publish` command:
  * sends a completezip to the `press` endpoint
  * on error, let's the user know to contact the site adminstrator
  * on success, returns the URL of the published content
* A tag and release has been made

#### Benefits

* Provides a single reliable action to publish content
* Provides the ability to publish content outside of Zope

### Script deployment of `press`

#### Description

Build a play into `cnx-deploy` to deploy `press` to an external service.

(Optionally, set up `press` within a Docker container.)

#### Exit Criteria

* The `press` service has been setup in `cnx-deploy`
* (optional) A press Docker image has been created and released

#### Benefits

* Many of the dependencies required for local development can be pushed to an external service
* Now it can be deployed

### Deploy `press` as an alpha service over the `dev` environment

#### Description

Deploy `press` to the dev environment.

#### Exit Criteria

* `press` has been deployed to the dev environment

- - -
Deliverable(s) reached: `berg publish` & `press` service
- - -

### Collect and address feedback on usage of `press`

#### Description

Collect and record individual feedback about the usage/interactions the Content Managers are having with the `press` service through `berg`. Analyze the feedback for themes and shared painpoints.

Address any bugs by creating issues in the sprint's managment software of choice. Revise the product timetables based on the amount of revision, design changes, and issues added to the product backlog. Inform the stakeholders of the new timetable.

#### Exit Criteria

* Feedback has been recorded (captured in writing) in the form of issues (note, nothing is being done with this feedback; at this point no judgment is being made about the feedback, just that it exists; later developers will make judgments)
* Future tasks have been added to the product backlog (not the current sprint)
* Developers have judged the newly created tasks and estimated effort necessary for completion
* Stakeholders have been informed of the updated timetable

#### Benefits

* Gives the developers feedback in the form that doesn't interupt the current sprinting process
* Formally provides a information loop for all stakeholders

### Implement `berg`'s `endpoints` command

#### Description

See the Usage Mockup for CLI details. Creates, reads, updates and deletes (CRUD) endpoints for `berg` to work against. Up to this point, the endpoint has been hardcoded into `berg`. This provides a means for configuring and adjusting that configuration to work with more than one environment (i.e. dev, qa, prod).

Revise the `login` command to authenticate against a default or optionally a specific endpoint. Ensure that authentication information is mapped to specific services and that this information is not lost when switching endpoints.

Enable the use of an optional flag to set the endpoint on commands that interact with `press` services.

#### Exit Criteria

* The Usage Mockup and the actual output match or have been adjusted
* `berg endpoints --help` is helpful
* The unit tests should cover 100% of the `endpoints` command:
  * create, reads, updates and deletes endpoints
  * lists configured endpoints
* The unit tests should cover changes to other commands that use endpoints:
  * authentication is mapped to endpooints
  * commands that use `press` default to use the default endpoint
  * commands understand and use a specified endpoint when given
* A tag and release has been made

#### Benefits

* Provides a single reliable action for configuring endpoints without need to know a configuration format
* Provides the ability 

### Deploy `press` to the `qa` environment

#### Description

Deploy `press` to the `qa` environment.

#### Exit Criteria

* `press` has been deployed to the qa environment

- - -
Deliverable(s) reached: `berg endpoints` for choosing an endpoint & responsive adjustment to work moving forward
- - -

### Deploy `press` in production

#### Description

Deploy `press` to production.

#### Exit Criteria

* `press` has been deployed to production

### Implement cnxml to html conversion in `press`

#### Description

(TOO BIG, needs more decomposition)

Create the API endpoint for receiving a completezip payload. Validate the contents of the completezip. Convert all the contents of the completezip to an EPUB. Provide the same validate feedback as the validation endpoint.

Once the completezip is accepted and all the contents have been converted, run html validation on the content. Report the validation feedback similar to the validation endpoint.

After validation, persist the contents to the EPUB format on the filesystem.

A second endpoint should be created to enable downloading of EPUB artifacts. (This can be a static view to a filesystem directory.)

(Optionally, experiment with [pyramid_swagger](https://pyramid-swagger.readthedocs.io/en/latest/) as a means for defining the endpoint's API definition.)
(Optionally, experiment with making this async.)

#### Exit Criteria

* The creation of logic/functions for converting the contents of the completezip to an EPUB
* The tests should cover:
  * (should not cover) publication of the content
  * persistence of the EPUB artifact to the filesystem
  * cases that show useful debug information in the response during an error
  * cases that shows logging of errors
* A tag has been created and released
* (nice-to-have) Usage of async and notes about the good and bad, lessons learned

#### Benefits

* Provides a means for transitioning from legacy to `cnx-publishing` publications

### Implement parallel publication in `press`

#### Description

Modify the publication endpoint to invoke the logic for completezip to EPUB in parallel. Still in parallel and non-obstructive/blocking to the existing publication procedure, publish the EPUB to a `cnx-publishing` running in a parallel environment.

(Optionally, experiment with making this async.)

#### Exit Criteria

* Ensures the parallel processing of the conversion anf publication to `cnx-publishing` does not affect the existing publication process
* Ensures that if the configured url for the `cnx-publishing` instance cannot be reached, the publication is not interrupted
* The tests should cover:
  * (should not cover) publication of the content
  * persistence of the EPUB artifact to the filesystem
  * cases that show useful debug information in the response during an error
  * cases that shows logging of errors
* A tag has been created and released
* (nice-to-have) Usage of async and notes about the good and bad, lessons learned

#### Benefits

* Provides an A and hidden B procedure for seeing the results of actual publications

### Deploy a testing environment to compare the production publications of `press`'s parallel publications

#### Description

Deploy a second copy of `cnx-publishing` for `dev` and `qa` environments. This will require a copy of the database and the `cnx-publishing` and `cnx-archive` codebases. `cnx-archive` is being added a means of retrieving the published results for comparison with what is coming out of the main `cnx-archive`.

#### Exit Criteria

* `cnx-publishing` & `cnx-archive` have been deployed to dev and qa
* A copy of the database has been setup

#### Benefits

* Provides an isolated environment for casually testing the results of the future intended process
* Gives us a way to compare the results of the two forms of publication using the exact same input

### Adjust the `press` publication endpoint to proxy EPUB publications to `cnx-publishing`

Modify the publication API endpoint for receiving a completezip payload, to allow for receiving an EPUB payload. Continue as usual if the contents are a completezip. If the contents are an EPUB, proxy the request to the main `cnx-publishing` instance.

#### Exit Criteria

* Ensures the publication route accepts and proxies an EPUB payload to the main `cnx-publishing` instance
* The tests should cover:
  * (should not cover) publication of the content
  * proxying of the request to a `cnx-publishing` endpoint (mocked)
  * cases that shows logging of errors, such as connectivity issues
* A tag has been created and released

#### Benefits

* Provides a means for transitioning from `press` to `cnx-publishing` publications

### Adjust `berg`'s implemention of `publish` to allow for publication via EPUB

#### Description

Modify `berg publish` to allow for publishing of EPUB contents

#### Exit Criteria

* `berg publish` works the same as it did with a completezip, but uses an EPUB file structure instead
* The tests should cover:
  * sends an EPUB to the `press` endpoint
  * on error, let's the user know to contact the site adminstrator
  * on success, returns the URL of the published content
* A tag has been created and released

#### Benefits

* Provides the same workflow, but uses a different format

- - -
Deliverable(s) reached: `press` now does Zope-like publications and tries converstion based publications in parallel to a testing environment & `berg publish` now allows for EPUB publication directly to `cnx-publishing`
- - -

### Analyze the comparison of Zope-like publications and conversion publications

#### Description

Analyze the results of our A (`press`) and hidden B (`cnx-publishing`) publication activities. Answer the following questions and create followup tasks where needed. What are the differences between the two forms of publication? Are the backwards compatible conversions (html->cnxml) correctly working? (Or maybe by this point, it no longer matters?)

#### Exit Criteria

* Differences have been captured in the form of issues (note, nothing is being done with this captured data at this point; it is only being recorded. Developers will later analyze the contents to make judgments)
* Future tasks have been added to the product backlog (not the current sprint)
* Developers have judged the newly created tasks and estimated effort necessary for completion
* Stakeholders have been informed of the updated timetable

### Implement an html validator within `cnx-epub`

#### Description

Implement logic to validate the cnx html content.

Additionally, validate the html contents of the table of contents document, which represent Binders and TranslucentBinders.

(Optionally, find a library that will do EPUB validation for EPUB specific files.)

#### Exit Criteria

* `cnx-epub` provides logic/functions for validating html content
* The tests should cover:
  * validation of html content within Document objects
  * validation of the resulting html in a Binder object
  * cases that show validation error reporting
* A tag has been created and released
* (nice-to-have) Validation of the entire EPUB file structure

### Collect feedback on `cnx-epub`'s EPUB format as a publication format

#### Description

Doubtless, as the Content Managers start to work with html content, they will use the EPUB format. Collect and record individual feedback about the usage/interactions the Content Managers are having with `cnx-epub`'s  EPUB file structure. Analyze the feedback for themes and shared painpoints.

Address any bugs by creating issues in the sprint's managment software of choice. Revise the product timetables based on the amount of revision, design changes, and issues added to the product backlog. Inform the stakeholders of the new timetable.

#### Exit Criteria

* Feedback has been recorded (captured in writing) in the form of issues (note, nothing is being done with this feedback; at this point no judgment is being made about the feedback, just that it exists; later developers will make judgments)
* Future tasks have been added to the product backlog (not the current sprint)
* Developers have judged the newly created tasks and estimated effort necessary for completion
* Stakeholders have been informed of the updated timetable

#### Benefits

* Gives the developers feedback in the form that doesn't interupt the current sprinting process
* Formally provides a information loop for all stakeholders

### Prepare for removal of `press` service

#### Description

Determine what needs/requirements remain before the `press` service can be decommissioned.

#### Exit Criteria

* A document has been created analyzing the risk and rewards of decommisioning the `press` service
* Followup needs/requirements have been documented and/or future tasks have been created
* Stakeholders have been informed

#### Benefits

- - -
Deliverable(s) reached: `cnx-epub` html validation & `press` end-of-life determined
- - -

### Decommission `press` service

#### Description

Decommission the `press` service in favor of `cnx-publishing`.

#### Exit Criteria

* Ensure `berg publish` works against `cnx-publishing` without the aid of proxying the request through `press`

#### Benefits

* Puts us one step closer to the ideal

### (nice-to-have) Implement github push commits to validate within `press`

#### Description

Create an endpoint for recieving requests from github.com using its webhook protocol. Use the information in the request's payload to validate the contents of the repository using the existing validation endpoint logic. Persist the validation info for user consumption.

#### Exit Criteria

* Provides an endpoint for receiving github webhook request that validates the content of the repository
* Provides meaningful and persistent validation information to the users of the service
* Tests should cover:
  * successful request using a completezip file structure inside a git repository (mocked)
  * persistence of validation information for future consumption
  * viewing validation information after the fact
* A tag has been created and released

#### Benefits

* Automates the testing and validation of the content in a shared space
* Utilizes git's version control and github's interface for analyzing and accepting change

### (nice-to-have) Implement github tag to publish within `press`

#### Description

Modify the existing github webhook endpoint for to act on git tag creation or modification. Use the information in the request's payload to publish the contents of the repository using the existing publish endpoint logic. Persist a log of the activities for user consumption.

#### Exit Criteria

* Provides an endpoint for receiving github webhook request that publishes the content of the repository when a tag has been created
* Provides meaningful and persistent log of activies to the users of the service
* Tests should cover:
  * successful request using a completezip file structure inside a git repository (mocked)
  * persistence of activity log for future consumption
  * viewing activity log after the fact
  * errors when a tag has revised, rather than created (don't allow floating tags)
* A tag has been created and released

#### Benefits

* Automates the publication process as part of a version control workflow
* Utilizes git's version control and github's interface for analyzing and accepting change

## Abbreviations and Acronyms

* API = Application Programming Interface
* CLI = Command-line Interface
* CM = Content Manager
* HTTP = Hypertext Transfer Protocol
