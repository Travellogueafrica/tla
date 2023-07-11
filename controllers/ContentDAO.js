const slugify = require('slugify')
const Resp = require('./Response')
const unique = require('array-unique')
const contentModel = require('./../model/ContentModel')

const UserInit = {

    _create: (param, callback) => {
        const error = []
        if (!param.title || param.title == '')error.push('Post Title is required')
        if (!param.category || param.lastname == '')error.push('Category must be assigned')
        if (!param.content || param.content == '')error.push('Content is required')
        if (!param.author || param.author == '')error.push('Select an author for post')
        if (!param.destination || param.destination == '')error.push('Destination must be assigned to post')
        if (!param.short_content) param.short_content = content.slice(0, 250)

        if (error.length === 0) {
            //get category, author, destination...then submit content to database...
            const categoryModel = require('./../model/CategoryModel')
            categoryModel.findOne({slug:param.category}, (err, category) => {
                const catObject = {label:category.label, slug:category.slug}
                const authorModel = require('./../model/UserModel')
                authorModel.findOne({slug:param.author}, (err, author) => {
                    const authorObj = {firstname:author.firstname, lastname:author.lastname, email:author.email, slug:author.slug, profile:author.profile}
                    const destModel = require('./../model/DestinationModel')
                    destModel.findOne({slug:param.destination}, (err, dest) => {
                        const destObj = {name:dest.name, region:dest.region, country:dest.country, slug:dest.slug}
                        const data = {title:param.title, slug:slugify(param.title, {lower:true}), category:catObject, type:param.type, 
                                     short_content:param.short_content, content:param.content, image:unique(param.image.replace(" ", "").split(",")), author:authorObj, 
                                     keywords:param.keywords, media:param.media, destination:destObj, featured:param.featured,status:param.status, editorial:param.editorial,
                                     meta_title:param.meta_title, meta_keyword:param.meta_keyword, meta_description:param.meta_description}
                        contentModel.create(data, (err, resp) => {
                            if (err)
                                return callback(Resp.error({msg:'Error Encountered', resp:null}))
                            else
                                return callback(Resp.success({msg:'New Article Added.', resp:resp}))
                        })
                    })
                })
            })
        } else
            return callback(Resp.error({msg:'Invalid Parameter', resp:error}))
    },

    _update: (param, callback) => {
        const error = [], data = {featured:param.featured, status:param.status, editorial:param.editorial}
        if (!param.identity || param.identity == '')error.push('Provide Identity')
        if (param.title)data.title = param.title
        if (param.short_content)data.short_content = param.short_content
        if (param.content)data.content = param.content
        if (param.type)data.type = param.type
        if (param.keywords)data.keywords = param.keywords
        if (param.media)data.media = param.media
        if (param.image)data.image = unique(param.image.replace(" ", "").split(","))
        if (param.category) {
            const categoryModel = require('./../model/CategoryModel')
            categoryModel.findOne({slug:param.category}, (err, category) => {
                data.category = {label:category.label, slug:category.slug}
                const userModel = require('./../model/UserModel')
                userModel.findOne({slug:param.author}, (err, author) => {
                    data.author = {firstname:author.firstname, lastname:author.lastname, slug:author.slug, email:author.email, profile:author.profile}
                    const destModel = require('./../model/DestinationModel')
                    destModel.findOne({slug:param.destination}, (err, dest) => {
                        data.destination = {name:dest.name, region:dest.region, country:dest.country, slug:dest.slug}
                        if (error.length === 0) {
                            if (data) {
                                contentModel.findByIdAndUpdate(param.identity, data, {new:true}, (err, resp) => {
                                    console.log(err)
                                    if (resp) 
                                        return callback(Resp.success({msg:'Data Updated', resp:resp}))
                                    else
                                        return callback(Resp.error({msg:'Error Encountered', resp:'Error Encountered'}))
                                })
                            }
                        }
                    })
                })
            })
        }
    },

    _delete: (identity, callback) => {
        contentModel.remove({_id:identity}, (err, resp) => {
            if (resp) {
                return callback(Resp.success({msg:"Delete Successful", resp:true}))
            } else 
                return callback(Resp.error({msg:"Error Encountered.", resp:null}))
        })
    }
}

module.exports = UserInit