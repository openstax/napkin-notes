
### `learners`
[POST /facts/learners API schema](https://biglearnadmin-qa.openstax.org/docs/facts.html#post--facts-learners)
```
'id':Integer                primary_key=True
'analysis_id':String(255)   nullable=False               ## BigLearn's cross-platform learner id
'platform_id':String(255)   nullable=False unique=True   ## platform-specific learner id (used when querying) [Q: ensured unique by Exchange?]
```

### `pools`
[POST /facts/pools API schema](https://biglearnadmin-qa.openstax.org/docs/facts.html#post--facts-pools)
```
'id':Integer   primary_key=True
'uuid':UUID()  nullable=False unique=True
```

### `pool_questions`
[POST /facts/pools API schema](https://biglearnadmin-qa.openstax.org/docs/facts.html#post--facts-pools)
```
'id':Integer          primary_key=True
'pool_id':Integer     ForeignKey('pools.id')         nullable=False
'question_id':Integer ForeignKey('question_tags.id') nullable=False
```

### `question_tags`
[POST /facts/questions API schema](https://biglearnadmin-qa.openstax.org/docs/facts.html#post--facts-questions)
```
'id':Integer                  primary_key=True
'question_id':String(255)     nullable=False
'question_version':Integer    nullable=False  default=1 
'tags':ARRAY(db.String(255))  nullable=False
```
