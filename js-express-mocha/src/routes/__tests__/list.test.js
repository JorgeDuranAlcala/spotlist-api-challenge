const supertest = require("supertest")
const createApp = require("../../class/App")
const { Database } = require("../../class/Database")
const { app } = createApp(new Database())
const request = supertest(app)
const users = require("../../../../data/users.json")
const user = users[1]

//const apiUrl = 'http://localhost:8000'

describe('/users/:userId/lists', () => {
    test('should return lists of a given user', async () => {
        const res = await request.get(`/users/${user['id']}/lists`)
                            .auth(user['name'], user['password'])

            expect(res.statusCode).toEqual(200)
            expect(res.body).toBeInstanceOf(Array)
    })
})
