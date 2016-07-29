## Single FE git repo proposal

A single repository for all FE code will allow developers to easily commit changes that span projects, and allow Travis CI to run tests across all projects when commits are made.

Proposed directory tree:

```
├── package.json
├── webpack.config.js
├── configs (maybe scripts?)
│   └── webpack.coffee
├── tutor
│   ├── resources
│   ├── src
│   └── test
├── exercises
│   ├── resources
│   ├── src
│   └── test
├── concept-coach
│   ├── resources
│   ├── src
│   └── test
└── shared
    ├── resources
    ├── src
    └── test
```

As a convention each npm command will have the project to target as the last argument, for instance to build Tutor for production the command would be: `npm build tutor`, likewise exercises would be `npm build exercises`

### Development workflow

Running `npm serve <project>` will start webpack for the given project.

The webpack config will have the include paths set to that project's `src` folder and `shared/src`. This will allow `require` to find only the files that should be included, and not files from other projects.

Of course, this could be subverted by a `require '../../../<other prject>/src/unrleated`, but those types of issues are impossible to do by mistake and should be caught during code review.

### Testing

The `npm test` command will run tests on all projects, as will Travis.  Project-specific tests can be ran using `npm test <project>`

### Process of combining repositories:

Tutor will serve as the "base" repository.  It's history will be included intact which will allow all sha hashas to remain the same.  A `git mv` will be used to move all it's files into the `tutor` subdirectory.

The other repositories will then be merged into the new repo, and then moved into their proper subdirectory.

*Note:* testing of these approaces is ongoing, exact commands may change.
