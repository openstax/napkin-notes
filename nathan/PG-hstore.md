## Installing HSTORE extension in Postgresql DB

There's three routes that can be taken to enable Hstore support in Tutor's Postgresql db

### Make db user a superuser

The simplest is to make the database user a db superuser.  If the db is setup in that way the Tutor migrations can enable hstore support.

* psql -U <login user> ox_tutor_dev
* alter user ox_tutor with superuser;
* \q <enter>

### Enable hstore support on the `template` db.

Postgresql has a "magic" db called `template1` which is used as the template when all new databases are created.  Any settings applied to `template1` are automatically applied when a new DB is created.

This will enable hstore on both template1 and the current `ox_tutor_dev` db.

* psql -U <login user> template1
* create extension hstore;
* \c ox_tutor_dev <enter>
* create extension hstore;
* \q <enter>


### Enable hstore support on only the tutor db

This will work but will not be persisted if the db is droped and re-created.  It'll need to be repeated manually after every "rake db:drop db:create".  It's listed because it's most likely the way a production Tutor instance would be configured.

* psql -U <login user> ox_tutor_dev
* create extension hstore;
* \q <enter>
