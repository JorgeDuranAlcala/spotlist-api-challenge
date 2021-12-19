const { Router } = require("express")
const listController = require("../List/list.controller")

module.exports = (db) => {

    class IndexRoute {
        constructor() 
        {
            this.router = Router()
        }
    
        initRoutes() {
            this.router.get("/users/:userid/lists", listController(db))
            return this.router
        }
    }

    return new IndexRoute()
}