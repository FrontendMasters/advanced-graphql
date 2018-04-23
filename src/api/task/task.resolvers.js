const task = (_, args, ctx) => {
  const {id: _id, name, project} = args.input

  if (!_id && !name) {
    throw new Error('Invalid input')
  }

  return ctx.models.task.findOne({_id, project})
    .exec()
}
const tasks = (_, args, ctx) => {
  return ctx.models.task.find(args.input)
}
const newTask = (_, args, ctx) => {
  return ctx.models.task.create(args.input)
}
const removeTask = () => {}
const changeStatus = async () => {}

const taskResolvers = {
  id(task) {
    return task._id + ''
  },
  project(task, args, ctx) {
    console.log('heldflo')
    return ctx.models.project.findById(task.project).exec()
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
    repo(task) {
      return {
        name: 'hello',
        tags: [],
        description: 'hello',
        url: task.repoUrl
      }
    }
  },
  DesignTask: {
    ...taskResolvers
  }
}
