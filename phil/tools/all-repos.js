const Octokat = require('octokat')
const TOKEN = process.env['GH_TOKEN']
const ORG_NAME = 'openstax'
const ALL_TEAM = 'all'

if (!TOKEN) { throw new Error('You must set the GH_TOKEN environment variable when using this') }
const octo = new Octokat({token: TOKEN})

async function* doStuff() {

  const allMembersMap = {}

  const allTeams = await octo.orgs(ORG_NAME).teams.fetchAll()
  const allTeam = allTeams.filter(({slug}) => slug === 'all')[0]

  const reposInTheAllTeam = (await octo.teams(allTeam.id).repos.fetchAll()).map(({name}) => name)

  // console.log('Fetching repos...');
  const allRepos = (await octo.orgs(ORG_NAME).repos.fetchAll()).sort(({updated_at}) => updated_at).reverse().map(({name}) => name)
  // console.log(`Total number of repos: ${allRepos.length}`);
  for (const repoName of allRepos) {
    if (reposInTheAllTeam.indexOf(repoName) >= 0) {

    } else {
      console.log(`not in all: ${repoName}`);
    }
  }

  // yield "done"
}
doStuff().next()
