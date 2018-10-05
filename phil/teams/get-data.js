octo = require('octokat')({token: ... })


MEMBERS = {}
REPOS = {}
TEAMS = []

octo.orgs('openstax').teams.fetch()
.then(function(teams) {

  return Promise.all(teams.forEach(function(team) {
    // console.log(team.members.url);
    // octo.fromUrl(team.members.url).fetch()
    // team.members()

    console.log(JSON.stringify([team.privacy, team.name, team.description]));
    TEAMS.push([team.privacy, team.name, team.description]);

    return team.members.fetch()
    .then(function(members) {
      members = members.map(function(member) {
        return member.login;
      });
      console.log(JSON.stringify([team.name, members]));
      MEMBERS[team.name] = members;
    })
    .then(function() {
      return team.repositories.fetch()
      .then(function(members) {
        members = members.map(function(member) {
          return member.name;
        });
        console.log(JSON.stringify([team.name, members]));
        REPOS[team.name] = members;
      })

    })

  }));
})
.catch(function(err) { console.log(err); })
