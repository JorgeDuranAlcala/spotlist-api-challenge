const { Router } = require("express")
const createListController = require("../List/list.controller")
const createSongController = require("../song/song.controller")
const userMiddleware = require("../User/user.middleware")

module.exports = (db) => {

    class IndexRoute {
        constructor() 
        {
            this.router = Router()
            this.listController = createListController(db)
            this.songController = createSongController(db)
        }
    
        initRoutes() {
            this.router.get("/users/:userid/lists" , userMiddleware(db), this.listController.getAllLists)
            this.router.get("/users/:userid/lists/:listid", userMiddleware(db) , this.listController.getListById)
            this.router.post("/users/:userid/lists", userMiddleware(db) , this.listController.addNewList)
            this.router.post("/users/:userid/lists/:listid/songs", userMiddleware(db) , this.songController.addNewSong)
            return this.router
        }
    }

    return new IndexRoute()
}