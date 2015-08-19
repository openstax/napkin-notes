# Missing Repos

The following is the list of repos needed for "typical" developer deployment.

```
for i in accounts exchange exercises exercises-js tutor-js tutor-server biglearn-algs biglearn-demos biglearn-common biglearn-platform tutor-deployment ; do git clone http://github.com/openstax/$i ; done
```

# My Steps

### Create a Deployment Directory
```
mkdir deploy_yymmdd_hhmm
cd !$
```

### Create Local Copies of Repos
```
for i in accounts exchange exercises exercises-js tutor-js tutor-server biglearn-algs biglearn-demos biglearn-common biglearn-platform tutor-deployment ; do git clone http://github.com/openstax/$i ; done
```

### Setup Python Virtual Environment
```
cd tutor-deployment
mkvirtualenv -p /usr/bin/python2 tutordep
workon tutordep
pip install -r requirements.txt
```

### Deploy Tutor-Related Servers (except BigLearn - see below)

Note: If re-deploying, you can add:
```
--skip-tags "configuration"
```
to the commands below.

#### All Servers

Note the use of the environment name (`kev` in this case; customize as appropriate).

```
ansible-playbook -i environments/kev/inventory tutor.yml --vault-password-file ~/.vaultkev --private-key ~/.ssh/tutor_kev.pem
```

Skipping configuration:

```
ansible-playbook -i environments/kev/inventory tutor.yml --skip-tags "configuration" --vault-password-file ~/.vaultkev --private-key ~/.ssh/tutor_kev.pem
```

#### Tutor Only

```
ansible-playbook -i environments/kev/inventory tutor_only.yml --vault-password-file ~/.vaultkev --private-key ~/.ssh/tutor_kev.pem
```

Skipping configuration:

```
ansible-playbook -i environments/kev/inventory tutor_only.yml --skip-tags "configuration" --vault-password-file ~/.vaultkev --private-key ~/.ssh/tutor_kev.pem
```

