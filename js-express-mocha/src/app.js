const createApp = require("./class/App")
const Database = require("./class/Database")

const db = new Database()
const { app } = createApp(db)

module.exports = {
    app
}