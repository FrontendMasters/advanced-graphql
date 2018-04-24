const search = async (_, args, ctx) => {
  const query = {$text: {$search: args.name}}
  
  const results = await Promise.all([
    ctx.models.task.find(query).exec(),
    ctx.models.project.find(query).exec()
  ])
  return [].concat(...results)
}

module.exports = {
  Query: {
    search
  },
  SearchResult: {
    __resolveType(searchResult) {
      if (searchResult.type) {
        if (searchResult.type === 'dev') {
          return 'DevTask'
        } else {
          return 'DesignTask'
        }
      } else {
        return 'Project'
      }
    }
  }
}
