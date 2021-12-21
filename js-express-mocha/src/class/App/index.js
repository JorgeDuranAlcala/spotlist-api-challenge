const express = require("express")
const bodyParser = require("body-parser")
const IndexRouter = require("../../routes")
const { logErrorMiddleware, returnError } = require("../../Error/error-handler")

module.exports = (database) => {
    class App {
        constructor() {
             this.db = database
             this.app = express()
             this.settings()
             this.middlewares()
             this.routing()
        }

        settings() {
            this.app.set("port", process.env.PORT || 8000)
        }
        routing() {
            this.app.use("/", IndexRouter(this.db).initRoutes())
            if(!process.env === 'testing') this.app.use(logErrorMiddleware)
            this.app.use(returnError)
        }

        middlewares() {
            this.app.use(express.json())
            this.app.use(bodyParser.urlencoded({extended: false}))
        }
    }
    return new App()
}