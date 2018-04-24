const octokit = require('@octokit/rest')()

octokit.authenticate({
  type: 'token',
  token: process.env.GITHUB_TOKEN
})

const reposForOrg = () => {
  return octokit.repos.getForOrg({
    org: 'tipeio',
    type: 'public'
  }).then(({data}) => {
    return data
  })
}

module.exports = {
  reposForOrg
}
