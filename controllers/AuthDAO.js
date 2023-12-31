const Resp = require('./Response')
const Util = require('./../libraries/Utility')
const userModel = require('./../model/UserModel')

const AuthInit = {

    user_signin: (req, res) => {
        res.render('auth/signin', {})
    },

    activate_user: (req, res) => {
        res.render('auth/activate', {})
    },

    forgot_password: (req, res) => {
        res.render('auth/reset', {})
    }

}

module.exports = AuthInit