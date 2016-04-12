### Migration Procedure Notes

Random collections of commands for launch day. 

**DevOps Requirments**:  Nothing stored on local file except for application code.

#### Pre Procedure:
```
Have django, accounts, and osc env up and running
```


#### Procedure:
```
#Export all users from osc  (File will export as a .csv)
env: osc$ rake db:dump_users 

# Alternative command 
env: osc$ RAILS_ENV=production rbenv exec bundle exec rake db:dump_users

# export a seperate faculty list of users using rails console.
# (Using rails console: RAILS_ENV=production rbenv exec bundle exec rails c)
faculty_users = User.joins{faculty_profile}.where{faculty_profile.is_verified == true}.all
require 'csv'
CSV.open("faculty.csv","w") do |csv|
  csv << ["last_name","first_name","college_website_url","email","institutional_email_address","department","address","phone_number"]
  faculty_users.each do |row|
    csv << [row.last_name,row.first_name,row.college_website_url,row.email,row.institutional_email_address,row.department,row.address,row.phone_number]
  end
end

# copy files to accounts production

# Log in as ostaccounts user
env: accounts$ sudo su ostaccounts

# Create admin (optional)
RAILS_ENV=production rbenv exec bundle exec rake accounts:create_admin[admin,password]

#check oauth app list
env: accounts$ RAILS_ENV=production rbenv exec bundle exec rake accounts:oauth_apps:list 

# If Admin_Tool app does not exist create it
env: accounts$ RAILS_ENV=production rbenv exec bundle exec rake accounts:oauth_apps:create APP_NAME=Admin_Tool USERNAME=admin REDIRECT_URI=http://localhost/callback 

# Import users into accounts db
env: accounts$ RAILS_ENV=production rbenv exec bundle exec rake accounts:import_users CSV_FILE=<filename> --trace APP_NAME=Admin_Tool

# Export user list from accounts db (this file is needed to match faculty users from osc with their new accounts id)
# found in config/database.yml
env: accounts$ pg_dump -t contact_infos -U ostaccounts -h openstax-dev-db.casdfasdfnll.us-west-1.rds.amazonaws.com accounts_dev > contact_infos.sql"

# Use "faculty.csv" and "contact_infos.sql" to match every faculty user to an accounts ID
# Give this file to salesforce

# Use "faculty.csv" and "contact_infos.sql" to generate a csv list of faculty users and import the list into cms system. 
```


