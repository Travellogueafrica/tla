const mongoose = require('mongoose')

const SchemaDef = new mongoose.Schema({
    post_id: {type:String, default:""},
    comment: {type:String, default:""},
    name: {type:String, default:""},
    title:{type:String, default:""},
    email:{type:String, default:""},
    status:{type:Boolean, default:0},
    moderation:{type:String, enum:['Approved', 'Disapproved', 'Pending'], default:'Pending'},
    date_added:{type:Date, default:Date.now}
})

module.exports = mongoose.model('comments', SchemaDef)