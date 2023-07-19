const subscriberModel = require('./../model/SubscriberModel')
const Util = require('./../libraries/Utility')
const Resp = require('./Response')

const Utility = {
    _add_subscriber: (param, ip, callback) => {
        const error = []
        if (!param.email || param.email == '')error.push('Email is required')

        if (error.length === 0){
            subscriberModel.findOne({email:param.email}, (err, user) => {
                if (!user){
                    Util.geoInfo(ip, (info) => {
                        const data = {email:param.email, ip_address:info.ip_address, country:info.country, country_code:info.country_code,
                                      region:info.region, city:info.city, timezone:info.timezone?.name}
                        subscriberModel.create(data, (err, nuser) => {
                            if (nuser) {
                                return callback(Resp.success({msg:'Thanks for opting in.', resp:null}))
                            } else {
                                return callback(Resp.error({msg:'Sorry. We could not complete this process', resp:err}))
                            }
                        })
                    })
                } else 
                    return callback(Resp.error({msg:'Email already exists in our record.'}))
            })
        }

    }
}

module.exports =  Utility