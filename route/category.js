const express = require('express')
const router = express.Router()
const Util = require('./../libraries/Utility')
const categoryDAO = require('./../controllers/CategoryDAO')

router.post('/create', (req, res) => {
    categoryDAO._create(Util.param_extract(req), (state) => {
        Util.resp(res).json(state)
    })
})

router.post('/modify', (req, res) => {
    categoryDAO._update(Util.param_extract(req), (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/by-identity', (req, res) => {
    categoryDAO.by_identity(req.query.identity, (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/delete', (req, res) => {
    categoryDAO._delete(req.query.identity, (state) => {
        Util.resp(res).json(state)
    })
})

router.post('/tag/create', (req, res) => {
    categoryDAO._tag_create(Util.param_extract(req), (state) => {
        Util.resp(res).json(state)
    })
})

router.post('/tag/modify', (req, res) => {
    categoryDAO.tag_update(Util.param_extract(req), (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/tag/by-identity', (req, res) => {
    categoryDAO.tag_by_identity(req.query.identity, (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/tag/delete', (req, res) => {
    categoryDAO.tag_delete(req.query.identity, (state) => {
        Util.resp(res).json(state)
    })
})

module.exports = router
