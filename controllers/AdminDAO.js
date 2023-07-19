const category = require('./../model/CategoryModel')
const tag = require('./../model/TagModel')
const user = require('./../model/UserModel')
const destination = require('./../model/DestinationModel')
const content = require('./../model/ContentModel')

const AdminInit = {

    get_articles: (req, res) => {
        const limit = 10
        let page = req.params.page || 1
        const formatDate = (date) => {
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const day = date.getDate()
            const monthIndex = date.getMonth()
            const year = date.getFullYear()
            return `${day} ${months[monthIndex]}, ${year}`
        }
        content.find({}).sort({_id:-1})
        .skip((limit * page) - limit)
        .limit(limit)
        .exec((err, articles) => {
            if (err)
                res.render('admin/error', {title:'Travellogue | Admin - Error Encountered'})
            content.count({}).exec((err, count) => {
                res.render('admin/articles', {title:'Travellogue | Admin - All Articles', articles, formatDate, current:page, pages: Math.ceil(count / limit)})
            })
        })
    },

    submit_article: async (req, res) => {
        try {
            const categories = await category.find({})
            const authors = await user.find({role: 'editor'})
            const destinations = await destination.find({})
            const tags = await tag.find({})
            res.render('admin/add-article', {title:'Travellogue | Admin - Add Article', edit:false, categories, authors, destinations, tags})
        } catch(err){
            res.render('admin/error', {title:'Travellogue | Admin - Error Encountered'})
        }
    },

    edit_article: async (req, res) => {
        try {
            const slug = req.params.slug
            const article = await content.findOne({slug:slug})
            const authors = await user.find({role: 'editor'})
            const categories = await category.find({})
            const destinations = await destination.find({})
            const tags = await tag.find({})
            res.render('admin/add-article', {title:'Travellogue | Admin - Edit Article', edit:true, article, categories, authors, destinations, tags})
        } catch(err) {
            res.render('admin/error', {title:'Travellogue | Admin - Error Encountered'})
        }
    }, 

    get_categories: async (req, res) => {
        try {
            const limit = 5
            let page = req.params.page || 1
            const categories = await category.find({}).sort({_id:-1}).skip((limit * page) - limit).limit(limit)
            const catCount = await category.count({})
            const tags = await tag.find({}).sort({_id:-1}).skip((limit * page) - limit).limit(limit)
            const tagCount = await tag.count({})
            const parents = await category.find({parent:null})
            res.render('admin/categories', {title:'Travellogue | Admin - Categories', categories, parents, tags})
        } catch(err){
            res.render('admin/error', {title:'Travellogue | Admin - Error Encountered'})
        }
    },

    get_destinations: (req, res) => {
        const limit = 5
        let page = req.params.page || 1
        destination.find({}).sort({_id:-1})
        .skip((limit * page) - limit)
        .limit(limit)
        .exec((err, destinations) => {
            if (err)
                res.render('admin/error', {title:'Travellogue | Admin - Error Encountered'})
            destination.count({}).exec((err, count) => {
                res.render('admin/destinations', {title:'Travellogue | Admin - Destinations', destinations, current:page, pages: Math.ceil(count / limit)})
            })
        })
    },

    get_users: (req, res) => {
        const limit = 5
        let page = req.params.page || 1
        user.find({}).sort({_id:-1})
        .skip((limit * page) - limit)
        .limit(limit)
        .exec((err, users) => {
            if (err)
                res.render('admin/error', {title:'Travellogue | Admin - Error Encountered'})
            user.count({}).exec((err, count) => {
                res.render('admin/users', {title:'Travellogue | Admin - All Users', users, current:page, pages: Math.ceil(count / limit)})
            })
        })
    }
}

module.exports = AdminInit