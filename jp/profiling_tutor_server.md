# Profiling Tutor Server

There are a number of tools that could be used for profiling / performance improvement:

1. Bullet
  * `gem 'bullet'`
2. ruby-prof
  * `gem 'ruby-prof'`
3. rspec-prof
  * `gem 'rspec-prof', git: 'git@github.com:sinisterchipmunk/rspec-prof.git'` [See note](https://github.com/sinisterchipmunk/rspec-prof/issues/10)
4. NewRelic (developer mode)
  * `gem 'newrelic_rpm'`
5. rack-mini-profiler
  * `gem 'rack-mini-profiler'`
  * `gem 'flamegraph'`

## NewRelic

After playing with a number of the ones above, I think that NewRelic has a good bit of promise.  We already use NewRelic for production performance monitoring, but it can also be used in development mode.

### Turning it on locally

The NewRelic gem is already in our Gemfile.  If you don't already have a `config/newrelic.yml` file, generate one with:

`newrelic install Tutor`

Then...

1. Set the license key to be the blank string `''`.
2. There are 3 instances of `app_name` -- make sure to remove the quotes and brackets from each

In the development section the `developer_mode` setting should already be `true`.  Check out the docs on the [developer mode](https://docs.newrelic.com/docs/agents/ruby-agent/developer-mode/developer-mode).

For the moment, don't commit this config file until we figure out what we want for the real config file.

Now, when a server is running, you can visit `http://localhost:3001/newrelic` to see profiling stats.

### Case Study: CalculateTaskPlanStats

The `CalculateTaskPlanStats` routine (used by the quick look analytics) could use some performance tuning (among many others :-).

First, I ran the demo script to get us some data in the DB.

In one browser, open `http://localhost:3001/newrelic`.  You should see a NewRelic-branded page.

In another browser, log in to the Physics course as the teacher.  Click on the first iReading on the calendar to bring up the quick look analytics (which will trigger the `CalculateTaskPlanStats`).  After it loads, refresh the NewRelic browser.  You should see a table with the stats api listed:

![Table](https://www.dropbox.com/s/sahp2yalwp5y7rn/Screenshot%202015-07-11%2010.47.43.png?dl=0)

Clicking on the link, you'll see a summary of the call:

![Summary of call](https://www.dropbox.com/s/fwt0i9ld8pn9k94/Screenshot%202015-07-11%2010.48.11.png?dl=0)

This isn't all that helpful because by default NewRelic only profiles down to the controller method.  If you clicked on the "Details" link you'd see some more information about the DB queries but it wouldn't really help us figure out where the problems lie.

[This NewRelic page](https://docs.newrelic.com/docs/agents/ruby-agent/features/ruby-custom-instrumentation) has instructions on adding custom instrumentation.  There may be a better way, but what I've done here is to explicitly tell NewRelic to watch all the private methods in the `CalculateTaskPlanStats` routine, by adding this code at the **bottom** of that routine (gotta be at the bottom so the methods are already defined):

```ruby
  include ::NewRelic::Agent::MethodTracer

  add_method_tracer :generate_period_stat_data
  add_method_tracer :answer_stats_for_tasked_exercises
  add_method_tracer :exercise_stats_for_tasked_exercises
  add_method_tracer :page_stats_for_tasked_exercises
  add_method_tracer :generate_page_stats
  add_method_tracer :get_gradable_taskeds
  add_method_tracer :get_task_grade
  add_method_tracer :mean_grade_percent
  add_method_tracer :get_tasked_exercises_from_task_steps
  add_method_tracer :get_page_for_tasked_exercise
  add_method_tracer :group_tasked_exercises_by_pages
  add_method_tracer :generate_page_stats_for_task_steps
  add_method_tracer :no_period
```

Then I restarted the server (maybe not required depending on how Rails auto reloading is working), refreshed the Tutor page (gotta refresh in this instance instead of just clicking the iReading again because Tutor is caching the stats), then refresh the NewRelic browser and click on the stats API item in the table.

Now we see more details:

![Details after tracing](https://www.dropbox.com/s/nr1dqt4m8tewbgv/Screenshot%202015-07-11%2010.53.13.png?dl=0)

And we see that 40% of the time is spent in `get_page_for_tasked_exercise`, [seen here](https://github.com/openstax/tutor-server/blob/1a0cbe89302d4b91b4bfc2d984e9e17f3600c5b4/app/routines/calculate_task_plan_stats.rb#L99-L101).  This is no surprise in that we already knew this was a suboptimal way to get pages from tasked exercises (albeit the only way currently).

So the process here would be to knock that performance problem down and reanalyze.
