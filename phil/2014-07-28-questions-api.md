So far, the types of "questions" I have are:

- Short answer
- True/False
- Fill in the blank
  - in a sentence
  - in a table
  - in a figure
- Matching
  - in a sentence
  - in a table
  - in a figure
  - Sorted
- Multiple Choice
  - Multiple Select
- Chart


# Short answer

This is a question with a stem that does not contain any `____` and the answers have a `value:`

    {
      stem: 'What is the speed?'
      answers: {
        { credit: 1, value: 20 }
      }
    }

# Multiple Choice

Question with optional stem and multiple answers, each with an optional `content:` field.

    {
      stem: 'What is the speed?'
      answers: {
        { credit: 1, content: '20 m/s' }
        { credit: 0, content: '10 m/s' }
        { credit: 0.5, content: '200 m/s' }
      }
    }

or, with an optional `stem_multichoice:` field:

    {
      stem_multichoice: 'Please select the correct speed'
      answers: {
        { credit: 1, content: '20 m/s' }
        { credit: 0, content: '10 m/s' }
        { credit: 0.5, content: '200 m/s' }
      }
    }

# Multiple Select

Question with optional stem and multiple answers.

    {
      stem: 'What is the speed?'
      answers: {
        { credit: 1, content: '20 m/s' }
        { credit: 1, content: '.02 km/s' }
        { credit: 0, content: '.2 km/s' }
        { value: [0, 1] }     # This is "(a) and (b)"
        { value: [0, 1, 2] }  # This is "All of the above"
      }
    }

# Fill in the blank

Question with a stem that contains `____`

    {
      stem: 'The speed is ____ m/s'
      answers: {
        { credit: 1, value: 20 }
        { credit: 0, value: 10 }
      }
    }

## ... with dropdown

Question with a stem that contains `____` and multiple answers and only 1 with `credit: 1`

    {
      stem: 'The speed is ____ m/s'
      answers: {
        { credit: 1, value: 20 }
        { credit: 0, value: 2, hint: 'Check the units' }
      }
    }

# Matching

Part with a background (containing multiple `____`) **and** multiple questions each with >= 1 answer.

Each blank is thought of as a separate question (and graded separately).

    {
      background: '''Match the animals that start with the following letters:
          <table>
            <tr><td>A</td><td>____1</td></tr>
            <tr><td>B</td><td>____2</td></tr>
            <tr><td>C</td><td>____3</td></tr>
          </table>
      '''
      questions: [
        # Answers for the first `____`
        {
          answers: {
            { credit: 1, content: 'ant' }
          }
        }
        # Answers for the second `____`
        {
          answers: {
            { credit: 1, content: 'bat' }
          }
        }
        {
          answers: {
            { credit: 1, content: 'cow' }
          }
        }
      ]
    }

With this data there are several options for rendering the problem:

1. each blank is an `<input>`
2. drag and drop the answers (the set of words to drop is determined by the answer `content:` field and deduped)
3. dropdowns for each `____`

**TODO:** Maybe this should be a question instead of a part???


# Multiple Fill in the blank

Part with a background (containing multiple `____`) **and** multiple questions.

    {
      background: 'The speed is _____ m/s and the mass is ____ g'
      questions: [
        # Answers for the first `____`
        {
          answers: {
            { credit: 1, value: 20 }
          }
        }
        # Answers for the second `____`
        {
          answers: {
            { credit: 1, value: 15 }
          }
        }

      ]
    }

Same question as above but with optional fields filled in:

    {
      background: 'The speed is ____ m/s and the mass is _____ g'
      questions: [
        # Answers for the first `____`
        {
          stem: 'What is the speed?'
          answers: {
            { credit: 1, value: 20 }
            { credit: 0, value: .2, hint: 'Check the units' }
          }
        }
        # Answers for the second `____`
        {
          stem: 'What is the mass?'
          answers: {
            { credit: 1, value: 15 }
            { credit: 0, value: 1.5, hint: 'Check the units' }
          }
        }

      ]
    }


# Fill in the blank (sorted)


# Chart



# Multiple question formats

To support using a question in multiple ways each question has an optional field called `formats: [ ... ]` which restricts the allowed formats.

So, to combine several of the questions defined above into a "Master Question" it would look something like:

    {
      formats: [ 'short_answer', 'multiple_choice', 'fill_in_the_blank' ]
      stem: 'The speed is ____ m/s'
      stem_short: 'What is the speed?'
      stem_multiple: 'Choose the correct answer for the speed'
      answers: {
        { credit: 1, value: 20, content: '20 m/s' }
        { credit: 0, value: .2, content: '.2 m/s', hint: 'Check the units' }
      }
    }
