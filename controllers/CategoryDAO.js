const slugify = require('slugify')
const Resp = require('./Response')
const categoryModel = require('./../model/CategoryModel')
const tagModel = require('./../model/TagModel')

const CategoryInit = {

    _create: (param, callback) => {
        const error = [], parent = {}
        if (!param.label || param.label == '')error.push('Category Name is required')
        // if (param.parent && param.parent != '') {
        //     categoryModel.findOne({_id:param.parent}, (err, _resp) => {
        //         parent.id = _resp._id; parent.label = _resp.label; parent.slug = _resp.slug
        //     })
        // }

        if (error.length === 0) {
            const data = {label:param.label, slug:slugify(param.label, {lower:true}), parent:parent, description:param.description}
            console.log(data)
            categoryModel.create(data, (err, resp) => {
                if (err)
                    return callback(Resp.error({msg:'Error Ecountered', resp:null}))
                else 
                    return callback(Resp.success({msg:'New category added', resp:resp}))
            })
        } else 
            return callback(Resp.error({msg:'Invalid Parameter', resp:error}))
    },

    _update: (param, callback) => {
        const error = [], data = {}
        if (!param.identity || param.identity == '')error.push('')
        if (param.label)data.label = param.label
        if (param.label)data.slug = slugify(param.label, {lower:true})
        if (param.description)data.description = param.description

        if (error.length === 0) {
            if (data) {
                categoryModel.findByIdAndUpdate(param.identity, data, {new:true}, (err, resp) => {
                    if (resp) {
                        return callback(Resp.success({msg:'Data updated', resp:resp}))
                    } else 
                        return callback(Resp.error({msg:'Error saving data', resp:null}))
                })
            }
        } else 
            return callback(Resp.error({msg:'Invalid Parameter', resp:error}))
    },

    by_identity: (identity, callback) => {
        categoryModel.findOne({_id:identity}).exec((err, data) => {
            if (data) {
                return callback(Resp.success({msg:"Data found", resp:data})) 
            } else
                return callback(Resp.error({msg:"Data not found", resp:null}))
        })
    },

    _delete: (identity, callback) => {
        categoryModel.remove({_id:identity}, (err, resp) => {
            if (resp) {
                return callback(Resp.success({msg:"Delete Successful", resp:true}))
            } else 
                return callback(Resp.error({msg:"Error Encountered.", resp:null}))
        })
    },

    _tag_create: (param, callback) => {
        const error = []
        if (!param.name || param.name == '')error.push('Tag Name is required')

        if (error.length === 0) {
            const data = {name:param.name, slug:slugify(param.name, {lower:true})}
            tagModel.create(data, (err, resp) => {
                if (err)
                    return callback(Resp.error({msg:'Error Ecountered', resp:null}))
                else 
                    return callback(Resp.success({msg:'New tag added', resp:resp}))
            })
        } else 
            return callback(Resp.error({msg:'Invalid Parameter', resp:error}))
    },

    tag_update: (param, callback) => {
        const error = [], data = {}
        if (!param.identity || param.identity == '')error.push('Provide Identity')
        if (param.name)data.name = param.name
        if (param.name)data.slug = slugify(param.name, {lower:true})

        if (error.length === 0){
            if (data) {
                tagModel.findByIdAndUpdate(param.identity, data, {new:true}, (err, resp) => {
                    if (resp) {
                        return callback(Resp.success({msg:'Data updated', resp:resp}))
                    } else 
                        return callback(Resp.error({msg:'Error saving data', resp:null}))
                })
            }
        } else 
            return callback(Resp.error({msg:'Invalid Parameter', resp:error}))
    },

    tag_by_identity: (identity, callback) => {
        tagModel.findOne({_id:identity}).exec((err, data) => {
            if (data) {
                return callback(Resp.success({msg:"Data found", resp:data})) 
            } else
                return callback(Resp.error({msg:"Data not found", resp:null}))
        })
    },

    tag_delete: (identity, callback) => {
        tagModel.remove({_id:identity}, (err, resp) => {
            if (resp) {
                return callback(Resp.success({msg:"Delete Successful", resp:true}))
            } else 
                return callback(Resp.error({msg:"Error Encountered.", resp:null}))
        })
    }
}

module.exports = CategoryInit