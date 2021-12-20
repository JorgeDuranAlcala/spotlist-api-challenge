

module.exports = (db) => {

    class ListService {
            
            getLists(user) 
            {   
                const listIds = user.lists
                const lists = db.find("lists")
                return lists.filter(list => listIds.includes(list.listId))
            }

            getListById(user, listId)
            {
                const list = user.lists.find(id => id === listId)
                return this.db.find('lists', list)
            }
            
            addList(data) 
            {
                
            }
    }

    return new ListService()

}
