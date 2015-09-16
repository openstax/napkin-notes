# OpenStax::RescueFrom Gem

## Motivation

Currently, we handle the logging and emailing of exceptions mostly differently on each site.  Some sites deal with exceptions in just requests, others handle it in requests and background jobs.  Here are the files of interest.

1. tutor-server
  * [requests](https://github.com/openstax/tutor-server/blob/master/config/initializers/controllers.rb)
  * [jobs](https://github.com/openstax/tutor-server/blob/master/config/initializers/active_job.rb)
2. accounts
  * [requests](https://github.com/openstax/accounts/blob/ddb9dabfba0a0317b6062dfecdd5fb0f50c1025f/config/initializers/controllers.rb)
3. exercises
  * [requests](https://github.com/openstax/exercises/blob/23091c7478ee98b879b5371116f783fa4becc332/config/initializers/controllers.rb)
4. exchange
  * [requests](https://github.com/openstax/exchange/blob/37eb63bb3c226dafe16e0e89a22c1b40bd244cc5/config/initializers/controllers.rb)

As the other sites grow to handle exceptions in background jobs, we'll have 8 different pieces of code doing almost exactly the same thing.  OpenStax College's sites as well as Linkify will also have a need for high-quality, standard reporting of these errors.

For these reasons we want to make a tiny gem to hold this common functionality.

## Goals

1. The gem should have a lot of default settings that can be overriden through its configuration for app-specific purposes.  E.g. ActiveRecord::RecordNotFound should by default map to `:forbidden` and not notify in the logs or through email.
2. Would be nice to have mostly the same code that can deal with exception from requests or from background jobs.  This means that the code will need to be able to cope with the `request` object not being present when the exception comes from a background job.

## Sketch

```ruby
# config/initializers/controllers.rb

ActionController::Base.class_exec do
  rescue_from Exception, with: OpenStax::RescueFrom.controller_proc
  ...
```

```ruby
# config/initializers/active_job.rb

class ActiveJob::Base
  rescue_from Exception, with: OpenStax::RescueFrom.job_proc
  ...
```

Doesn't necessarily have to be `job_proc` vs `controller_proc` -- lots of possibilities for names, instances, etc.

```ruby
class OpenStax::RescueFrom

  # whether these are class methods or instance methods with singletons, etc
  # is up for debate
  def self.handle(exception_class_or_name, options={})
    options[:status] ||= :internal_server_error
    # ... other defaults ...
    options[:notify] ||= true

    # store the information off so we can look it up later when an exception comes
    # in; if we already know about the exception class, overwrite that knowledge
  end

  handle('ActiveRecord::RecordNotFound',
         :notify => false,
         :status => :not_found)
  # ... a bunch of default behavior for common exceptions ...
  handle('OAuth2::Error',
         :notify => true,
         :extras => lambda { |e|
           {
             :headers => e.response.headers,
             :status => e.response.status,
             :body => e.response.body
           }
         })

  # a bunch of other code like what we have now to actually do the work of rescuing,
  # logging, emailing, etc.
end
```

```ruby
# config/initializers/rescue_from.rb

OpenStax::RescueFrom.configure do |config|
  config.email_prefix = "[Tutor]"
  config.email_sender = '"OpenStax Tutor" <noreply@openstax.org>'
  config.email_recipient = ...
  ...
end

OpenStax::RescueFrom.handle(MyAppSpecificException1, notify: false)
OpenStax::RescueFrom.handle(MyAppSpecificException2, notify: false)
OpenStax::RescueFrom.handle(ActiveRecord::RecordNotFound, notify: true) # an override
```

## Implementation

[The controller exception code in tutor-server](https://github.com/openstax/tutor-server/blob/master/config/initializers/controllers.rb) is our most up-to-date code and should likely be the implementation referenced in this work.

If at all possible, please make the code Ruby 1.9 compatible so it can be used from OpenStax Accounts.  Among other things, this means that exception causes will not always be available (not introduced until Ruby 2.1).

This gem will be the one to bring in and configure `ExceptionNotification`.

### Things that should be configurable

1. The sender of the exception emails.
2. The recipient(s) of the exception emails -- allow multiple
3. The log level used (default to error level)
4. The type-specific `respond_to` blocks for different types (e.g. to replace a standard `type.html { render blah blah }`)
5. ...

### Misc Notes

1. Like Dante does in the tutor-server implementation, it is probably a good idea to refer to exception classes by their string name, e.g. `'SecurityTransgression'` other than just by their class, `SecurityTrangression`.  This will help protect us when a particular site doesn't know about (can't load) a "standard" exception type for which the gem has default behavior.
2. Dante or JP will set up the rubygems info and the repository.

## Much Later Work

Down the line, it'd be cool to have the ability to silence a particular exception type or a particular exception type / message combination.  E.g. the "The user does not have a role in the course" exception that we were hammered with uselessly for weeks before a fix was released -- would be great to be able to silence those configurably without a code change.  Note in this case we wouldn't want to silence all `IllegalState` exceptions, just those with this message or a message that matches a particular regex.
