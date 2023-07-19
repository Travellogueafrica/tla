const mongoose = require('mongoose')

const SchemaDef = new mongoose.Schema({
    email:{type:String, default:"", unique:true},
    ip_address:{type:String, default:""},
    country:{type:String, default:""},
    country_code:{type:String, default:""},
    region:{type:String, default:""},
    city:{type:String, default:""},
    timezone:{type:String, default:""},
    status:{type:Boolean, default:1},
    date_added:{type:Date, default:Date.now}
})

module.exports = mongoose.model('Subscribers', SchemaDef)