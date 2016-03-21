```
'learners'
  'id':Integer                primary_key=True
  'analysis_id':String(255)   nullable=False               ## BigLearn's cross-platform learner id
  'platform_id':String(255)   nullable=False unique=True   ## platform-specific learner id (used when querying) [Q: ensured unique by Exchange?]
```
[POST /facts/learners API schema](https://biglearnadmin-qa.openstax.org/docs/facts.html#post--facts-learners)
