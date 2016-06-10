Some tools made in-house that could be useful to others:

# 3 to Know

### Recordo.js

[github](https://github.com/philschatz/recordo.js) or [npm](https://www.npmjs.com/package/recordo)

- QA frequently has to describe, in words, how to reproduce a bug.
Recordo logs AJAX requests, mouse clicks, screen resizes, browser/OS information, exceptions, error messages, and copies it to the clipboard
- Shows that openstax.org makes a bunch of JS requests for every page, errors when someone does not have Google Analytics, and would have made pasting the errors and browser info in the release last night more precise.
- Works on mobile too!


### Selenium Sanity Wrapper

[README](https://github.com/openstax/tutor-js/tree/master/test-integration#readme) or [video](https://drive.google.com/file/d/0B7-23yUTssvDc3FDQUU5MHNGUEU/view) or [helper docs](https://openstax.github.io/tutor-js/docs/) or [coverage](https://openstax.github.io/tutor-js/coverage/)

- selenium has annoying timeouts
  - Some tests take 10 minutes to succeed. if it errors on the 1st step then you have to wait 10minutes for it to fail
  - so, we wrapped Selenium with a 30-sec (default) dead-man switch
- Selenium has fragile selectors
  - when developers change code, QA breaks. It's unclear why.
  - so, we have developers maintain the selectors by having to write our own tests
- Selenium is fragile because of lack of abstraction
  - QA needs to do higher-level "things", and occasionally doing low-level tasks
  - so, we have things like "create and publish an assignment" (see "Helper Docs" link above)
- Selenium doesn't do code coverage
  - coverage is nice for unit tests so we added a way to do it for Selenium tests too! (see "Coverage" link above)
- Selenium doesn't have a debugger
  - So, we added one (see "Video" link above)
- ES6 is async and requires things like Promises
  - So, we added support for ES7 async (& got it to work in the debugger too!)

- We split the helpers into screens. Each helper assumes you are already on the current screen and only has operations for how to leave the screen. (see "Helper Docs" link above)


### Source Code in Production

[code](https://github.com/openstax/tutor-js/blob/master/webpack.config.coffee#L23) or go to https://tutor-qa.openstax.org and open browser dev tools.

- Since we're open source, might as well use it to make bugfixing easier!
- Especially useful for stacktraces in recordo


# 2 to Show


### Slaxbot

[code](https://github.com/philschatz/stax-bot)

it's a bot with a purpose. Make your lives easier.

- runs on heroku
- it looks up cat pics, and you can add features!

What does it do?

- right now it listens to when a channel is mentioned and then posts in that channel with the snippet.
  - for example, "Can #devops help with the tutor-dev deployment?"
    - Then, devops doesn't have to listen to a bunch of channels, people don't have to remember if chris is at home today, there is context to the work (currently #devops is cluttered with discussion of different projects)

What could it do?

- auto-archive channels after 2weeks of inactivity
- post in a channel whenever a call starts
  - so if you know you are supposed to be in a meeting but don't remember where it is, you could just check #calls (similar to #deployments or #tutor-stream)
- If we had a calendar for each project, it could post upcoming meetings into the project channel


### gh-board

[code](https://github.com/philschatz/gh-board)

A kanban for GitHub Issues and Pull Requests
