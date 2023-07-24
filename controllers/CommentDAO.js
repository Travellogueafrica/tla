const commentModel = require('./../model/CommentModel')
const Resp = require('./Response')

const CommentInit = {

    _add_comment: (param, callback) => {
        const error = []
        if (!param.name || param.name == '')error.push('Name is required')
        if (!param.email || param.email == '')error.push('Email is required')
        if (!param.comment || param.comment == '')error.push('Comment cannot be blank')
        if (!param.post_id || param.post_id == '')error.push('Post ID is required')

        if (error.length === 0){
            const data = {post_id:param.post_id, name:param.name, title:param.title,  email:param.email, comment:param.comment}
            commentModel.create(data, (err, resp) => {
                if (resp) {
                    return callback(Resp.success({msg:'Comment added', resp:resp}))
                } else
                    return callback(Resp.error({msg:'Error Encountered', resp:null}))
            })
        } else 
            return callback(Resp.error({msg:'Invalid Parameter', resp:error}))
    },

    _moderate_comment: (param, callback) => {
        const data = {identity:param.identity, moderation:param.moderation, status:param.status}
        commentModel.findByIdAndUpdate(param.identity, data, {new:true}, (err, resp) => {
            if (resp) {
                return callback(Resp.success({msg:'Data updated', resp:resp}))
            } else 
                return callback(Resp.error({msg:'Error saving data', resp:null}))
        })
    },

    by_identity: (identity, callback) => {
        commentModel.findOne({_id:identity}).exec((err, data) => {
            if (data) {
                return callback(Resp.success({msg:"Data found", resp:data})) 
            } else
                console.log(err)
                //return callback(Resp.error({msg:"Data not found", resp:null}))
        })
    },

    _delete: (identity, callback) => {
        commentModel.remove({_id:identity}, (err, resp) => {
            if (resp) {
                return callback(Resp.success({msg:"Delete Successful", resp:true}))
            } else 
                return callback(Resp.error({msg:"Error Encountered.", resp:null}))
        })
    }

}

module.exports = CommentInit