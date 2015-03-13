# Travis-CI Streamlining

We use Travis-CI for running our automated tests when pull requests are issued/updated/merged.  

Tasks:

1. Make sure that all of our repositories are running tests using Postgres (not sqlite or MySQL).
2. Use Travis' new containerized infrastructure and caching
  * Follow instructions at http://docs.travis-ci.com/user/workers/container-based-infrastructure/ -- mostly this is just setting `sudo: false` I believe.
  * Follow instructions at http://docs.travis-ci.com/user/caching/ to turn on bundler caching
3. If for some reason we can't get bundler caching to work automatically (it should work)...
  1. Consider adding and using https://github.com/data-axle/bundle_cache to run our own bundle cache.  This would require setting up an AWS bucket for this purpose along with limited credentials that can only access that bucket.  If we go this route, we should estimate the AWS costs, specifically focused on transferring data (if gems are huge it could get expensive)
  2. Or if that alternative doesn't work or is too much of a pain, at least make sure that bundler is retrying its install.  This can be done by adding an explicit `--retry=6` option to the `bundle install` line (as in http://goo.gl/eZT9kq) or by using `bundler_args: --retry=6` which is probably better.  Note that if we have explicit `bundle install`s, we'll need to move their other options to `bundler_args` too.

Do these things for at least these repos:

* https://github.com/openstax/accounts
* https://github.com/openstax/tutor-server
* https://github.com/openstax/exercises
* https://github.com/openstax/exchange

Could also update the following gems (might not need postgres, depending):

* https://github.com/openstax/accounts-rails
* https://github.com/openstax/openstax_api
* https://github.com/openstax/exchange-ruby
* https://github.com/openstax/openstax_utilities
* https://github.com/openstax/action_interceptor
* https://github.com/lml/fine_print
* https://github.com/lml/lev