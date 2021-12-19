const ListService = require("./listService")

module.exports = (db) => {

    class ListController {
        constructor() {
            this.listService = new ListService(db)
        }
        getAllLists() {
            return this.listService.getLists()
        }
    }

    return new ListController()
    
}