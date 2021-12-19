const Database = require(".");
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

    test('should add a new list to db', () => {
        const mockListData = {
            name: "list1"
        }
        const myList = db.create('lists', mockListData)
        expect(myList.name).toEqual(mockListData.name)
        expect(myList.listId).toBeDefined()
        expect(myList.songs.length).toEqual(0)
        console.log(db)
    })
    test('should find', () => {
        expect(1).toEqual(1)
    })
    test('should update a list appending a new to it', () => {
        
        expect(1).toEqual(1)
    })
    test('should gen an random id', () => {
        const id = db.generateId()
        expect(id).not.toBeUndefined()
        /* expect(db.generateId).toHaveBeenCalled()
        expect(db.generateId).toHaveBeenCalledTimes(1) */
    })
    
})