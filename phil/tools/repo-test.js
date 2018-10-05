require('dotenv').config()
const Octokat = require('octokat')
const TOKEN = process.env['GH_TOKEN']
const ORG_NAME = process.env['ORGANIZATION']
const ALL_TEAM = 'all'

if (!TOKEN) { throw new Error('You must set the GH_TOKEN environment variable when using this') }
const octo = new Octokat({token: TOKEN})

const lastYear = new Date()
lastYear.setFullYear(2016)

async function* doStuff() {
  const REPO_CHECKLISTS={}
  console.log('Fetching repos...');

  // const {items: allRepos} = await octo.orgs(ORG_NAME).repos.fetch()
  const allRepos = await octo.orgs(ORG_NAME).repos.fetchAll()
  console.log(`Total number of repos: ${allRepos.length}`);


  for (const repo of allRepos) {
    const {name, updatedAt} = repo // or pushedAt?

    if (updatedAt < lastYear) {
      console.log(`Skipping ${name} because it has not been updated`);
    } else {
      console.log(`Checking ${name}...`);
      const missing = {}
      REPO_CHECKLISTS[name] = missing

      // Check that it has an AGPL license
      try {
        const license = await repo.license.fetch()
        if (license.license.key !== 'agpl-3.0') {
          missing.license = license.license.key
        }
      } catch (e) {
        missing.license = true
      }

      // Check for a README.md
      try {
        await repo.readme.fetch()
      } catch(e) {
        missing.readme = true
      }

      // // Check for ".editorconfig"
      // try {
      //   await repo.contents('.editorconfig').fetch()
      // } catch(e) {
      //   missing.editorConfig = true
      // }

      // Check for "CONTRIBUTING.md"
      try {
        await repo.contents('CONTRIBUTING.md').fetch()
      } catch(e) {
        missing.contributing = true
      }

      // Check for ".travis.yml"
      try {
        await repo.contents('.travis.yml').fetch()
      } catch(e) {
        missing.travisYml = true
      }

      // Check that the master branch is protected
      // This requires the loki header: https://developer.github.com/v3/repos/branches/#get-branch-protection
      // const {protected} = await repo.branches(repo.defaultBranch).fetch()
      // if (!protected) {
      //   missing.protection = true
      // }


      // Check that the "all" team has write permissions (except deployment repos)
      const teams = await repo.teams.fetchAll()
      const teamsWithAll = teams.filter((team) => team.slug === ALL_TEAM)
      if (teamsWithAll.length === 1) {
        if (teamsWithAll[0].permission === 'push' || teamsWithAll[0].permission === 'admin') {
        } else {
          console.log('woops. wrong permission.', teamsWithAll[0].permission);
          missing.allTeam = teamsWithAll[0].permission
        }
      } else {
        missing.allTeam = true
      }

      // Check for the Travis webhook
      // Check for the Codecov.io webhook
      const hooks = await repo.hooks.fetchAll()
      // hooks.forEach((hook) => console.log(hook))
      if (hooks.filter(({name}) => 'travis').length == 0) {
        missing.travisWebHook = true
      }
      if (hooks.filter(({config}) => config.url == 'https://codecov.io/webhooks/github').length == 0) {
        missing.codecovWebhook = true
      }

      // Check for "./script/setup" and "./script/test"
      try {
        await repo.contents('script/setup').fetch()
        missing.script_setup = false
      } catch (err) {
        missing.script_setup = true
      }


      // Check that JS repos have a .nvmrc file
      const languages = await repo.languages.fetch()
      if (languages['JavaScript'] || languages['CoffeeScript']) {
        try {
          const hasPackageJson = await repo.contents('package.json').fetch()
          if (hasPackageJson) {
            try {
              await repo.contents('.nvmrc').fetch()
            } catch(e) {
              missing.nvmrc = true
            }
          }
        } catch (e) {
          // No package.json so it's OK
        }
      }

    }

  }
  console.log("Print out the report");
  // console.log(REPO_CHECKLISTS);

  console.log("Repos that have a script/setup:");
  console.log(Object.keys(REPO_CHECKLISTS).filter(repoName => !REPO_CHECKLISTS[repoName].script_setup))
  // yield "done"
}
doStuff().next()
