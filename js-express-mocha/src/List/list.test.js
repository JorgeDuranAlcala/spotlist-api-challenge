const List = require("./list")


describe('Lists', () => {
    test('should create a list', () => {
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
    
})
