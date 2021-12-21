const {Database} = require(".");
const users = require("../../../../data/users.json")
//jest.mock(".")
/* jest.mock(".", () => ({
    update: jest.fn(),
    create: jest.fn(),
    find: jest.fn(),
    generateId: jest.fn()
})) */

describe('Database class', () => {
    let db;

    beforeEach(() => {
        db = new Database()
    })

    afterEach(() => {
        db.drop("lists")
        db.drop("users")
    })

    test('should add a new list to db', () => {
        const mockListData = {
            name: "list1"
        }
        const myList = db.create('lists', mockListData)
        expect(myList.name).toEqual(mockListData.name)
        expect(myList.listId).toBeDefined()
        expect(myList.songs.length).toEqual(0)
    })
    test('should find a list by id', () => {
        const mockListData = {
            name: "list1"
        }
        const my_list = db.create('lists', mockListData)
        const list = db.find("lists", my_list.listId)
        expect(list).toBeDefined()
        expect(list).toEqual(my_list)
    })
    test('should return an array of lists', () => {
        const mockListDataOne = { name: "list1"}
        const mockListDataTwo = { name: "list2"}
        db.create('lists', mockListDataOne)
        db.create('lists', mockListDataTwo)
        const lists = db.find("lists")
        expect(lists).toBeInstanceOf(Array)
        expect(lists.length).toEqual(2)
    })
    test('should update an item in the database ', () => {
        const mockListDataOne = { name: "list1"}
        const users = db.find("users")
        const user = users[1]
        const mylist = db.create('lists', mockListDataOne)
        const userUpdated = db.update('users', user.id, {...user, lists: [...user.lists, mylist.listId]});
        expect(userUpdated.lists[0]).toEqual(mylist.listId)
    })
    
    describe('delete method', () => {
        test('should delete an item in the database', () => {
            const mockListData = { name: "list2"}
            const list = db.create('lists', mockListData)
            db.delete("lists", list.listId)
            const list_deleted = db.find('lists', list.listId)
            expect(list_deleted).toBeUndefined()
        })
        test('should return false when the id param either does not exist or is undefined', () => {
            const returnedValue = db.delete("lists", "123456")
            expect(returnedValue).toBeFalsy()
        })
    })
    
    
    test('should gen an random id', () => {
        const id = db.generateId()
        expect(id).not.toBeUndefined()
    })
    
    
})