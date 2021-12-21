const supertest = require("supertest")

const createApp = require("../../class/App")
const { Database } = require("../../class/Database")
const { app, db } = createApp(new Database())
const request = supertest(app)
//const users = require("../../../../data/users.json")
const userService = require("../../User/userService")(db)

const users = userService.getAllUsers()
const user = users[1]

process.env = "testing"

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

const addSongPayload = {
    artist: 'Rage against the machine',
    title: 'killing in the name'
}

describe("/users/:userid/lists/:listid/songs", () => {

    let apiUrl = `/users/${user['id']}/lists`
    let addSongBasePath

    beforeAll(async () => {
        const res = await request
                            .post(`/users/${user['id']}/lists`)
                            .send(addListsPayload)
                            .auth(user['name'], user['password'])
        const listId = res.body.listId
        addListsPayload.list.listId = listId
        addSongBasePath = `/${listId}/songs`
    })

    it('should add a song to an existing list', async () => {
        const res = await request
                            .post(`${apiUrl}${addSongBasePath}`)
                            .send(addSongPayload)
                            .auth(user['name'], user['password'])
        
        expect(res.statusCode).toEqual(200)
        expect(res.body.title).toEqual(addSongPayload.title)
        expect(res.body.artist).toEqual(addSongPayload.artist)
    })

    it('should throw 400 if list id does not exist', async () => {
        const randomListIdBasePath = `/users/${user['id']}/lists/1111111/songs`

        const res = await request
        .post(randomListIdBasePath)
        .send(addSongPayload)
        .auth(user['name'], user['password'])

        expect(res.statusCode).toEqual(400)
    })

    it('should throw 401 if user does not have permissions to the list', async () => {
        const nonOwnerUser = users[2]

        const res = await request
        .post(`${apiUrl}${addSongBasePath}`)
        .send(addSongPayload)
        .auth(nonOwnerUser['name'], nonOwnerUser['password'])

        expect(res.statusCode).toEqual(401)
    })

    it('should throw 401 if user does not exist', async () => {
        const res = await request
        .post(`${apiUrl}${addSongBasePath}`)
        .send(addSongPayload)
        .auth(user['name'], "blasasjas")

        expect(res.statusCode).toEqual(401)
    })



})