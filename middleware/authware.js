const jwt = require('jsonwebtoken')
const config = require('./../config/app.json')

exports.AuthChecker = (req, res, next) => {
    const token = req.cookies.token
    if (token){
        jwt.verify(token, config.jwt.key, (err, decoded) => {
            if (decoded) {
                req.user = decoded
                req.isAuth = true
                next()
            } else {
                req.isAuth = false
                res.redirect('/auth/sign-in')
            }
        })
    } else {
        res.redirect('/auth/sign-in')
        //res.status(403).json({msg:"Access Forbidden"})
    }
}