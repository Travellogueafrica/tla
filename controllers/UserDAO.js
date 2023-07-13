const slugify = require('slugify')
const Resp = require('./Response')
const userModel = require('./../model/UserModel')
const Util = require('./../libraries/Utility')

const UserInit = {

    _create: (param, callback) => {
        const error = []
        if (!param.firstname || param.firstname == '')error.push('First Name is required')
        if (!param.lastname || param.lastname == '')error.push('Last Name is required')
        if (!param.email || param.email == '')error.push('Email Address is required')
        //if (!param.role || param.role == 'none')error.push('User role must be assigned')

        if (error.length === 0) {
            const data = {firstname:param.firstname, lastname:param.lastname, slug:slugify(param.firstname+'-'+param.lastname, {lower:true}),
                          email:param.email, role:param.role,  profile:param.profile}
            userModel.create(data, (err, resp) => {
                if (err)
                    return callback(Resp.error({msg:'Error Ecountered', resp:null}))
                else 
                    return callback(Resp.success({msg:'New user added', resp:resp}))
            })
        } else 
            return callback(Resp.error({msg:'Invalid Parameter', resp:error}))
    },

    _activate_user: (param, callback) => { //{identity, password}
        const error = []
        if (!param.identity || param.identity == '')error.push('User ID is required')
        if (!param.password || param.password == '')error.push('Password cannot be blank')

        if (error.length === 0) {
            const data = {password:Util.hash_password(param.password), status:1}
            userModel.findByIdAndUpdate(param.identity, data, (err, resp) => {
                if (resp)
                    return callback(Resp.success({msg:'Data updated', resp:resp}))
                else
                    return callback(Resp.error({msg:'Could not save data', resp:null}))
            })
        } else
            return callback(Resp.error({msg:'Invalid Parameter', resp:error}))
    },

    _update: (param, callback) => {
        const error = [], data = {}
        if (!param.identity || param.identity == '')error.push('Provide Identity')
        if (param.firstname)data.firstname = param.firstname
        if (param.lastname)data.lastname = param.lastname
        if (param.email)data.email = param.email
        if (param.profile)data.profile = param.profile
        if (param.image)data.image = param.image
        data.slug = slugify(param.firstname+'-'+param.lastname, {lower:true})

        if (error.length === 0) {
            if (data) {
                userModel.findByIdAndUpdate(param.identity, data, {new:true}, (err, resp) => {
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
        userModel.findOne({_id:identity}).exec((err, data) => {
            if (data) {
                return callback(Resp.success({msg:"Data found", resp:data})) 
            } else
                return callback(Resp.error({msg:"Data not found", resp:null}))
        })
    },

    _delete: (identity, callback) => {
        userModel.remove({_id:identity}, (err, resp) => {
            if (resp) {
                return callback(Resp.success({msg:"Delete Successful", resp:true}))
            } else 
                return callback(Resp.error({msg:"Error Encountered.", resp:null}))
        })
    },

    _login_user: (param, callback) => {
        const error = []
        if (!param.email || param.email == '')error.push('Email is required')
        if (!param.password || param.password == '')error.push('Password is required')

        if (error.length === 0) {
            userModel.findOne({email:param.email}, (err, user) => {
                if (user){
                    Util.passwordCompare(param.password, user.password, (match) => {
                        if (match) {
                            if (user.status) {
                                const payload = {id:user._id, role:user.role}
                                Util.tokenize(payload, (token) => {
                                    return callback(Resp.success({msg:"Login Successful", resp:token}))
                                })
                            } else
                                return callback(Resp.error({msg:'Account Not Activated', resp:null}))
                        } else 
                            return callback(Resp.error({msg:'Incorrect Password', resp:null}))
                    })
                } else
                    return callback(Resp.error({msg:'User Not Found', resp:null}))
            })
        } else {
            return callback(Resp.error({msg:'Invalid Parameter', resp:error}))
        }
    }
}

module.exports = UserInit