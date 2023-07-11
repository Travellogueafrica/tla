const mongoose = require('mongoose')

const SchemaDef = new mongoose.Schema({
    label:{type:String, default:""},
    slug:{type:String, unique:true},
    parent:{type:Object},
    description:{type:String, default:""},
    status:{type:Boolean, default:1},
    date_added:{type:Date, default:Date.now}
})

module.exports = mongoose.model('Categories', SchemaDef)