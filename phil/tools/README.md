Misc repository-reporting scripts

# Setup

1. copy `.env-example` to `.env` and fill it out.
1. run `./script/setup` to install all the dependencies
1. run `./script/*` to generate the report
  - `./script/all-members` reports which teams and any individual repositories that members have permissions on
  - `./script/repo-test` reports which repositories are missing information (like a README, Travis, `all` team permissions, etc)
  - `./script/all-repos` reports which repositories do not have the `all` team permissions
