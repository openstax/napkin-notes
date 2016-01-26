## Link to "login" to SF

https://github.com/openstax/tutor-server/blob/master/app/views/admin/salesforce/show.html.erb#L20

(and obviously I guess that localhost URL is not messing up production)

## Handling the oauth callback

https://github.com/openstax/tutor-server/pull/942/files

## We only allow one SF user at a time, this allows clearing that user

https://github.com/openstax/tutor-server/blob/master/app/views/admin/salesforce/show.html.erb#L20

## Libraries

We use [ActiveForce](https://github.com/ionia-corporation/active_force) which gives us models that wrap SF objects.  It uses [Restforce](https://github.com/ejholmes/restforce) which is a direct client to the REST API.

## The SF User we cache

https://github.com/openstax/tutor-server/blob/master/app/subsystems/salesforce/models/user.rb

shows getting info out of oauth data, also using refresh token, etc.

## The "app" in SF

The app in SF is a "Connected App" that has at least this scope: "Perform requests on your behalf at any time (refresh_token, offline_access)" -- (being able to permanently refresh tokens so they never expire, etc) -- and all callback URLs you need for your app, e.g. http://[all environments]/auth/salesforce/callback.

Then you need to put the consumer key and secret for that SF app in your code.

I recommend against trying to use individual user's API keys, as they reset when the user changes their password, or of course become invalid if the user leaves.
