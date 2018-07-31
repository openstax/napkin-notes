### Single sign on prototype plan

In order to test single sign on, I propose that we create the following servers:

#### Accounts

Accounts will live at: `accounts.rdls.org`

We modify accounts so that when it logs in a userIsCourseStudent it also sets a cookie that:
 * contains only the user's uuid
 * has the domain set to `rdls.org` so that it will be shared across subdomains
 * sets the name of the session cookie to be `ox-prod-session`
 * can be shared with Django http://ewr.is/2012/03/1786-making-django-and-rails-play-nice-part-2
  * serialized using json
  * hmac encryption that is supported by both

We add a `/api/user/info` endpoint that reads the cookie and returns:
```json
{ id: "userid", name: "UserName", login: "mylogin" }
```

### A test "webpage page" server

Serves a website at `rdls.org`, but also has a cname so that it can be reached at `rdls.org`.  All XHR requests to it will use `rdls.org` so that the cookie can be read.

Serves a simple SPA with a configuration option that sets the domain to `rdls.org`

The SPA has a page that displays the results of an ajax call to accounts and the other servers and has a login/logout button that toggles depending on the state of those calls.

### A rails api server

Lives at `ruby.rdls.org`

also has a `/api/user/info` endpoint that reads the cookie above and returns:

```json
{ logged_in: true/false, id: "userid" }
```

serves a webpage at `ruby.rdls.org` which has login status and login/out buttons

### A django api server

Lives at `python.rdls.org`

also has a `/api/user/info` endpoint that reads the cookie above and returns:

serves a webpage at `python.rdls.org` which has login status and login/out buttons

```json
{ logged_in: true/false, id: "userid" }
```
