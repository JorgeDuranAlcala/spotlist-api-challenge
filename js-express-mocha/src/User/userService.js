const users = require("../../../data/users.json")

module.exports = () => {
    class UserService {

        getAllUsers() {
            return users
        }
    }

    return new UserService()
}