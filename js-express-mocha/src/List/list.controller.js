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
                /* const user = db.find('users', req.params.userid)
                const lists = this.listService.getLists(user) */
                //const lists = userService(db, req.user)
                console.log(req.user)
                const lists = listService.getLists(req.user)
                return res.status(200).send(lists)
        }

        addNewList() {

        }
    }

    return new ListController()
    
}