# Missing Repos

The following is the list of repos needed for "typical" developer deployment.

```
for i in accounts exchange exercises exercises-js tutor-js tutor-server biglearn-algs biglearn-demos biglearn-common biglearn-platform tutor-deployment ; do git clone http://github.com/openstax/$i ; done
```

# My Steps

```
mkdir deploy_yymmdd_hhmm
cd !$
```

```
for i in accounts exchange exercises exercises-js tutor-js tutor-server biglearn-algs biglearn-demos biglearn-common biglearn-platform tutor-deployment ; do git clone http://github.com/openstax/$i ; done
```

```
cd tutor-deployment
mkvirtualenv -p /usr/bin/python2 tutordep
workon tutordep
pip install -r requirements.txt
```

Note the use of the environment name (`kev` in this case; customize as appropriate) in the command below:
```
ansible-playbook -i environments/kev/inventory tutor.yml --vault-password-file ~/.vaultkev --private-key ~/.ssh/tutor_kev.pem

to skip config steps (when re-deploying):

ansible-playbook -i environments/kev/inventory tutor.yml --skip-tags "configuration" --vault-password-file ~/.vaultkev --private-key ~/.ssh/tutor_kev.pem
```
