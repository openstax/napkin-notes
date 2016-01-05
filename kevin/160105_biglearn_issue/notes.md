It seems that
`Tutor` is calling `BigLearn` 
to populate the personalized exercises (PEs)
after the core exercises (CEs)
in a Reading assignment are completed.
This call is failing.  (How often?)

Here is a screenshot of the issue that I got from Kajal:
![Kajal's screenshot](https://github.com/openstax/napkin-notes/blob/master/kevin/160105_biglearn_issue/screenshot_160104.png)

Here is an edited stack trace from `BigLearn`
(the full trace and more can be seen
[here](https://gist.github.com/pumazi/4caaed3e1d8f08084a81),
which was acquired by Michael M. using some nifty python tricks):
```
<snip>
  File "biglearn/api/endpoints/projections.py", line 87, in next_questions
    include_spy_values)
  File "biglearn/api/endpoints/projections.py", line 167, in _compute_next_questions
    config)
  File "/var/src/biglearn-0.2.0/venv/local/lib/python2.7/site-packages/biglearn/algorithms/tesr/etesr.py", line 104, in adaptive_question_recommendation
    cmatrix = sparfac(ymatrix, wmatrix, cmatrix, conf.sparfac_config)
  File "/var/src/biglearn-0.2.0/venv/local/lib/python2.7/site-packages/biglearn/algorithms/sparfa/tag/minic_box.py", line 201, in sparfac_with_matrices
    w = question_topics[ind, :]
IndexError: invalid index into a 0-size array
```

The following is an annotated summary of the [code](https://github.com/openstax/biglearn-algs/blob/master/biglearn/algorithms/sparfa/tag/minic_box.py#L201)
causing the error:
```python
def sparfac_with_matrices(responses, question_topics, mastery, config=None):
    ## p len(responses)         #=> 42
    ## p question_topics.shape  #=> (0, 1)
    ## p mastery.shape          #=> (0, 1)
    ...
    for nn in range(0, N): ## p N   #=> 1
        ## p nn   #=> 0
        responses_local = responses[:, nn: nn + 1]  ## p responses_local.shape  #=> (42, 1)
        ind = np.where(responses_local >= 0)[0]     ## p ind.shape              #=> (42,)
        ...
        w = question_topics[ind, :]  ## KA-BOOM!
        ...

    return C
```

So we can see
that this function is doomed to fail
because it's being fed empty W (`question_topics`) and C (`mastery`) matrices.

The moving back up the stack trace to
[etesr.py](https://github.com/openstax/biglearn-algs/blob/master/biglearn/algorithms/tesr/etesr.py#L104)
shows:
```python
def adaptive_question_recommendation(question_tag_scores,
                                     question_difficulties,
                                     clues,
                                     responses,
                                     number_of_questions=1,
                                     target_success_probability=0.5,
                                     config=None):
    ## p question_tag_scores   #=> []
    ## p question_difficulties #=> []
    ## p clues                 #=> []
    ## p len(responses)        #=> 42
    ...
    if responses:
        ymatrix, tmatrix, _, learners = assemble_ymatrix_and_tmatrix(
            responses, questions)
    else:
        ymatrix = np.full((len(questions), 1), np.nan)
        tmatrix = np.full((len(questions), 1), None)
        learners = [None]

    if clues:
        cmatrix, _, _ = assemble_cmatrix(clues, tags, learners)
    else:
        cmatrix = np.zeros((len(tags), 1))

    conf = get_conf(tesr_defaults, config)
    ## p conf.update_clues  #=> True
    if conf.update_clues and responses:
        from biglearn.algorithms.sparfa.tag.minic_box import \
            sparfac_with_matrices as sparfac
        cmatrix = sparfac(ymatrix, wmatrix, cmatrix, conf.sparfac_config)  ## KA-BOOM!
    ...
    return result
```
