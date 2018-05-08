## Proposal for verifying client releases for A15K

Our use of swagger for documenting the A15K code-base allows us to
auto-generate bindings for it's API in 40+ languages.

Once we've generated the clients how do we verify that they work and that they continue to function if we make changes to the server's functionality.

I propose we script the process so that each release of the client's code is stored in a "clients/version/language" directory.  We work from that copy to release to rubygems, pip, etc.  Once the client code is released we store a copy in git and use it to validate changes.

To do so we can write a command line script for each client library language that will run identical tests against the server.  The scripts will accept an identical set of command line arguments, one of which is the version number. They can then location the correct directory to find the client code and run the specs, exiting with a status indicating success or failure.

This will only work for interpreted languages, except we may be able to use Java via classpath trickery.
