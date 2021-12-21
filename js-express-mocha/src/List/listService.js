

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
                return db.find('lists', list)
            }
            
            addList(user, dataList) 
            {
                dataList.songs = dataList.songs.map(song => db.create("songs", song))
                const mylist = db.create('lists', dataList)
                db.update('users', user.id, {...user, lists: [...user.lists, mylist.listId]});
                return mylist
            }
    }

    return new ListService()

}
