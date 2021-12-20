const users = require('../../../../data/users.json');
const List = require('../../List/list');
const uuid = require("uuid");
const Song = require('../../song/song');
const User = require('../../User/user');

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
        this.users = this.getUsersData()
    }

    /**
     * 
     * @param {string} dataType 
     * @param {Omit<List, 'listId'>} params 
     */
    create(dataType, params) {
        const id = this.generateId()
        this[dataType].set(id, createItem(dataType, params, id))
        return this[dataType].get(id)
    }
     /**
     * 
     * @param {string} dataType 
     * @param {Omit<List, 'listId'>} params 
     */
    update(dataType, id, params) {
       this[dataType].set(id, params)
       /*  switch (dataType) {
            case 'list':
              this.lists.get(params.id).songs.push(params.song)
            break;
            case 'user':
                this.users.set(params.id, params)
        } */
    }

    generateId() {
        return uuid.v4()
    }

    /**
     * 
     * @returns {Map<string, typeof users[0]>}
     */
    getUsersData() {
        const usersMap = new Map()
        users.forEach((user) => {
            const newUser = new User(user.id, user.name, user.password)
            usersMap.set(newUser.id, newUser)
        })
        return usersMap
    }

    /**
     * 
     * @param {"lists" | "users"} dataType 
     * @param {string | undefined} id 
     * @returns 
     */
    find(dataType, id) {
        if(id && !this[dataType].has(id)) return;
        return id ? this[dataType].get(id) : [...this[dataType].values() ]   
    }

}


/**
 * 
 * @param {string} id 
 * @param {string} itemType 
 * @param {Omit<List, "listId"> | Song} itemData
 * @returns {void}
 */
function createItem(itemType, itemData, id) {
    switch (itemType) {
        case 'lists':
            return new List(id, itemData.name, itemData.songs);
        case 'song':
            return new Song(itemData.title, itemData.artist)
    }
}

module.exports = { createItem, Database}