In-App downtime notifications
---------------------

I propose that we store a single `manifest.json` file in a known location on a s3 bucket which has the following settings:

 * CORS enabled for wild-card origin GET requests
 * Global read access
 * Caching headers

The `manifest.json` location will be given to apps as part of their boostrap and/or build configuration.

Tutor, CC and other web apps will then make a conditional request for the manifest.json periodically while active.

By sharing a common manifest file between apps we can prevent duplicate display of notifications on applications that share a common domain, such as CNX & ConceptCoach.

The manifest.json will use the following structure:

```javascript
{
   notifications: [
     {
       "notice-id": "A unique string"        // app will store this as a cookie to prevent duplicate fetch & display
       "site-ids": [ 'tutor', 'cc', 'cnx' ]  // which websites should display the notification, if omitted, all products will display it
       "valid-from":  "ISO 8601 date-stamp"  // optional
       "valid-until": "ISO 8601 date-stamp"  // optional
     }
  ]

}
```

After requesting the manifest file, the application will check the valid notices against a notification cookie.  If a notice should be displayed,  it will then make a request to the same s3 bucket for `notice-id.json`

The notice will have a structure of:

```javascript
{
   "type": "one of info, warning, or error",               // used to style notification
   "title": "plain text title, limited to 40 or so chars", // app may display this as bold or something
   "message": "plain text notification, unlimited length, but should be fairly short to fit on ui"
}
```

The app will then display the message along with a dismiss action.  Once the notificaiton is dismissed or some other app-specific event has occured, the notification id will be stored in the notification cookie so it will not be re-displayed.
