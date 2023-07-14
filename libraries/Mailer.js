const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const nodemailer = require('nodemailer')
const mailgun = require('nodemailer-mailgun-transport')
const dotenv = require('dotenv').config()

exports.sendMail = (params, callback) => {
    console.log(params)
    const template = fs.readFileSync(path.join(__dirname, '../views/email/'+params.template+'.ejs'), "utf8")
    const mgAuth = {
        auth: {
            api_key: process.env.MAILGUN_KEY,
            domain: process.env.MAILGUN_DOMAIN
        }
    }
    const smtp = nodemailer.createTransport(mailgun(mgAuth))
    const compiled = ejs.compile(template)
    const mailOption = {
        from: params.sender,
        to: params.recipient,
        subject: params.subject,
        html:compiled(params.msg)
    }
    smtp.sendMail(mailOption, (err, msg) => {
        if (err) 
            callback({error:true, msg:err})
        else
            callback({error:false, msg})
    })
}