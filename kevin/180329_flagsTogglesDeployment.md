There is a bunch of unstandardized terminology
related to the devopment/release cycle
and enabling/disabling features.
What follows are the words I try to use
and what those words mean.

When it comes to features, 
we use the terms "deliver", "deploy", and "release" interchangeably.  
But here's how I think of it:

1. **Developed**: The feature (or some part thereof) exists in some version of the code on some branch in GH.
2. **Integrated**: The developed feature has been merged into a branch (usually `master`) that is destined for deployment.
3. **Delivered**: Some specific version of code containing the feature (usually on `master`) has been blessed by the QA process as being fit for deployment.  This is usually what devs think of as "done", though there are some caveats related to migrations and feature flags.
4. **Deployed**: The delivered feature is actually installed and running on servers in some environment (typically `production`).
5. **Released**: The feature is active for users.

In our current process, 
deployed equals released.
That means that features 
can't be integrated 
until they are releasable, 
otherwise they hold up
the deployment of other features. 
For non-trivial features,
that forces a lot of coordination
between dev teams, QA, product managers, etc.
This is because different people/teams
need to coordinate not just on the design of the feature,
but also on the details of its implementation.

Feature **flags** separate deployment from release, and:
1. allow devs to merge partially-implemented features into `master`, 
thus avoiding "integration hell" on large features
2. allow "dark releases", 
where a feature is fully implemented and deployed, 
but not released
3. once activated in an environment (e.g., `production`), 
are (typically) never turned off - see also (4)
4. are "short lived", 
in the sense that once the feature is released, 
the flags are removed to avoid code clutter
5. are needed for consistent UX when doing zero-downtime deployments

Feature **toggles** are part of the features themselves, 
so they don't map to these processes directly.  They:
1. allow data-driven control of system behavior (e.g., if User A paid $10, enable Feature Z)
2. can be toggled at will
3. are "long lived", in the sense that the toggle is part of the design (e.g., UX) of Feature Z
