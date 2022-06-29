const express = require('express')
const router = express.Router()
const Blog = require('../models/Blog')
const Author = require('../models/Author')

router.get('/', (req, res) => {
    Blog.find({}).sort({ $natural: -1 }).then(blogs => {
        res.render('site/blog', {layout: 'site-main', blogs:blogs})
    })
})

router.get('/detay',(req, res) => {
    res.render('site/yazi', {layout: 'site-main'})
})

router.get('/detay/:id', (req, res) => {
    Author.findById(req.params.id).then(author => {
        res.render('site/detay', {layout: 'site-main'},{author:author})
    })
})

router.get('/yazi/:id', (req, res) => {
    Blog.findById(req.params.id).then(blog => {
        // Blogu yazan yazar
        Author.find({}).then(author => {
            res.render('site/yazi', {blog:blog, layout: 'site-main', author:author})
        })
        
    })
})

module.exports = router
