const express = require("express")
const bodyParser = require("body-parser")

module.exports = (database) => {
    class App {
        constructor() {
             this.db = database
             this.app = express()
        }

        settings() {
            this.app.set("port", process.env.PORT || 8000)
        }
        routing() {
            this.app.use("/")
        }

        middlewares() {
            this.app.use()
            this.app.use(bodyParser.urlencoded({extended: false}))
        }
    }
    return new App()
}