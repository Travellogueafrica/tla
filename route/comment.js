const express = require('express')
const router = express.Router()
const commentDAO = require('./../controllers/CommentDAO')
const Util = require('./../libraries/Utility')

router.post('/add', (req, res) => {
    commentDAO._add_comment(Util.param_extract(req), (state) => {
        Util.resp(res).json(state)
    })
})

router.post('/moderate', (req, res) => {
    commentDAO._moderate_comment(Util.param_extract(req), (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/by-identity', (req, res) => {
    commentDAO.by_identity(req.query.identity, (state) => { 
        Util.resp(res).json(state)
    })
})

router.get('/delete', (req, res) => {
    commentDAO._delete(req.query.identity, (state) => {
        Util.resp(res).json(state)
    })
})

module.exports = router