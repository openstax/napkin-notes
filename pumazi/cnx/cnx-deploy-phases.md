# cnx-deploy Phases

## State of the system prior to cnx-deploy

<a href="cnx-deploy-phases/pre-cnx-deploy.png"><img src="cnx-deploy-phases/pre-cnx-deploy.png" style="height:200px;width:auto;float:right;" /></a>

The servers shown are old and clunky. steppe.cnx.rice.edu is/was experiencing hardware failures. The priority for replacing these services with cnx-deploy managed deployment of those services is catagorized by failures and age of the hardware and operating system.

## Phase One

<a href="cnx-deploy-phases/cnx-deploy--phase-one.png"><img src="cnx-deploy-phases/cnx-deploy--phase-one.png" style="height:200px;width:auto;float:right;" /></a>

This phase replaces steppe.cnx.rice.edu because it has experienced hardware failures. The front-end services running on this server are to be replaced and made redundant.

The additions in this phase are the following hosts:

* prod00 -- This is the lead load balancing (haproxy) server. All requests funnel through this server.
* prod01 & prod02 -- These are identical servers meant to provide a redundant front-end. These servers contain the caching service (varnish) and static asset web service (nginx).
* prod03 -- This server is specifically used to cache for and load balance the zope clients (aka frontends).
* prod-files00 -- A replacement for NFS (network file system) services running on steppe.cnx.rice.edu and files.cnx.org.

The following components are deployed in this phase: webview, nginx, varnish, haproxy and nfs.

## Phase Two

<a href="cnx-deploy-phases/cnx-deploy--phase-two.png"><img src="cnx-deploy-phases/cnx-deploy--phase-two.png" style="height:200px;width:auto;float:right;" /></a>

This phase focuses on replacing the servers running zope components (zeo, zclients and pdf-gen). The priority for replacement of these servers is higher because the software can only theoretically be reproduced and the OS is out-of-date.

The additions in this phase are the following hosts:

* prod04 -- A server setup to host the zeo service and a few zclients (zope frontends).
* prod05 -- A server dedicated to serving several zclients.
* prod06 -- A server dedicated to pdf generation.

The following components are deployed in this phase: zeo, zclients and pdf_gen.

## Phase Three

<a href="cnx-deploy-phases/cnx-deploy--phase-three.png"><img src="cnx-deploy-phases/cnx-deploy--phase-three.png" style="height:200px;width:auto;float:right;" /></a>

This is prepare cnx-deploy for production deployment of the cnx-suite and supporting components:

The additions in this phase are the following hosts:

* prod-db00 -- A server dedicated to the PostgreSQL database service.
* prod-db01 -- A server dedicated to the replication of the PostgreSQL database.
* prod07 -- This server will run the archive & publishing processes.
* prod08 -- This server will run the archive & publishing processes.

The following components are deployed in this phase: postgres, memcached, archive, publishing and post-publication (and possibly press & transformation services).

## Phase Four

No new servers are to be added during this phase. One additional process will be added to prod07 and/or prod08 to do post publication processing (aka post_publication). Code updates containing the Common Textbook Experience feature will be rolled out this this phase. All subsequent routine deployments should be similar to the actions taken in this phase.
