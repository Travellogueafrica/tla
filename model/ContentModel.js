const mongoose = require('mongoose')

const SchemaDef = new mongoose.Schema({
    title:{type:String, default:""},
    category:{type:Object},
    slug:{type:String, unique:true},
    type:{type:String, default:""},
    short_content:{type:String, default:""},
    content:{type:String, default:""},
    media:{type:String, default:""},
    keywords:{type:Array},
    destination:{type:Object},
    author:{type:Object},
    featured:{type:Boolean, default:0},
    editorial:{type:Boolean, default:0},
    image:{type:Array},
    meta_title:{type:String, default:""},
    meta_keyword:{type:String, default:""},
    meta_description:{type:String, default:""},
    status:{type:Boolean, default:0},
    date_added:{type:Date, default:Date.now},
    date_modified:{type:Date}
})

module.exports = mongoose.model('Contents', SchemaDef)