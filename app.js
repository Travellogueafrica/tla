const path = require('path')
const express = require('express')
const serverless = require('serverless-http')
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts')
const clientFilesPath = path.join(__dirname, "/assets/")
const StaticFileHandler = require('serverless-aws-static-file-handler')
const fileHandler = new StaticFileHandler(clientFilesPath)
const {MongoDB} = require('./libraries/Connector')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(expressLayouts)
app.use(require('./route'))

app.set('layout', './main')
app.set('view engine', 'ejs')

const handler = serverless(app)

module.exports.handler = async (event, context) => {
  await MongoDB()
  return await handler(event, context)
}

module.exports.static = async (event, context) => {
  return await fileHandler.get(event, context)
}
