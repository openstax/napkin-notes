How can we reduce the number of different tools used between all the JS repositories and commands a developer needs to know to run?

I think currently it's:

Code                | JS variant   | CSS  | MV*      | package mngr  | build | local hosting  | commands/production
------------------- | ------------ | ---- | -------- | ------------- | ----- | -------------- | ---------
[^webview]          | CoffeeScript | LESS | Backbone | npm-and-bower | Grunt | nginx          | `grunt dist; nginx` / `grunt dist`
[^tutor-js]         | CoffeeScript | LESS | React    | npm           | webpack | webpack      | `npm start` / `npm run dist`
[^concept-coach]    | CoffeeScript | LESS | React    | npm           | webpack | webpack      | `npm start` / ???
[^react-components] | CoffeeScript | LESS | React    | npm           | webpack | webpack      | `npm start` / ???
[^os-webview]       | ES7          | SASS | Backbone | jspm          | gulp    | browser-sync | `gulp dev` / `gulp dist`

[^webview]: https://github.com/Connexions/webview
[^tutor-js]: https://github.com/openstax/tutor-js
[^concept-coach]: https://github.com/openstax/concept-coach
[^react-components]: https://github.com/openstax/react-components
[^os-webview]: https://github.com/dak/os-webview


Additionally:

2. Why gulp 4 vs webpack? (and can all the repos be changed at the same time?)
3. Why JSPM (and how much work would be to update webview?)
4. How much work would it be to have webview build Coffee and ES7?
5. Why the switch to SASS? and how much work would it be to change webview? (all the textbooks use LESS too)
6. Can features like browser caching fanciness be introduced to all the repos at once?
7. can we have a list of default ports so all the repos don't collide?
