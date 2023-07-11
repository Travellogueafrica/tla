const express = require('express')
const router = express.Router()
const Util = require('./../libraries/Utility')
const destDAO = require('./../controllers/DestDAO')

router.post('/create', (req, res) => {
    destDAO._create(Util.param_extract(req), (state) => {
        Util.resp(res).json(state)
    })
})

router.post('/modify', (req, res) => {
    destDAO._update(Util.param_extract(req), (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/by-identity', (req, res) => {
    destDAO.by_identity(req.query.identity, (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/delete', (req, res) => {
    destDAO._delete(req.query.identity, (state) => {
        Util.resp(res).json(state)
    })
})

module.exports = router