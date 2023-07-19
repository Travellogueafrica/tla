const express = require('express')
const router = express.Router()
const IP = require('ip')
const Util = require('./../libraries/Utility')
const utilDAO = require('./../controllers/UtilityDAO')

router.post('/add-subscriber', (req, res) => {
    const ipAddress = IP.address() || req.header('x-forwarded-for') || req.socket.remoteAddress
    utilDAO._add_subscriber(Util.param_extract(req), ipAddress, (state) => {
        Util.resp(res).json(state)
    })
})

module.exports = router