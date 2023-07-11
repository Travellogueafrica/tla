const express = require('express')
const router = express.Router()
const appDAO = require('./../controllers/AppDAO')

router.get('/', appDAO.index)
router.get('/category/:slug', appDAO.category)
router.get('/destination/:slug', appDAO.destination)
router.get('/content/:slug', appDAO.content)
router.get('/author/:slug', appDAO.author_post)

module.exports = router