const slugify = require('slugify')
const Resp = require('./Response')
const destModel = require('./../model/DestinationModel')

const DestInit = {

    _create: (param, callback) => {
        const error = []
        if (!param.name || param.name == '')error.push('Name is required')
        if (!param.region || param.region == '')error.push('Region is required')
        if (!param.country || param.country == '')error.push('Country is required')

        if (error.length === 0) {
            const data = {name:param.name, region:param.region, slug:slugify(param.name, {lower:true}), country:param.country, profile:param.profile, image:param.image}
            destModel.create(data, (err, resp) => {
                if (err)
                    return callback(Resp.error({msg:'Error Ecountered', resp:null}))
                else 
                    return callback(Resp.success({msg:'New destination added', resp:resp}))
            })
        } else 
            return callback(Resp.error({msg:'Invalid Parameter', resp:error}))
    },

    _update: (param, callback) => {
        const error = [], data = {}
        if (!param.identity || param.identity == '')error.push('Provide Identity')
        if (param.name)data.name = param.name
        if (param.name)data.slug = slugify(param.name, {lower:true})
        if (param.region)data.region = param.region
        if (param.country)data.country = param.country
        if (param.profile)data.profile = param.profile
        if (param.image)data.image = param.image

        if (error.length === 0) {
            if (data) {
                destModel.findByIdAndUpdate(param.identity, data, {new:true}, (err, resp) => {
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
        destModel.findOne({_id:identity}).exec((err, data) => {
            if (data) {
                return callback(Resp.success({msg:"Data found", resp:data})) 
            } else
                return callback(Resp.error({msg:"Data not found", resp:null}))
        })
    },

    _delete: (identity, callback) => {
        destModel.remove({_id:identity}, (err, resp) => {
            if (resp) {
                return callback(Resp.success({msg:"Delete Successful", resp:true}))
            } else 
                return callback(Resp.error({msg:"Error Encountered.", resp:null}))
        })
    }
}

module.exports = DestInit