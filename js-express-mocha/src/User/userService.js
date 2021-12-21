
module.exports = (db) => {
    class UserService {

        getAllUsers() {
            return db.find('users')
        }
    }

    return new UserService()
}