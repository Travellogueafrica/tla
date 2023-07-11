const express = require('express')
const router = express.Router()
const adminDAO = require('./../controllers/AdminDAO')

// router.get('/', adminDAO.view_articles)
router.get('/articles', adminDAO.get_articles)
router.get('/submit-article', adminDAO.submit_article)
router.get('/edit-article/:slug', adminDAO.edit_article)
router.get('/categories', adminDAO.get_categories)
router.get('/destinations', adminDAO.get_destinations)
router.get('/users', adminDAO.get_users)

module.exports = router