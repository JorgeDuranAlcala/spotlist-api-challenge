const users = require('../../../../data/users.json')

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
        this.users = [...users]
    }

    create(dataType, params) {
        const id = this.generateId()
        this[dataType].set(id, params)
    }

    update(dataType, params) {
        switch (dataType) {
            case 'list':
              this.lists.get(params.id).songs.push(params.song)
            break;
        }
    }

    generateId() {

    }

    find(dataType, id) {
        if(!this[dataType].has(id)) return;
        return this[dataType].get(id)    
    }

}

module.exports = Database