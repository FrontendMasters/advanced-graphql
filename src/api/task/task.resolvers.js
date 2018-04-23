const task = async () => {}
const changeStatus = async () => {}
const removeTask = async () => {}

module.exports = {
  Query: {
    task
  },
  Mutation: {
    changeStatus,
    removeTask
  },
  Task: {
    id(task) {
      return task._id + ''
    },
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

  },
  DesignTask: {
    
  }
}
