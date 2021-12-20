const createListService = require("./listService")

function userService(db, user)
{
    const listIds = user.lists;
    return !listIds ? [] : listIds.map(id => sdb.find('lists', id))
    return []
}

module.exports = (db) => {
    
    const listService = createListService(db)

    class ListController {
        constructor() {
           // this.listService = createList(db)
        }
        getAllLists(req, res) {
                const lists = listService.getLists(req.user)
                return res.status(200).send(lists)
        }

        /**
         * 
         * @param {Request} req 
         * @param {Response} res 
         */
        addNewList(req, res) {
            if(!req.body.list || !req.body.list.name) return res.status(400).send(new Error("Invalid params"));
            const newList = listService.addList(req.body)
            return res.status(200).send(newList)
        }
    }

    return new ListController()
    
}