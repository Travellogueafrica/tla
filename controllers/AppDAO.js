const content = require('./../model/ContentModel')

const AppInit = {

    index: async (req, res) => {
        try {
            const featured = await content.find({status: 1, featured:1}).sort({_id:-1}).limit(7)
            const slideItems = featured.slice(0, 3)
            const main_one = featured.slice(3,5)
            const main_two = featured.slice(5,7)
            const tourism = await content.find({'category.slug':'tourism', status:1}).sort({date_added:-1}).limit(5)
            res.render('main/landing',{title:'Travellogue Africa | Home Page', slideItems, main_one, main_two, tourism})
        } catch (err) {
            // render error page
        }
        
    },

    category: (req, res) => {
        res.render('main/category', {title:'Travellogue Africa | Category Page'})
    },

    destination: (req, res) => {
        res.render('main/destination')
    },

    content: (req, res) => {
        res.render('main/content')
    },

    author_post: (req, res) => {
        res.render('main/author')
    }
}

module.exports = AppInit