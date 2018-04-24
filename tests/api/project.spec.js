const db = require('../db')
const { runQuery } = require('../run')
const projectResolvers = require('../../src/api/project/project.resolvers')

describe('Project', () => {
  beforeAll(db.connectToDB)
  afterAll(db.disconnectDB)
  afterEach(db.cleanDB)

  describe('resolvers', () => {
    describe('project', () => {
      test('should resolve correctly', async () => {
        const project = await db.models.project.create({name: 'test'})
        const result = await projectResolvers.Query
          .project(null, {input: {id: project._id}}, {models: db.models})
        
        expect(result._id + '').toBe(project._id + '')
      })

      test('should have correct query', async () => {
        const project = await db.models.project.create({name: 'test'})
        const input = {input: {id: project._id}}
        const query = `
          query Project($input: ProjectInput!){
            project(input: $input) {
              id
              name
            }
          }
        `
        const {data, errors} = await runQuery(query, input)
        expect(errors).toBeUndefined
        expect(data.project.id).toBe(project._id + '')
      })
    })
  })
})
