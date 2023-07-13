const express = require('express')
const router = express.Router()
const authDAO = require('./../controllers/AuthDAO')

router.get('/sign-in', authDAO.user_signin)
router.get('/set-password', authDAO.activate_user)

module.exports = router