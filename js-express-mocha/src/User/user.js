class User {
    constructor(id, name, password) {
        this.id = id;
        this.name = name;
        this.password = password
        this.lists = []
    }
}

module.exports = User