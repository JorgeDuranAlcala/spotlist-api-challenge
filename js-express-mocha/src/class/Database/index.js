const users = require('../../../../data/users.json');
const List = require('../../List/list');
const uuid = require("uuid");
const Song = require('../../song/song');
const User = require('../../User/user');
const { encrypt } = require('../../libraries/encrypt/encrypt');

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
            id
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

        list songs["23", "2323", "2323"]
        -- songs Map
        "23" => song
        "2323" => song
*/

class Database {
    constructor() {
        this.lists = new Map();
        this.users = this.serializeUsersData()
        this.songs = new Map()
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
     * @param {List | User} params 
     * @returns {List | User}
     */
    update(dataType, id, params) {
       this[dataType].set(id, params)
       return this[dataType].get(id)
    }

    /**
     * 
     * @returns {string}
     */
    generateId() {
        return uuid.v4()
    }

    /**
     * 
     * @returns {Map<string, typeof users[0]>}
     */
    serializeUsersData() {
        const usersMap = new Map()
        users.forEach((user) => {
            const newUser = new User(user.id, user.name, encrypt(user.password, 20))
            usersMap.set(newUser.id, newUser)
        })
        return usersMap
    }

    /**
     * 
     * @param {"lists" | "users"} dataType 
     * @param {string | undefined} id 
     * @returns {User[] | List[]}
     */
    find(dataType, id) {
        //if(!id && !this[dataType].has(id)) return;
        return id ? this[dataType].get(id) : [...this[dataType].values() ]   
    }

   /**
     * 
     * @param {"lists" | "users"} dataType 
     * @param {string} id 
     * @returns {boolean}
     */
    delete(datatype, id)
    {
        return this[datatype].delete(id)
    }

    drop(datatype)
    {
        return this[datatype] = new Map()
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
        case 'songs':
            return new Song(id, itemData.title, itemData.artist)
    }
}

module.exports = { createItem, Database}