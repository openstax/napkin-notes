
There are a couple bits of information that need to be communicated between BE and FE for this sprint.

# Try another Problem, Refresh my Memory

[Story u388 Student chooses â€œtry another problemâ€ / â€œrefresh my memoryâ€ / â€œmove onâ€ ---- Frontend](https://www.pivotaltracker.com/story/show/89970276)

Not all exercises will have both options (I think) so it is important to indicate that in the JSON somehow.

## Try Another Problem

Presents the student with another exercise without adding a new step into the breadcrumbs.

The "Other Problem" comes from the `ost-exercise-choice` tag in the book content.

- We can give this information to the student (for now)
- I think it is important to have it dangle off an existing TaskStep (maybe it's a substep?)
  - **"Why?"** When reviewing, it's useful to have the link between the original exercise and the recovered exercise
    - so they show up next to each other in a HW review
    - so we can easily see how many points were recovered
    - so it can be labeled "4 (recovered)" instead of "5" in the review http://mockups.openstax.org/Tutor_MVP_v2/#p=problem_review_page_after_recover

## "Refresh my Memory" shows a video or simulation

I'm thinking it should be a substep (like "Try Another Problem")


## Proposed JSON

```coffee
id: 1
type: "exercise"
is_complete: true
free_response: "I like Blue"
answer_id: "987"
correct_answer_id: "876"  # To tell that the step is graded and incorrect
content: EXERCISE
...

recovery_step:
  id: 2
  type: "exercise"
  is_complete: false
  content: EXERCISE
  ...

refresh_step:
  id: 3
  type: "video"
  is_complete: false
  url: "http://youtube.com/watch?v=128376"
```

Then, the step can be updated via the same `PATCH` to `./steps/2` with `{free_response: "I really like blue", is_complete: true}`



# iReading Analytics

[Story u318 Teacher views iReading class-aggregate analytics ---- Start - Completed coutns](https://www.pivotaltracker.com/story/show/89970238)

See https://gist.github.com/philschatz/8276bb3d6fe0b69e65e6


# Current role

[Condition components based on user Role  Render FE per logged-in userâ€™s role (student, teacher). related to u303 and u363](https://www.pivotaltracker.com/story/show/88795230)

I'm suggesting a route in `GET /api/user` which yields `{role: "teacher"}`.


# Delete an iReading

[Delete an iReading](https://www.pivotaltracker.com/story/show/88796236)

Just `DELETE /api/plans/123` which yields a 200?


# Loop of Practice Exercises

[Story u418 Student is presented with a loop of practice exercises ---- Front end](https://www.pivotaltracker.com/story/show/89970342)

No clue yet on this one. Esp since a Task has a finite number of steps.
But it will have to have the topics to pull from to generate this.

Maybe `GET /api/courses/123/practice?tag=k12phys-ch01-s01-l01&tag=k12phys-ch01-s01-l02` and jsut return a TaskStep? and then `PATCH /api/steps/987` with `{free_response: "I Like Blue", is_complete: true}`


# TaskPlan.settings JSON

This is slowly becoming more problematic for the frontend. Just suggesting that it be discussed/refactored.
