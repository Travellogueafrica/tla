const express = require('express')
const router = express.Router()
const Util = require('./../libraries/Utility')
const contentDAO = require('./../controllers/ContentDAO')

router.post('/create', (req, res) => {
    contentDAO._create(Util.param_extract(req), (state) => {
        Util.resp(res).json(state)
    })
})

router.post('/modify', (req, res) => {
    contentDAO._update(Util.param_extract(req), (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/delete', (req, res) => {
    contentDAO._delete(req.query.identity, (state) => {
        Util.resp(res).json(state)
    })
})

module.exports = router