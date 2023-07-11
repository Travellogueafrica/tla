const mongoose = require('mongoose')

const SchemaDef = new mongoose.Schema({
    firstname:{type:String, default:""},
    lastname:{type:String, default:""},
    slug:{type:String, unique:true},
    profile:{type:String, default:""},
    email:{type:String, default:""},
    role:{type:String, enum:['editor', 'administrator'], default:'editor'},
    image:{type:String, default:"https://res.cloudinary.com/hubitdev/image/upload/v1682542854/template-assets/avater_g3x3f6.png"},
    status:{type:Boolean, default:1},
    date_added:{type:Date, default:Date.now}
})

module.exports = mongoose.model('Users', SchemaDef)