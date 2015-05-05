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

* A Pattern

```coffee
describe 'component being tested', ->
  beforeEach (done) ->
    # load stores as needed
    routerStub
      .goTo('route')
      .then (result) ->
        # assign params to result as needed
        @result = result
        # @result now has access to component, div, state, history, and router
        done()
      , done) # catch done

  afterEach ->
    # unmount DOM node
    routerStub.unmount()

    # reset stores

  it 'should render as expected', ->
    # If tests are simple and do not require multiple actions and checks, they can be performed synchronously
    {div, component} = @result

    expect(div.querySelector('div h1')).to.not.be.null

    MatchingComponent = React.addons.TestUtils.findRenderedComponentWithType(component, ComponentExpectedToRender)

    expect(MatchingComponent).to.be.an('object')
    # reset stores

  it 'can also be tested using chained promises', (done) ->
    # assume check methods and action methods are promises
    checks
      .checkForTitle(@result)
      .then(actions.clickContinue)
      .then(checks.checkForExpectedPanel)
      .then(actions.fillOutTextarea)
      .then(actions.clickSubmit)
      .then(checks.checkForExpectedResult)
      .then( ->
        done()
      , done)

    # Using chainable actions and checks means you can easily compose your tests to carry out a
    # longer sequence of actions (i.e. completing several steps in a task) before performing a check.

```

## Oddities

### Catch done?

  ```coffee
  blahblahblah
    .then((result) ->
      done()
    ).catch(done)
  ```
  or

  ```coffee
  blahblahblah
    .then( ->
      done()
    , done)
  ```

  * [Why?](https://lostechies.com/derickbailey/2012/08/17/asynchronous-unit-tests-with-mocha-promises-and-winjs/)

    * `done` needs to be called without arguments on success

    * catches when our tests have errors and runs the mocha `done` to show errors and end failed test

    * Ours is a little different from what's in the blog since Promise.done is not part of the official [ES6 promises spec](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)


### [component.forceUpdate](https://facebook.github.io/react/docs/component-api.html#forceupdate) or [component.setState](https://github.com/openstax/tutor-js/blob/master/test/components/student-dashboard.spec.coffee#L40)

  * After some actions or after some updates are expected, component won't render for some reason.  These are two ways to force a re-render.


## Debugging tests

### Log rendered DOM node or component to console/terminal

### Karma Chrome Debugger Runner something or other...

## Discussions

### Testing using `classes` vs `refs`

  * Why use `refs`?

    * Removes dependency on `classes` which may get changed/moved around for styling purposes

  * Why use `classes`?

    * Don't need to traverse the component tree just right to access the exact node we are trying to test.

    * Could be solved partially with stuff like `React.addons.TestUtils.findRenderedComponentWithType` and other `TestUtils` functions

### When to write tests?

  * Before coding?

    * Difficult to do for components

  * After coding?

    * I've been writing tests while and/or after coding

    * Complete component tests before I move my PR out of WIP

  * End of sprint


### Coding tests vs coding components time

  * After getting over initial humps of how the heck do we test, and getting the utils set up, not that much time actually.

    * Per component, some initial set up for getting actions and checks right for the component.

    * Composing and writing additional tests are very easy.

  * < 20% -- @nathanstitt

## Resources

[Way to test with react-router](https://gist.github.com/wayoutmind/76e17f07409be07ffdcb)

[React-Router's tests](https://github.com/rackt/react-router/tree/master/modules/__tests__)
