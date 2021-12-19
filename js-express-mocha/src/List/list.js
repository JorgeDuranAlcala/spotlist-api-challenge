
class List {
    constructor(id, name, songs = []) {
        this.listId = id;
        this.name = name
        this.songs = [...songs]
    }
}

module.exports = List