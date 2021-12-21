const HTTP_STATUS_CODE = require("../constants/http-status-code");
const api400Error = require("../Error/400-error");
const api404Error = require("../Error/404-error");
const createListService = require("./listService")

module.exports = (db) => {
    
    const listService = createListService(db)

    class ListController {
        /**
         * 
         * @param {Express.Request} req 
         * @param {Express.Response} res 
         * @param {Function} next
         */
        getAllLists(req, res) {
                try {
                    const lists = listService.getLists(req.user)
                    return res.status(HTTP_STATUS_CODE.OK).send(lists)
                } catch (error) {
                    next(error)
                }
        }

        /**
         * 
         * @param {Express.Request} req 
         * @param {Express.Response} res 
         * @param {Function} next
         */
        addNewList(req, res, next) {
            try {
                if(!req.body.list || !req.body.list.name) throw new api400Error("bad params")
                const newList = listService.addList(req.user, req.body.list)
                return res.status(HTTP_STATUS_CODE.OK).send(newList)
            } catch (error) {
                next(error)
            }
        }

        /**
         * 
         * @param {Express.Request} req 
         * @param {Express.Response} res 
         * @param {Function} next
         */
        getListById(req, res, next) {
            try {
                if(!req.params.listid) throw new api400Error("listid is missing")
                const myList = listService.getListById(req.user, req.params.listid)
                if(!myList) throw new api404Error(`list with ID: ${req.params.listid} not found`);
                return res.status(HTTP_STATUS_CODE.OK).send(myList)
            } catch (error) {
                next(error)
            }
        }
    }

    return new ListController()
    
}