# Overall

Tests break down to

1. [**rendering** a component](#rendering-our-components),
1. [doing some **actions**](#actions) (optional), and
1. [**checking** the DOM](#checks) for expected content.

## Rendering our components

### Gotchas

* Dependency on React Router

  Without dependency on react-router, we could probably test our components by rendering them like so:

  ```coffee
  {id} = model
  # Load the plan into the store
  TaskPlanActions.loaded(model, id)

  html = React.renderToString(<ReadingPlan id={id} />)
  div = document.createElement('div')
  div.innerHTML = html

  # This is the meat of the tests, where the "actions" & "checks" happen
  ```

  Simplified version of a test in [Reading Plan Specs](https://github.com/openstax/tutor-js/blob/master/test/components/reading-plan.spec.coffee)

  We need routes to be loaded so that our components can access them in context.

### Solution

  * Do something like the following:

  ```coffee
  {routes} = require '../../../src/router'
  Router = require 'react-router'

  router = 'route-we-are-testing'
  div = document.createElement('div')

  history = new Router.TestLocation([route])
  Router.run routes, history, (Handler, state) ->
    React.render(<Handler/>, div, ->
      component = @

      # This is the meat of the tests, where the "actions" & "checks" happen
    )
  ```

## Actions

### Gotchas

  * React uses "Synthetic events"

    Using regular/JavaScript's event triggers during testing mostly doesn't work.

### Solution

  * Use [React's Test Utils](https://facebook.github.io/react/docs/test-utils.html#simulate)

  ```coffee
  # NOTE: you have require 'react/addons', not regular 'react' for access to React.addons
  React = require 'react/addons'
  button = div.querySelector('.button')
  React.addons.TestUtils.Simulate.click(button)

  inputNode = div.querySelector('input')
  React.addons.TestUtils.Simulate.focus(inputNode)

  textareaNode = div.querySelector('textarea')
  React.addons.TestUtils.Simulate.focus(textareaNode)
  React.addons.TestUtils.Simulate.keyDown(textareaNode, {key: 'Enter'})
  React.addons.TestUtils.Simulate.change(textareaNode)

  ```

## Checks

### Pretty straightforward. Yay!

  ```coffee
  expect(div.querySelector('.-save.disabled')).to.not.be.null
  expect(component.refs).to.not.be.null
  ```

## Things we've done

* Pulled out the router/rendering stuff from above into [test/components/helpers/utilities.coffee](https://github.com/openstax/tutor-js/blob/master/test/components/helpers/utilities.coffee#L11-L33)

  * Made it a promise to reduce nesting

* Pulled out common actions to [test/components/helpers/utilities.coffee](https://github.com/openstax/tutor-js/blob/master/test/components/helpers/utilities.coffee#L70)

  * Also promises.

## All together now.

* [Student Dashboard Spec](https://github.com/openstax/tutor-js/blob/master/test/components/student-dashboard.spec.coffee)

  * [Grabbing a specific component to test](https://github.com/openstax/tutor-js/blob/master/test/components/student-dashboard.spec.coffee#L20)

* [Calendar Spec](https://github.com/openstax/tutor-js/blob/master/test/components/course-calendar.spec.coffee)


## Oddities

  * catch done?

  ```coffee
  blahblahblah
    .then((result) ->
      done()
    ).catch(done)
  ```

  [Why?](https://lostechies.com/derickbailey/2012/08/17/asynchronous-unit-tests-with-mocha-promises-and-winjs/)

    * catches when our tests have errors and runs the mocha done to show errors and end failed test

    * Ours is a little different since Promise.done is not part of the official [ES6 promises spec](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)


## Discussions

### Testing using `classes` vs `refs`

  * Why use `refs`?

    * Removes dependency on `classes` which may get changed/moved around for styling purposes

  * Why use `classes`?

    * Don't need to traverse the component tree just right to access the exact node we are trying to test.

    * Could be solved partially with stuff like `React.addons.TestUtils.findRenderedComponentWithType` and other `TestUtils` functions


## Resources

[Way to test with react-router](https://gist.github.com/wayoutmind/76e17f07409be07ffdcb)

[React-Router's tests](https://github.com/rackt/react-router/tree/master/modules/__tests__)
