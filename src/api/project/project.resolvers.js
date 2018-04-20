const project = async (_, args, ctx, info) => {
  const project = await ctx.models.project
    .findById(args.id)
    .exec()

  if (!project) {
    throw new Error('Project does not exist')
  }

  return project
}

module.exports = {
  Query: {
    project
  },
  Project: {
    id(project) {
      return project._id + ''
    }
  }
}
