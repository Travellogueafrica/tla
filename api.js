const express = require('express')
const bodyParser = require('body-parser')
const serverless = require('serverless-http')
const expressLayouts = require('express-ejs-layouts')
const {MongoDB} = require('./libraries/Connector')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(expressLayouts)
app.use(require('./route'))

app.set('layout', './admin')
app.set('view engine', 'ejs')

const handler = serverless(app)

module.exports.handler = async (event, context) => { 
  await MongoDB()
  return await handler(event, context)  
}