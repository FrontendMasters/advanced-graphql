const {reposForOrg} = require('../github')

const task = (_, args, ctx) => {
  const {id: _id, name, project} = args.input

  if (!_id && !name) {
    throw new Error('Invalid input')
  }
  // this is how you use a loader
  return ctx.loaders.task.load(_id)
}
const tasks = (_, args, ctx) => {
  return ctx.models.task.find(args.input)
}
const newTask = (_, args, ctx) => {
  return ctx.models.task.create(args.input)
}
const removeTask = async (_, args, ctx) => {
  const task = await ctx.models.task
    .findByIdAndRemove(args.id)
    .exec()
  
  if (!task) {
    throw new Error('No resource')
  }
  return task
}
const changeStatus = (_, args, ctx) => {
  return ctx.models.task.findByIdAndUpdate(args.input.id, {
    status: args.input.status
  }, {new: true})
  .exec()
}

const taskResolvers = {
  id(task) {
    return task._id + ''
  },
  project(task, args, ctx) {
    // use loader instead
    return ctx.models.project
      .findById(task.project)
      .exec()
  }
}


module.exports = {
  Query: {
    task,
    tasks
  },
  Mutation: {
    newTask,
    changeStatus,
    removeTask
  },
  Task: {
    __resolveType(task) {
      switch (task.type) {
        case 'dev':
          return 'DevTask'
        case 'design':
          return 'DesignTask'
      }
    }
  },
  DevTask: {
    ...taskResolvers,
    async repo(task, args, ctx) {
      const name = task.repoUrl.split('/').pop()
      // use loader instead
      const repos = await reposForOrg()
      const repo = repos.find(r => r.name === name)
      return {
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        issueCount: repo.open_issues
      }
    }
  },
  DesignTask: {
    ...taskResolvers
  }
}
