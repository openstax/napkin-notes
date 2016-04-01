# Roadmap -- Operation [Technical] Debt Collection

This operation is planned for two developers over the period of December into early January working in tandem on backend and devops features to better facilitate future developement by collecting and resolving elements of technical debt.

### Topics of Interest

These are the topics we'd like to cover:

- Continuous Deployment
- Automated Data Migrations
- Subscription Services (a nice to have)

And documentation, but that is kind of a given.

## Continuous Deployment

Connexions deployments have been riddled with success in the past, but it's still a hand crafted process that is not repeatable without a few key individuals. To that end, we hope to provide a solution for deploying connexions and connexion clones (for development, staging, load balancing, etc.).

What will this achieve?

- Provides a transactional release pattern for changes. This means, that we can both commit and roll back changes from the entire setup without leaving any piece in a halfway state.
- Enables developers to demonstrate their changes without paying unnecessary tolls and/or waiting for a bridge person(s) to open the gate.
- Provides a means for potentially releasing connexions to Amazon Web Services (AWS). (Note, it is currently technically impossible to completely release CNX on AWS.)
- Gives each developer access to a fully functional clone of cnx.org and all relative services.
- ...And it does a number of other things... https://en.wikipedia.org/wiki/Continuous_delivery#Benefits

Essentially, we are asking for this because it will facilitate **a means to do other work in an open, demonstrative, predictable and accelerated fashion.**

RESULT: [cnx-deploy](https://github.com/Connexions/cnx-deploy)

## Automated Data Migrations

One of the continuously contentious points of developing for CNX is the state of the database when changes are made. This has been an issue for as long as we can remember. And it's often exacerbated by having customized changes on production servers that do not have a reflection or shadow within the typical development environment. To alleviate this issue and provide a means for continuity and balance in the future, we are proposing the implementation of automated data migration.

Automation of data migrations is nothing new. Many high-level frameworks provide it built-in. For example, Ruby on Rails and Django both provide migration frameworks. We are not talking about recreating the wheel in this implementation, only putting wheels on an otherwise stationary vehicle.

RESULT: [db-migrator](https://github.com/karenc/db-migrator)

## Subscription Services

Many of our services poll for data rather than subscribe to change events. For example, when a user changes there title from "M.Ed." to "D.Ed.", our system does not update this in published content. The user's title designation would only update when and if content associated with that user is republished. This is because our systems polls for change.

A relatively simple and extremely powerful change to this paradigm is to use push instead of pull. The benefites of this pattern are: 1) systems are less chatty 2) decouples the data from the service 3) enables an immediate reaction to change.

There are two components in our codebase where we'd like to subscribe to changes:
1. events created by pubishing (to be consumed by authoring)
2. events created by accounts (to be consumed by publishing and possibly tutor or other clients).

The stories for these look like this:
* As a system (cnx-publishing), I want to know when a user has updated their information so this information is pushed to archive rather than polled on publish.
* As a system (e.g. tutor, cnx-authoring), I want to notify other services about when a publication event has been triggered, because it's important to let others know when something has happened, which prevents continuous polling of information from systems using the data.

## Documentation

In starting on the Continuous Deployment work, we've documented a number of fixes and improvements. The documentation is bound to increase in quality as well as quantity as we continue with the other work.

Documentation is particularly important in Connexions because (historically speaking) the design of the system often changes mid-stream. As such, many of the earlier design considerations evaporate, only to be rediscussed again in the future. Needless to say, documenting the design among other things, captures the purpose and intention of a project/component while doing the often more immediate task of describing how it works.
