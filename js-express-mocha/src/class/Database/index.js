const users = require('../../../../data/users.json');
const List = require('../../List/list');
const uuid = require("uuid")

/* 
    user
        - id (unique) string
        - username string
        - password string
        - lists [string]
    
    list
      - id (unique) string
      - songs [string]

    song 
        - title
        - artist


    user
     - id 23232
     - username john
     - password sdsd
     - lists [2323,232323,4343]
    
     lists[listId] = {id, name, songs}

     list: {
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
*/

class Database {
    constructor() {
        this.lists = new Map();
        this.users = new Map([...users])
    }

    /**
     * 
     * @param {string} dataType 
     * @param {Omit<List, 'listId'>} params 
     */
    create(dataType, params) {
        const id = this.generateId()
        this[dataType].set(id, createItem(id, dataType, params))
        return this[dataType].get(id)
    }
     /**
     * 
     * @param {string} dataType 
     * @param {Omit<List, 'listId'>} params 
     */
    update(dataType, params) {
        switch (dataType) {
            case 'list':
              this.lists.get(params.id).songs.push(params.song)
            break;
        }
    }

    generateId() {
        return uuid.v4()
    }

    /**
     * 
     * @param {"lists" | "users"} dataType 
     * @param {string | undefined} id 
     * @returns 
     */
    find(dataType, id) {
        if(!this[dataType].has(id)) return;
        return id ? this[dataType].get(id) : [...this[dataType].values() ]   
    }

}


function createItem(id, itemType, params) {
    switch (itemType) {
        case 'lists':
            return new List(id, params.name, params.songs)
    }
}

module.exports = Database