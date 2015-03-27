# Use Postgresql everywhere

As championed by Lakshmi and others, we'd like to move to using Postgresql in development mode
instead of SQLite as we now do.

I've opened a WIP PR to do so at: https://github.com/openstax/tutor-server/pull/139  It's very much still "in-progress" since the specs are still failing, but the migrations do succeed.

The Pivitol card assigned is: https://github.com/openstax/tutor-server/pull/139

This will allow us to easily verify that the migrations and more advanced queries we're writing will work in production just as they do in our development environments.  It'll also position us to use some of the more advanced features of Postgresql if we choose to.

Postgresql will require more configuration on each developers part than SQLite, but hopefully we can come up with a set of sane defaults that will make it relatively painless.

It looks to me like production uses this config:  https://github.com/openstax/tutor-deployment/blob/c9a16b801079ce0d469c23d3a5acfe613999eb81/templates/tutor/www/config/database.yml.j2

I'm considering configuring the `test` and `development` blocks of the database.yml file with a good set of defaults that can be overridden by environmental variables.  This should give flexibility to developers who want to have a common DB login with other databases on their system, or want to run PG with it's pg_hba.conf set to "trust".  **Opinions on this are most welcome**

#### Proposed changes to database.yml file

```yaml
default: &default
  adapter: postgresql
  username: <%= ENV['OX_TUTOR_DB_USER'] || 'ox_tutor' %>
  password: <%= ENV['OX_TUTOR_DB_PASS'] || 'ox_tutor_secret_password' %>

development:
  <<: *default
  database: <%= ENV['OX_TUTOR_DEV_DB_NAME'] || 'ox_tutor_dev' %>

test:
  <<: *default
  database: <%= ENV['OX_TUTOR_TEST_DB_NAME'] || 'ox_tutor_test' %>
```

#### Proposed documentation for README file

OpenStax Tutor uses the Postgresql database.  You'll need to install and configure that.

`sudo apt-get install postgresql postgresql-client postgresql-contrib libpq-dev`

Or using homebrew on OSX

`brew install postgresql`

Once installed, create a user and database.  By default Tutor will expect a database named 'ox_tutor_{dev,test}' owned by user 'ox_tutor' who has a password 'ox_tutor_secret_password'.  These can be overridden by setting environmental variables in your ~/.bash_profile or ~/.zshenv.  See the config/database.yml for details.

`createuser --createdb --pwprompt ox_tutor`

And then create the development and test databases:

`createdb --username ox_tutor ox_tutor_dev`

`createdb --username ox_tutor ox_tutor_test`
