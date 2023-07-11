const mongoose = require('mongoose')

const SchemaDef = new mongoose.Schema({
    name:{type:String, default:""},
    slug:{type:String, unique:true},
    region:{type:String, default:""},
    country:{type:String, default:""},
    profile:{type:String, default:""},
    image:{type:String, default:""},
    status:{type:Boolean, default:1},
    date_added:{type:Date, default:Date.now}
})

module.exports = mongoose.model('Destination', SchemaDef)