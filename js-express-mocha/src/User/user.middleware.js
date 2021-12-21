const ErrorUnauthorized = require("../Error/401-error")
const api404Error = require("../Error/404-error")

module.exports = db => {
    return function userMiddleware(req, res, next) {
        try {
            if(!req.params.userid) throw new api404Error("Bad params - userid param is undefined")
            const user = db.find('users', req.params.userid)
            if(!user) throw new ErrorUnauthorized(`User with id: ${req.params.userid} not found`)
            const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
            const strauth = Buffer.from(b64auth, 'base64').toString()
            const [_, login, password] = strauth.match(/(.*?):(.*)/) || []
            if(user.name !== login || user.password !== password || !login || !password) throw new ErrorUnauthorized(`user is not the one authenticated`)
            req.user = user
            return next()
        } catch(err) {
            next(err)
        }
        
    }
}