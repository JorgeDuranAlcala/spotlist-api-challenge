

class ListService {

    constructor(db) {
        this.db = db
    }

    getLists() {
        this.db.findData("lists")
    }
}

module.exports = ListService