# New GitHub Repo

- [ ] add AGPL-3 `LICENSE` file (Example: [tutor-js](https://github.com/openstax/tutor-js/pull/1653))
- [ ] protect master branch
  - **Note:** make sure you deselect "Restrict who can push to this branch"
- [ ] add team (`all`)
- [ ] add `CONTRIBUTING.md` which links to https://github.com/openstax/napkin-notes/blob/master/CONTRIBUTING.md
- [ ] add `./script/setup` and `./script/test` (optional) [Why do this?](https://githubengineering.com/scripts-to-rule-them-all/)
  - Examples: [1](https://github.com/Connexions/cnx-rulesets) [2](https://github.com/Connexions/cnx-easybake) [3](https://github.com/openstax/ostext-style-guide)
- [ ] add CI (choose one or both)
  - with travis
    - [ ] add `.travis.yml` (which runs `./script/test`)
    - [ ] add Travis-CI Integration (click **:gear: Settings** on the repository and then Integrations)
    - [ ] get Travis-CI to report to https://codecov.io
  - with jenkins
    - [ ] add `jenkins/continuous-integration.jenkins` see [example](https://github.com/openstax/highlighter/blob/master/jenkins/continuous-integration.jenkins)
    - [ ] make sure you include codecov (its in the example)
- [ ] create a `README.md`

## Optional

- [ ] add `.editorconfig` file (see [website](http://editorconfig.org) and [Atom.io plugin](https://atom.io/packages/editorconfig)
- [ ] add `.pre-commit-config.yaml` (see https://github.com/Connexions/nebuchadnezzar/pull/68 for an example)


# New Slack Channel

- [ ] Announce in a popular channel (or build a bot that does it automatically)

### New Sprint Channels

- [ ] add planning, demo, retrospective docs (can they just be 1 doc?)


# New Person

- [ ] create GitHub account
- [ ] create Slack account (ppreferably use GitHub username)
- [ ] create Honey account
- [ ] invite to https://github.com/orgs/openstax/teams/all
- [ ] add to Google Drive folders (`Open Stax All (Searchword: Gorilla)`)
- [ ] add to Google openstax calendar(s)
- [ ] create LDAP account (preferably use GitHub username)

# Leaving Person

- [ ] collect any passwords and secrets
- [ ] remove from https://github.com/orgs/openstax/teams/all
- [ ] remove from https://github.com/orgs/Connexions/teams
- [ ] remove from Slack
- [ ] remove from Google Drive folders and Docs
- [ ] remove from _all_ the Trello boards
- [ ] remove from Zendesk/Salesforce/twitter/facebook
- [ ] disable LDAP account
