const List = require("./list")
//const users = require("../../../data/users.json")


describe('Lists', () => {
    test('should create an instance of a list class', () => {
        const expectedListData = {
            listId: "aaa123",
            name: "my-wonderful-list",
            songs: []
        }
        const list = new List(expectedListData.listId, expectedListData.name)
        expect(list.listId).toEqual(expectedListData.listId)
        expect(list.name).toEqual(expectedListData.name)
        expect(list.songs).toBeInstanceOf(Array)
    })

    describe('List service', () => {
        
       /*  test('should return an array of lists', () => {
            
        })
         */

    })
    
})
