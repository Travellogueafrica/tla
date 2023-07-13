const express = require('express')
const router = express.Router()
const adminDAO = require('./../controllers/AdminDAO')
const {AuthChecker} = require('./../middleware/authware')

// router.get('/', adminDAO.view_articles)
router.get('/articles', AuthChecker, adminDAO.get_articles)
router.get('/submit-article', AuthChecker, adminDAO.submit_article)
router.get('/edit-article/:slug', AuthChecker, adminDAO.edit_article)
router.get('/categories', AuthChecker, adminDAO.get_categories)
router.get('/destinations', AuthChecker, adminDAO.get_destinations)
router.get('/users', AuthChecker, adminDAO.get_users)

module.exports = router