const api400Error = require("../Error/400-error")
const Song = require("./song")


module.exports  = db => {
    class SongService {

        /**
         * 
         * @param {string} listId 
         * @param {Song} songData 
         * @returns {Song}
         */
        createSong(listId, songData) {
            const list = db.find('lists', listId)
            if(!list) throw new api400Error("list does not exist");
            const newSong = db.create('songs', songData)
            list.songs.push(newSong)
            const listUpdated = db.update("lists", list.listId,list)
            return listUpdated.songs.find(song => song.id === newSong.id)
        }

    }

    return new SongService()
}