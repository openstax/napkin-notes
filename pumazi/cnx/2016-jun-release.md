# April 2016 CNX release

Two stage upgrade... First stage introduces a database change that will allow archive and zope to remain up at the same time. The second stage introduces the new features.

~~The first set of migration steps did take ~3hrs on cte-dev.~~ (Fixed in [Remove warning info from the migration](https://github.com/Connexions/cnx-archive/pull/427))

**TODO Post a summary version of these changes to blog.openstax.org** (O... I guess, I'll need to create `blog.openstax.org` first. :wink: )

## Deployment

### Stage One

#### Notes for cnx-deploy

*These notes have been commented out. View and edit the raw document, if you'd like to see them.*

<!-- - Deployed with `environment/vm2/all/vars.yml`: -->

<!--   ```yml -->
<!-- source_versions: -->
<!--   "cnx-epub": production -->
<!--   "cnx-archive": production -->
<!--   "cnx-publishing": production -->
<!--   ``` -->
<!-- - `ansible-playbook -i enviroment/vm2/inventory --vault-password-file ../vault-password.txt main.yml` -->
<!-- - `ansible-playbook -i enviroment/vm2/inventory push_data.yml` -->
<!-- - :camera: snapshot -->
<!-- - `ansible-playbook -i enviroment/vm2/inventory --vault-password-file ../vault-password.txt plone.yml` -->
<!-- - :camera: snapshot -->
<!-- - apply patch: -->

<!--   ```diff -->
<!-- diff --git a/tasks/install_archive.yml b/tasks/install_archive.yml -->
<!-- index 6a6f797..b63c395 100644 -->
<!-- --- a/tasks/install_archive.yml -->
<!-- +++ b/tasks/install_archive.yml -->
<!-- @@ -214,11 +214,11 @@ -->
<!--    register: archive_initdb_cmd -->
<!--    failed_when: "archive_initdb_cmd.rc > 0 and 'Database is already initialized' not in archive_initdb_cmd.stderr" -->
 
<!-- -- name: initialize db-migrator -->
<!-- -  # XXX (16-Mar-2016) standalone installs aren't ideal, because they don't give -->
<!-- -  #     the full picture of what archive is, but we'll roll with it for now. -->
<!-- -  when: "(standalone_archive_install is defined and standalone_archive_install) and 'Database is already initialized' not in archive_initdb_cmd.stderr" -->
<!-- -  command: "{{ root_prefix }}/var/cnx/venvs/archive/bin/dbmigrator --config {{ root_prefix }}/etc/cnx/archive/app.ini --context cnx-archive init" -->
 
<!--  - name: migrate database -->
<!--    # XXX (16-Mar-2016) standalone installs aren't ideal, because they don't give -->
<!-- diff --git a/tasks/install_publishing.yml b/tasks/install_publishing.yml -->
<!-- index 429c167..ee9e168 100644 -->
<!-- --- a/tasks/install_publishing.yml -->
<!-- +++ b/tasks/install_publishing.yml -->
<!-- @@ -244,12 +244,12 @@ -->
<!--    #       looking at the traceback line. -->
<!--    failed_when: "publishing_initdb_cmd.rc > 0 and 'psycopg2.ProgrammingError: type \"publication_states\" already exists' not in publishing_initdb_cmd.stderr" -->
 
<!-- -- name: initialize db-migrator -->
<!-- -  when: "'already exists' not in publishing_initdb_cmd.stderr" -->
<!-- -  command: "{{ root_prefix }}/var/cnx/venvs/publishing/bin/dbmigrator --config {{ root_prefix }}/etc/cnx/publishing/app.ini --context cnx-archive --context cnx-publishing init" -->
<!-- -  -->
<!-- -- name: migrate database -->
<!-- -  command: "{{ root_prefix }}/var/cnx/venvs/publishing/bin/dbmigrator --config {{ root_prefix }}/etc/cnx/publishing/app.ini --context cnx-archive --context cnx-publishing migrate" -->
 
<!--  # +++ -->
<!--  # Init service -->
<!--   ``` -->
<!-- - :white_check_mark: checkpoint :tada: -->
<!-- - Run db-migrator `/var/cnx/venvs/publishing/bin/dbmigrator --config /etc/cnx/publishing/app.ini --context cnx-publishing --context cnx-archive init --version 0` -->
<!-- - :camera: snapshot -->
<!-- - Deployed with `environment/vm2/all/vars.yml`: -->

<!--   ```yml -->
<!-- source_versions: -->
<!--   "cnx-archive": e3fa7d038607894c281433f9f3828b7597a3128b -->
<!--   ``` -->
<!-- - `ansible-playbook -i enviroment/vm2/inventory --vault-password-file ../vault-password.txt main.yml` -->
<!-- - :camera: snapshot -->
<!-- - Run db-migrator `/var/cnx/venvs/publishing/bin/dbmigrator --config /etc/cnx/publishing/app.ini --context cnx-archive migrate --version 20160128110515` -->
<!-- - :camera: snapshot -->

#### Preparation

- install [db-migrator](https://pypi.python.org/pypi/db-migrator) in the virtual-environment that contains cnx-publishing.
- `dbmigrator --config=/opt/demo/cnx-publishing/development.ini init --version 0`

- release [Products.RhaptosModuleStorage](https://github.com/Rhaptos/Products.RhaptosModuleStorage) @ `HEAD`

#### Update code

- cnx-epub @ `v0.10.0`
- [cnx-easybake](https://github.com/Connexions/cnx-easybake) @ `v0.6.0`

- cnx-archive @ `v2.5.1` (2.4.8 has a nasty long migration that locks the db)
- pip install setuptools==20.1.1` (bypass an error w/ funcsig)

- cnx-publishing @ `v0.6.0`

- Products.RhaptosModuleStorage as `egg @ 1.1.2`
- Products.RhaptosRepository as `egg @ 1.3.0`
- Products.RhaptosCollaborationTool as `egg @ 0.10.1`

#### Run migrations

This migration runs to a middle of the road solution,
where things will continue working while we transition to the next stage

`dbmigrator --config <publishing-config-ini> --context cnx-archive migrate --version 20160101000000`
`dbmigrator --config <publishing-config-ini> --context cnx-archive migrate --version 20160128110515`

Note, we purposefully leave `--context cnx-publishing` out of the command.
We will wait until stage two to introduce those migrations.

#### Change Code

 - revert archive to `v2.4.8`

#### Restart services

- restart cnx-archive
- restart cnx-publishing
- restart zope front-ends

Restarting these will use the changes and transition us
to a point where we can continue the database upgrade
while keeping the services up.


### Stage Two

#### Notes for cnx-deploy

*These notes have been commented out. View and edit the raw document, if you'd like to see them.*

<!-- - Deployed with `environment/vm2/all/vars.yml`: -->

<!--   ```yml -->
<!-- # source_versions: -->
<!--   ``` -->
<!-- - `ansible-playbook -i enviroment/vm2/inventory --vault-password-file ../vault-password.txt main.yml` -->
<!-- - :camera: snapshot -->
<!-- - **CHECK ZOPE IS WORKING BEFORE migration** -->
<!-- - **scrap the second migration migration** -->
<!-- - Run db-migrator `/var/cnx/venvs/publishing/bin/dbmigrator --config /etc/cnx/publishing/app.ini --context cnx-publishing --context cnx-archive migrate` -->
<!-- - :camera: snapshot -->

#### Update code

Make sure to update on both archive-server and db-server.
- cnx-archive @ `v2.5.0`

#### Run migrations

This migration runs away from the middle of the road solution.
This is the final set of migrations.

The last migration requires a user with superuser privileges. 

`dbmigrator --config <publishing-config-ini> --context cnx-publishing --context cnx-archive migrate`

#### Restart services

- restart cnx-archive
- restart zope FEs

Restarting these will bring everything up-to-date.

#### Webview

update beta to latest tip-of-master; cnx.org to tip of production

cp -a webview webview-2016_06_09

edit settings.js   - correct to exercises.openstax.org

npm update; bower update; grunt dist; ./purge.sh

#### publish fixes

connect to archive db.
run:

`insert into api_keys (key, name, groups) values ('b07', 'Authoring', ARRAY['g:trusted-publishers']);

restart cnx-publishing

## Testing

### Are things working between the stages?

- cnx-archive `https://archive.cnx.org/extras` => 200 Ok
- cnx-publishing `https://archive.cnx.org/a/` => 302 Found
- zope `https://legacy.cnx.org/content` => 200 Ok

Hit a few notable book pages on archive and legacy.

No features where added during the stage one deploy;
so nothing out of the ordinary should be happening.

### Is everything up?

- cnx-archive `https://archive.cnx.org/extras` => 200 Ok
- cnx-publishing `https://archive.cnx.org/a/` => 302 Found
- zope `https://legacy.cnx.org/content` => 200 Ok

### Can you view pages?

Hit a few notable book pages on archive and legacy.
Do a search or two on both archive and legacy.
Do a little dance!

### Are the new features functional?

Since nothing is using a ruleset (CTE styles) yet,
the feature cannot be tested.
What can be tested, is that no existing functionality has broken.

The following should not block the release,
because we won't be doing any collation in production just yet.
In fact, I'm leaving the instructions intentionally vague.
We will come back to them after the release is made.

Next step, is to talk to the textbook team.
Have them supply devops with a ruleset that we can inject into archive.
After the ruleset is in archive, manually invoke the collation.
This will enable you to test the archive routes deliver collated content.
:bug: I suspect webview will not be able to render composite-pages without modifications.



## Ignoring

- setting up api-keys for cnx-publishing (not used ATM anyhow)
