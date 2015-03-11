# Question Templates

## Short Answer or Multiple Choice

These question templates can become a Short Answer and Multiple Choice question

    stem: "What is the rest mass?"
    short_stem: "Enter your answer in kg"
    answers: [
      { credit: 1, value: "{{ ship_mass }}" }
      { credit: 0, value: "{{ ship_mass_grams }}", hint: "Check the units" }
    ]


## Short Answer only

It has only 1 answer and therefore can only become a Short Answer question

    stem: "What is the rest mass?"
    short_stem: "Enter your answer in kg"
    answers: [
      { credit: 1, value: "{{ ship_mass }}" }
    ]

## Multiple Choice only

No `short_stem` therefore can only become a Multiple Choice question

    stem: "What is the rest mass?"
    answers: [
      { credit: 1, value: "{{ ship_mass }}" }
      { credit: 0, value: "{{ ship_mass_grams }}", hint: "Check the units" }
    ]

## Fill in the blank

With the same question template we could generate Short answer, Multiple Choice, or have a dropdown

**Note:** This could be a question or a Part with 1 question to match the structure of fill-in-the-table or matching

    type: 'fill-in-the-blank'
    stem: "Photosynthesis ____1 ATP"
    short_stem: "Enter the term for how these 2 words relate to each other"
    answers: [
      { credit: 1, value: "creates" }
      { credit: 0, value: "uses" }
    ]

## Fill in the table (this is a Part with multiple Questions)

    type: 'fill-in-the-blanks'
    background: "<table><tr><td>Protein with Carbohydrate</td><td>____1</td></tr></table>"
    questions: [
      {answers: [ {credit: 1, value: 'glycoprotein'} ] }
      ... (more questions for each blank in the table)
    ]

## Matching (this is a Part with multiple Questions)

    type: 'fill-in-the-blanks'
    # This could be an <svg> with a <text>____1</text> in order to allow blanks/DnD/dropdowns
    background: "<img src='http://philschatz.com/biology-book/resources/Figure_05_01_01.jpg'/>"
    questions: [
      {answers: [ {credit: 1, value: 'Peripheral membrane protein'} ] }
      {answers: [ {credit: 1, value: 'Integral membrane protein'} ] }
      {answers: [ {credit: 1, value: 'Cholesterol'} ] }
    ]

---

# Templates

`{{ ... }}` is Liquid templates notation but would work easily with JS

`value: ` is the exact value and `content: ` is the string displayed (optional) for creating multiple choice questions.

Maybe the `type: 'number'` could be implied (like parseInt() in JS) and if it is a number, then add commas (or periods for non-US folks ; )


This is the JSON for an exercise template:

    logic:
      inputs:
        mass:  { start: 1, end: 3 }
        speed: { start: 1, end: 3 }
      outputs:
        ship_mass: ({mass, speed}) -> 100 ^ mass
        ship_speed: ({mass, speed}) -> 10 ^ speed
        ship_force: ({mass, speed}) -> (100 ^ mass) * (10 ^ speed)
        ship_mass_grams: ({mass, speed}) -> (100 ^ mass) * 1000
        ship_mass_div_speed: ({mass, speed}) -> (100 ^ mass) / (100 ^ speed)

    background: "Einstein makes a {{ ship_mass }} kg spaceship"
    parts: [
      { background: "The spaceship moves at {{ ship_speed }} m/s"
        questions: [
          { stem: "What is the rest mass?"
            short_stem: "Enter your answer in kg"
            answers: [
              { credit: 1, value: "{{ ship_mass }}" }
              { credit: 0, value: "{{ ship_mass_grams }}", hint: "Check the units" }
            ]
          }
          { stem: "What is the force if it slams into a wall?"
            short_stem: "Enter your answer in N"
            answers: [
              { credit: 1, value: "{{ ship_force }}"           content: "{{ ship_force }} N"}
              { credit: 0, value: "{{ ship_mass_div_speed }}", content: "{{ ship_mass_div_speed }} N",
                hint: "Remember 1 Newton (N) is 1 kg*m/s" }
            ]
          }
        ]
      }
    ]
