const HTTP_STATUS_CODE = require("../constants/http-status-code")
const api400Error = require("../Error/400-error")
const createSongService = require("./songService")


module.exports = db => {

    const songSevice = createSongService(db)

    class SongController {

        /**
         * 
         * @param {Express.Request} req 
         * @param {Express.Response} res 
         * @param {Function} next
         */
         addNewSong(req, res, next) {
            try {
                if(!req.body.title || !req.body.artist) throw new api400Error("bad params")
                const song_created = songSevice.createSong(req.params.listid, req.body)
                return res.status(HTTP_STATUS_CODE.OK).send(song_created)
            } catch (error) {
                next(error)
            }
        }

    }

    return new SongController()
}