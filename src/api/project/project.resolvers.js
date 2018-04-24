const project = async (_, args, ctx, info) => {
  const project = await ctx.models.project
    .findById(args.input.id)
    .exec()

  if (!project) {
    throw new Error('Project does not exist')
  }

  return project
}

const projects = (_, __, ctx) => {
  return ctx.models.project.find({}).exec()
}

const newProject = (_, args, ctx) => {
  return ctx.models.project.create(args.input)
}

module.exports = {
  Query: {
    project,
    projects
  },
  Mutation: {
    newProject
  },
  Project: {
    id(project) {
      return project._id + ''
    },
    tasks(project, _, ctx) {
      // can you find a way to use loader here?
      return ctx.models.task.find({
        project: project._id
      })
        .exec()
    }
  }
}
