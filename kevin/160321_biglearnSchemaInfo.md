# `facts`
[schema definition in biglearn-platform repo](https://github.com/openstax/biglearn-platform/blob/master/app/biglearn/db/facts/schema.py)

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
[GET /facts/questios API schema](https://biglearnadmin-qa.openstax.org/docs/facts.html#get--facts-questions)
```
'id':Integer                  primary_key=True
'question_id':String(255)     nullable=False
'question_version':Integer    nullable=False  default=1 
'tags':ARRAY(db.String(255))  nullable=False
```

### `responses`
[POST /facts/responses API schema](https://biglearnadmin-qa.openstax.org/docs/facts.html#post--facts-responses)
```
'id':Integer          primary_key=True
'learner_id':Integer  ForeignKey('learners.id')      nullable=False
'question_id':Integer ForeignKey('question_tags.id'  nullable=False
'activity_id':String                                 nullable=False
'answered':DateTime                                  nullable=False
'score':Float                                        nullable=False
```

### `taxonomy`
```
'id':Integer                   primary_key=True
'tag':String(255)              nullable=False  unique=True
'types':ARRAY(db.String(255))  nullable=False
```
