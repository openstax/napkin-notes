### Single sign on prototype plan

In order to test single sign on, I propose that we create the following servers:

#### Accounts

Accounts will live at: `accounts.prod.rdls.org`

We modify accounts so that when it logs in a userIsCourseStudent it also sets a cookie that:
 * contains only the user's uuid
 * has the domain set to `prod.rdls.org` so that it will be shared across subdomains
 * can be shared with Django http://ewr.is/2012/03/1786-making-django-and-rails-play-nice-part-2
  * serialized using json
  * hmac encryption that is supported by both

We add a `/api/user/info` endpoint that reads the cookie and returns:
```json
{ id: "userid", name: "UserName", login: "mylogin" }
```

### A test "webpage page" server

Serves a website at `rdls.org`, but also has a cname so that it can be reached at `prod.rdls.org`.  All XHR requests to it will use `prod.rdls.org` so that the cookie can be read.

Serves a simple SPA with a configuration option that sets the domain to `prod.rdls.org`

The SPA has a page that displays the results of an ajax call to accounts and the other servers and has a login/logout button that toggles depending on the state of those calls.

### A rails api server

Lives at `ruby.prod.rdls.org`

also has a `/api/user/info` endpoint that reads the cookie above and returns:

```json
{ logged_in: true/false, id: "userid" }
```

serves a webpage at `ruby.prod.rdls.org` which has login status and login/out buttons

### A django api server

Lives at `python.prod.rdls.org`

also has a `/api/user/info` endpoint that reads the cookie above and returns:

serves a webpage at `python.prod.rdls.org` which has login status and login/out buttons

```json
{ logged_in: true/false, id: "userid" }
```

### IMPORTANT CAVEATS

Because the cookie is sent to `prod.rdls.org`, it cannot be read by the webserver's BE when an html page is requested, since the html will be loaded from only `rdls.org`.  That means that the back-end process will not know if the user is logged in or not when a page is requested.

All the server can do is serve plain html and the JS client will then fill in the user-specific bits using data fetched from `prod.rdls.org`

If we need to have the webserver read the cookie, we could have accounts set the cookie on `rdls.org` if it's in "production mode".  Downsides to that is that the cookie will then be read from `dev`, `qa` etc.

https://xebia.com/blog/caveats-and-pitfalls-of-cookie-domains/ suggests that cookies sent from  `dev.rdls.org` will not overwrite cookies sent to `rdls.org`, and instead multiple cookies will be read.
