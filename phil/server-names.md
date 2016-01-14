Product | Dev | QA | Staging | Production
--- | --- | --- | --- | ---
tutor | tutor-dev.openstax.org | tutor-qa.openstax.org | tutor-staging.openstax.org | tutor.openstax.org
archive | archive-dev.openstax.org | archive-qa.cnx.org | archive-staging.cnx.org | archive.cnx.org
cnx w/o editor | dev.cnx.org | qa.cnx.org | staging.cnx.org | cnx.org
cnx w editor | alpha.cnx.org | | | beta.cnx.org
legacy | legacy-dev.cnx.org | | | legacy.cnx.org
textbook | textcode-dev.cnx.org | textcode-qa.cnx.org | | 
 | textcode-dev#.cnx.org | | |

# Questions

- What about other servers?
  - accounts.openstax.org
  - exercises.openstax.org
  - exchange.openstax.org
  - biglearn
  - publishing.cnx.org
  - CNX transform services
- When do things update?
  - automatic? By user?
- What datasets are on the various machines?
- Security: Do we have to worry about cookies/sessions percolating since we're using subdomains?
- Why `archive-qa` instead of `qa-archive`?

# Naming suggestions

- `master.tutor.openstax` instead of `tutor-dev.openstax`
  - clear that it updates when master updates
- `sandbox.*` instead of `tutor-demo` makes it clear the data can be wiped any time
- `staging.archive.cnx.org` a prefix makes it easy to prefix all the other config files for all the other servers this one talks to
  - by default. unless you override it when deploying somehow

Phil's notes:

On the other hand, `archive.qa.cnx.org` can restrict IP's easier, session cookies easier
