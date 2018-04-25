const DataLoader = require('dataloader')
const Project = require('./project/project.model')
const { reposForOrg } = require('./github')
const _ = require('lodash')

const createProjectLoader = () => {
  return new DataLoader(projectIds => {
    return Project.find({_id: {$in: projectIds}})
      .exec()
      .then(projects => {
        console.log('projects loader batch: ', projectIds.length)
        const projectsById = _.keyBy(projects, '_id')
        return projectIds.map(projectId => projectsById[projectId])
      })
  })
}

const createTaskLoader = () => {
  // create task loader here
}

const createGitHubLoader = () => {
  // create github loader here. Use function from ./github.js
}

module.exports = () => {
  return {
    project: createProjectLoader(),
    task: createTaskLoader(),
    repo: createGitHubLoader()
  }
}
