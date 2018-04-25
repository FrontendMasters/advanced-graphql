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
      /*
        You must resolve the type for SearchResult
        Think about the differences between a Project and a Task
        Then the difference between a DevTask and A DesignTask
      */
    }
  }
}
