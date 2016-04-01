### Migration Procedure Notes

Random collections of commands for launch day. 

**DevOps Requirments**:  Nothing stored on local file except for application code.

#### Procedure:
```
#Export users from osc
env: osc$ rake db:dump_users 

# Alternative command 
env: osc$ RAILS_ENV=production rbenv exec bundle exec rake db:dump_users

# copy file to accounts

# Log in as ostaccounts user
env: accounts$ sudo su ostaccounts

#check oauth app list
env: accounts$ RAILS_ENV=production rbenv exec bundle exec rake accounts:oauth_apps:list 

# If Admin_Tool app does not exist create it
env: accounts$ RAILS_ENV=production rake accounts:oauth_apps:create APP_NAME=Admin_Tool USERNAME=admin REDIRECT_URI=http://localhost/callback 

# Import users into accounts db
env: accounts$ RAILS_ENV=production rbenv exec bundle exec rake accounts:import_users CSV_FILE=<filename> --trace APP_NAME=Admin_Tool

# Export user list from accounts db
env: accounts$ pg_dump -t users -U ostaccounts -h openstax-dev-db.casdfasdfnll.us-west-1.rds.amazonaws.com accounts_dev > user.sql

# copy file to local env.

env: localhost$ createdb accounts # might need to run rake db:create from accounts repo

# load users into empty accounts db
env: localhost$ psql -U postgres accounts < user.sql 

# generate table
accounts=# COPY users TO '/tmp/dev-users.csv' DELIMITER ',' CSV HEADER;
```
