const DataLoader = require('dataloader')
const Project = require('./project/project.model')
const Task = require('./task/task.model')
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
  return new DataLoader(taskIds => {
    return Task.find({_id: {$in: taskIds}})
      .exec()
      .then(tasks => {
        console.log('task loader batch: ', taskIds.length)
        const tasksById = _.keyBy(tasks, '_id')
        return taskIds.map(taskId => tasksById[taskId])
      })
  })
}

module.exports = () => {
  return {
    project: createProjectLoader(),
    task: createTaskLoader()
  }
}
