const { Router } = require("express")
const listController = require("../List/list.controller")
const userMiddleware = require("../User/user.middleware")

module.exports = (db) => {

    class IndexRoute {
        constructor() 
        {
            this.router = Router()
            this.listController = listController(db)
        }
    
        initRoutes() {
            this.router.get("/users/:userid/lists" , userMiddleware(db), this.listController.getAllLists)
            return this.router
        }
    }

    return new IndexRoute()
}