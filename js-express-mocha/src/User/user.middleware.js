
module.exports = db => {
    return function userMiddleware(req, res, next) {
        if(!req.params.userid) return res.status(400).send({description: "invalid params"})
        const user = db.find('users', req.params.userid)
        if(!user) return res.status(401).send({description: "user not found with this id"})
        const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
                const strauth = Buffer.from(b64auth, 'base64').toString()
                const [_, login, password] = strauth.match(/(.*?):(.*)/) || []
               // const user = db.find("users", req.params.userid)
                if(login && password && user.name === login && user.password === password) {
                    req.user = user
                    return next()
                }
                return res.status(401).send("Unauthorized")
    }
}