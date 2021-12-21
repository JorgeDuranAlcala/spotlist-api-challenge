const express = require("express")
const bodyParser = require("body-parser")
const IndexRouter = require("../../routes")
const morgan = require("morgan")
const cors = require("cors")
const compression = require("compression")
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
            this.app.use(morgan('dev'))
            this.app.use(cors())
            this.app.use(compression())
        }
    }
    return new App()
}