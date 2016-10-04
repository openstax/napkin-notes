
*Outdated*

# View Model idea from props

# Separation of view specific components -- nest inside component specific components


# Export react config object with component

This is perhaps the most radical idea on here since I haven't seen anything similar elsewhere.  What I think this will gain us is extra composibility of different things.

```
viewModelConfig =
  doSomething: (viewModel) ->


initialConfig =
  propTypes:
  contextTypes:

  getDefaultProps:
  getInitialState:


derivedProps =
  isThis: (props, state, context) ->
  isThat: (props, state, context) ->
  parts: (props, state, context) ->



lifeCycleConfig =
  componentWillMount:
  componentDidMount:
  componentWillReceiveProps:
  componentWillUpdate:
  componentDidUpdate:
  componentWillUnmount:

  shouldComponentUpdate:


render = ->



makeReactClass = (initialConfig, render, lifeCycleConfig, customConfig) ->
  derived = _.mapValues derivedProps, (derivedProp) =>
    derivedProp(@props, @state, @context)

  React.createClass(_.extend(
    initialConfig,
    lifeCycleConfig,
    derived,
    customConfig,
    {render}
  ))




Component = makeReactClass()



module.exports = {lifeCycle, viewModelSpecific, Component}

```