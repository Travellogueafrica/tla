const express = require('express')
const router = express.Router()
const config = require('./../config/app.json')

const api = config.base

// Main Page Routes
router.use('/', require('./app'))

//Admin Page Route
router.use('/admin', require('./admin'))

router.use('/auth', require('./auth'))

//API Routes
router.use(api+'/user', require('./user'))
router.use(api+'/category', require('./category'))
router.use(api+'/destination', require('./destination'))
router.use(api+'/content', require('./content'))

module.exports = router