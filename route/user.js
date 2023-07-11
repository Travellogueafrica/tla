const express = require('express')
const router = express.Router()
const Util = require('./../libraries/Utility')
const userDAO = require('./../controllers/UserDAO')

router.post('/create', (req, res) => {
    userDAO._create(Util.param_extract(req), (state) => {
        Util.resp(res).json(state)
    })
})

router.post('/modify', (req, res) => {
    userDAO._update(Util.param_extract(req), (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/by-identity', (req, res) => {
    userDAO.by_identity(req.query.identity, (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/delete', (req, res) => {
    userDAO._delete(req.query.identity, (state) => {
        Util.resp(res).json(state)
    })
})

module.exports = router