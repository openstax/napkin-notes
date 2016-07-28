#DevOps  Procedures

#### Dump Remote Rhaptos Repository to a Local Machine
```
createuser -U postgres -s rhaptos
createuser -U postgres -s backups
createdb -U postgres -O rhaptos repository
ssh richh@legacy-textbook-qa.cnx.org "pg_dump -U postgres repository" | psql -U postgres repository
```
