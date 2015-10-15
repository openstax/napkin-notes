*Ideas about*
# How to share components
*across Backbone and Flux, between*
* [openstax/tutor-js](https://github.com/openstax/tutor-js)
* [openstax/exercise-js](https://github.com/openstax/exercises-js)
* [connexions/webview](https://github.com/connexions/webview)

[Tutor](https://github.com/openstax/tutor-js), [webview](https://github.com/connexions/webview), and [Exercises](https://github.com/openstax/exercises-js) need to share some components. One challenge is handling UI syncing with both Flux and Backbone.  Another is how to share components between projects in general.

## Options on how to share components

### One repo for all common components
* A folder per component
* Each component/folder will have a file each for
  * Mixin/helper version *(optional)*
  * Bare component
  * Flux adapted data-bound component
  * Backbone adapted data-bound component
  * Any other adapted data-bound components as needed
  * Index exporting the previous in an object
* Webpack will build components
* To include into project
  ```sh
  npm install --save openstax/react-common#some-tag
  ```
* Loading into other projects will look like this
  ```js
  var ComponentName = require('react-common/ComponentName/backbone');
  ```
  or

  ```coffee
  {ComponentNameBackbone} = require('react-common/ComponentName')
  ```

### One repo per common component
* One for webpack configs/build scripts as well
  * Gets installed into each component's repos as dev dependency
* More npm installs :cry:
* Share components depending on others will require more management
* I think I don't like this idea anymore.

## Mapping Tutor Flux to Webview Backbone models
Could make loadable component that bridges both, or adapters for each

### Linking Flux/Backbone to UI

| Description | Flux | Backbone |
| :---------- | :--- | :------- |
| Get data server | `actions.load(id)` | `collection.get(id).fetch()` |
|  | `store.on('change')`* | `collection.get(id).on('change')` |
*...to be continued*

Should probably add a change event that is id specific on Crud Store helper in tutor
* Use `:` to match Backbone events
 ```js
 store.emit('change:id')
 ```
  * Switch other `.` separated event namespacing to `:` to match Backbone's pattern more

* Or just use `.` and remain consistent within `tutor-js`
 ```js
 store.emit('change.id')
 ```

### UI to Flux/Backbone actions

This is simpler -- components have props that will be passed in for the UI to talk to Flux/Backbone, which in turn talks to the server for us and dispatches events such as `change` back to the UI.
