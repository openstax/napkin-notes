It seems that
`Tutor` is calling `BigLearn` 
to populate the personalized exercises (PEs)
after the core exercises (CEs)
in a Reading assignment are completed.
This call is failing.  (How often?)

Here is a screenshot of the issue that I got from Kajal:
![Kajal's screenshot](https://github.com/openstax/napkin-notes/blob/master/kevin/160105_biglearn_issue/screenshot_160104.png)

Here is an edited stack trace from `BigLearn`
(the full trace can be seen
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

