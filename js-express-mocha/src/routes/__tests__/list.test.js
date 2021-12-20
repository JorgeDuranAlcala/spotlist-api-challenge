const supertest = require("supertest")

const createApp = require("../../class/App")
const { Database } = require("../../class/Database")
const { app } = createApp(new Database())
const request = supertest(app)
const users = require("../../../../data/users.json")
const user = users[1]

const addListsPayload = {
    list: {
        name: 'list1',
        songs: [
            {
                artist: "artist1",
                title : "title1"
            },
            {
                artist: "artist2",
                title: "title2"
            }
        ]
    }
}


describe('/users/:userId/lists', () => {

    test('POST - should add a list to a given user', async () => {
        const res = await request
                            .post(`/users/${user['id']}/lists`)
                            .send(addListsPayload)
                            .auth(user['name'], user['password'])

        expect(res.statusCode).toEqual(200)
        expect(res.body.listId).toBeDefined()
        expect(res.body.songs).toEqual(addListsPayload.list.songs)
    })

    test('POST - should return 401 access denied', async () => {
        const res = await request
                            .post(`/users/${user['id']}/lists`)
                            .send(addListsPayload)
                            .auth(user['name'], "blablabla123")

        expect(res.statusCode).toEqual(401)
    })

    test('POST - should return 400 bad params', async () => {
        const badAddListPayload = {
                list: {
                    songs: [
                        {
                            artist: "artist1",
                            title : "title1"
                        },
                        {
                            artist: "artist2",
                            title: "title2"
                        }
                    ]
                }

        }
        const res = await request.post(`/users/${user['id']}/lists`)
                            .send(badAddListPayload)
                            .auth(user['name'], user['password'])

            expect(res.statusCode).toEqual(400)
    })

    test('GET - should return lists of a given user', async () => {
        const res = await request.get(`/users/${user['id']}/lists`)
                            .auth(user['name'], user['password'])

            expect(res.statusCode).toEqual(200)
            expect(res.body).toBeInstanceOf(Array)
    })
    test('GET - should return 401 access denied', async () => {
        const res = await request.get(`/users/${user['id']}/lists`)
                            .auth(user['name'], "123343ddsd")

            expect(res.statusCode).toEqual(401)
    })

    test('GET - should return 401 when the given userid doesnt belong to the user authenticated', async () => {
        const res = await request.get(`/users/12434444/lists`)
                            .auth(user['name'], user['password'])

            expect(res.statusCode).toEqual(401)
    })
})

describe('/users/:userid/lists/:listid', () => {
    beforeEach((done) => {
        request
            .post(`/users/${user['id']}/lists`)
            .send(addListsPayload)
            .auth(user['name'], user['password'])
            .then(response => {
                addListsPayload.list.listId = response.body.listId
                done()
            })
            .catch(console.error)
    })
})




