const _config = require('./../config/app.json')
const dotenv = require('dotenv').config()

const Util = {

    param_extract: (req) => {
        let data = {}
        if (req.fields) 
            data = req.fields
        else if (req.body)
            data = req.body
        return data
    },
    
    resp: function(res){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        return res;
    },

    hash_password: (value) => {
        const bcrypt = require('bcryptjs')
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(value, salt)
    },

    passwordCompare: (pass1, pass2, callback) => {
        const bcrypt = require('bcryptjs')
        const result = bcrypt.compareSync(pass1, pass2)
        return callback(result)
    },

    tokenize: (payload, callback) => {
        const jwt = require('jsonwebtoken')
        const token = jwt.sign(payload, _config.jwt.key, {expiresIn: _config.jwt.expires})
        return callback(token)
    },

    geoInfo: async (address, callback) => {
        const axios = require('axios')
        const geoInfo = await axios.get(process.env.GEOAPI+'&ip_address='+address)
        return callback(geoInfo.data)
    }
}

module.exports = Util