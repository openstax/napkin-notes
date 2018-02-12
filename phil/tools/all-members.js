require('dotenv').config()
const Octokat = require('octokat')
const TOKEN = process.env['GH_TOKEN']
const ORG_NAME = process.env['ORGANIZATION']
const ALL_TEAM = 'all'

if (!TOKEN) { throw new Error('You must set the GH_TOKEN environment variable when using this') }
const octo = new Octokat({token: TOKEN})

async function* doStuff() {

  const allMembersMap = {}


  // console.log('Fetching repos...');
  const allRepos = await octo.orgs(ORG_NAME).repos.fetchAll()
  // console.log(`Total number of repos: ${allRepos.length}`);
  for (const repo of allRepos) {
    const {id: repoId, name: repoName, fullName} = repo // or pushedAt?
    // console.log(`looking at ${fullName}`);
    const collaborators = await octo.repos(fullName).collaborators.fetchAll({affiliation: 'direct'})
    for (const collaborator of collaborators) {
      const {login, permissions: {pull, push, admin}} = collaborator
      // console.log(`  adding ${login}`);
      allMembersMap[login] = allMembersMap[login] || {}
      allMembersMap[login].repos = allMembersMap[login].repos || {}
      allMembersMap[login].repos[repoName] = admin? 'admin' : (push ? 'push' : (pull ? 'pull' : 'unknown'))
    }
  }


  const allTeams = await octo.orgs(ORG_NAME).teams.fetchAll()
  for (const team of allTeams) {
    const {id: teamId, name: teamName, slug: teamSlug} = team
    // console.log(`looking at ${teamSlug}`);
    const members = await octo.teams(teamId).members.fetchAll()
    for (const member of members) {
      const {login} = member
      allMembersMap[login] = allMembersMap[login] || {}
      allMembersMap[login].teams = allMembersMap[login].teams || []
      allMembersMap[login].teams.push(teamSlug)
    }
  }


  console.log("Print out the report");
  // console.log(allMembersMap);
  console.log(`"GitHub Login", "GitHub Team Membership", "Specific Repository Permissions"`);
  Object.keys(allMembersMap).forEach((login) => {
    let {teams, repos} = allMembersMap[login]
    teams = teams || []
    repos = repos || {}
    const repoInfo = Object.keys(repos).sort().map((repoName) => {
      const repoPerm = repos[repoName]
      return `${repoName}:${repoPerm}`
    })
    console.log(`"${login}", "${teams.join(', ')}", "${repoInfo.join(', ')}"`);
  })
  // yield "done"
}
doStuff().next()
