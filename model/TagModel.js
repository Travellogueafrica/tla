const mongoose = require('mongoose')

const SchemaDef = new mongoose.Schema({
    name:{type:String, default:""},
    slug:{type:String, unique:true},
    date_added:{type:Date, default:Date.now}
})

module.exports = mongoose.model('Tags', SchemaDef)