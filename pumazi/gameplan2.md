# Roadmap -- Paint By Number

This is planned for two (or more) developers over the period of the beginning of February to  mid-February (before the Openstax Gathering) working on backend statistics gathering methods. This will be used to provide informative realtime statistics to devops, developers and UX folks. Devops will be able utilize this information to help scale the applications. Developers will directly use this information to improve the speed of the application, verifiably correct issues and prove new features. Having metrics for change will project confidence in change (further leading to a culture of change) and provide accountability for the added/removed features.

### Topics of Interest

These are the topics this document addresses:

- Captured Metrics
- Implement Change
- Culture of Change (a nice to have)

And documentation, but that is kind of a given.

## Captured Metrics

The first stage and proof-of-concept is to capture metrics for page views. How long does a user wait before they can see the results of their request? Measuring this provides a high-level time based metric that can be cruedly used to measure improvement or decline in performance. It's a stepping stone to making more detailed metrics for specific peices of the system.

[A proof-of-concept (flask-metrics)](https://github.com/openstax/flask-metrics) was done for the biglearn project. The idea here is to measure response times as an indicator of performance. More detailed metrics are necessary, but this isn't a bad start.

The work to be done here is to fit a statsD layer over the CNX applications. For example, including [pyramid_metrics](https://github.com/ludia/pyramid_metrics) in the project would give us baseline metrics for response times. This alone wouldn't give us a lot of benefit, but it would provide us with information about performance over time.

## Implement Change

How would we measure a change to improve cnx-archive's search API? Right now, we use a mixture of postgresql's query analysis and timing statements over a wget. Worse yet, we may have someone do a search and mentally count how many seconds it takes, which is both inacturate and doesn't scope the problem. (Yes, we've done this in the past.)

This is not a scientific means of measuring the change.

Elimination of YMMV (your mileage may vary) when talking about change.

The tricky part of some change is that it takes time and a relative sample size to observe improvement or decline.

## Culture of Change

A **culture of change** is quite honestly a side-effect of providing proof that a change is valid and actually improves things. If the change passes tests and improves upon a metric, the change only needs to be discussed in terms of style and maintainability. This effectively automates some of the discussion points that may otherwise hold up change from happening.

No work is actually done in this topic area. Again, it's more of a positive side-effect of proofs and testing.

## Documentation

The goal here is to document the intended purpose of each metric. The intent may change over time, but at least we will have some understanding of why the metric was created to begin with. Many of the metrics are self explanitory to developers, but may not be to someone else (e.g. a UX analyst).
