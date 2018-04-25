const {reposForOrg} = require('../github')

const task = (_, args, ctx) => {
  const {id: _id, name, project} = args.input

  if (!_id && !name) {
    throw new Error('Invalid input')
  }
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
    id(task) {
      return task._id + ''
    },
    project(task, args, ctx) {
      return ctx.models.project
        .findById(task.project)
        .exec()
    },
    parentTask(task, args, ctx) {
      return ctx.models.task
        .findById(task.parentTask)
        .exec()
    }
  }
}
