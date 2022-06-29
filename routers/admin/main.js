// ADMIN ROUTERS

const express = require('express')
const router = express.Router()
const Blog = require('../../models/Blog')
const Author = require('../../models/Author')
const Activity = require('../../models/Activity')
const Message = require('../../models/Message')
const Subscribe = require('../../models/Subscribe')
const path = require('path')

router.get('/', (req, res) => {
    res.render('admin/login', {layout: 'admin-login-header'})
})

router.get('/login', (req, res) => {
    if(req.session.userId){res.redirect('/admin/index')}res.redirect('/')
})

router.get('/subscribes', (req,res) => {
    res.render('admin/subscribes', {layout: 'main'})
})

router.post('/login', (req, res) => {

    // ADMIN LOGIN ISLEMI
    const {username, password} = req.body

    Author.findOne({username}, (error,authors) => {
        if(authors){
            if(authors.password == password){
                // admin session islemi
                req.session.userId = authors._id
                res.redirect('/admin/index')
            }else{
                res.redirect('/')
            }
        }else{
            res.redirect('/admin')
        }
    })
})

router.post('/post', (req, res) => {

    // BLOG EKLEME

    let blog_img = req.files.blog_img
    blog_img.mv(path.resolve(__dirname, '../../public/site/img/blog-images', blog_img.name))

    Blog.create({
        ...req.body,
        blog_img : `/site/img/blog-images/${blog_img.name}`
    }, )

    req.session.sessionFlash = {
        type: 'alert alert-success',
        message: `Yeni yazınız başarılı bir şekilde oluşturuldu!`
    }

    res.redirect('/admin/blogs')

})

router.get('/index', (req, res) => {
    if(req.session.userId){
        res.render('admin/index')
    }else{
        res.redirect('/admin')
    }
})

router.get('/add-member', (req,res) => {
    if(req.session.userId){
        res.render('admin/add-member')
    }else{
        res.redirect('/admin')
    }
})

router.post('/member-post', (req, res) => {

    // KULLANICI EKLEME
    let profile_img = req.files.profile_img
    profile_img.mv(path.resolve(__dirname, '../../public/site/img/blog-images', profile_img.name))

    Author.create({
        ...req.body,
        profile_img : `/site/img/blog-images/${profile_img.name}`
    })

    res.redirect('/admin/members')

})

router.get('/members', (req,res) => {

    if(req.session.userId){
        if(req.session.userId){
            Author.find({}).then(members => {
                res.render('admin/members', {members:members})
            })
        }else{
            res.redirect('/admin')
        }
    }else{
        res.redirect('/admin')
    }

})

router.get('/add-blog', (req,res) => {
    if(req.session.userId){
        Author.find({}).then(authors => {
            res.render('admin/add-blog', {authors:authors})
        })
    }else{
        res.redirect('/admin')
    }
})

router.get('/blogs', (req,res) => {

    if(req.session.userId){
        // BLOGLARI LISTELEME
        Blog.find({}).then(blogs => {
            res.render('admin/blogs', {blogs:blogs})
        })
    }else{
        res.redirect('/admin')
    }

})

router.get('/blogs/:id', (req, res) => {
    if(req.session.userId){
        Blog.findById(req.params.id).then(blog => {
            res.render('admin/detay', {blog:blog})
        })
    }else{
        res.redirect('/admin')
    }
})

router.get('/add-activity', (req,res) => {

    if(req.session.userId){
        res.render('admin/add-activity')
    }else{
        res.redirect('/admin')
    }
})

router.post('/activity-post', (req, res) => {
    // ETKINLIK EKLEME

    let activity_img = req.files.activity_img
    activity_img.mv(path.resolve(__dirname, '../../public/site/img/blog-images', activity_img.name))

    Activity.create({
        ...req.body,
        activity_img : `/site/img/blog-images/${activity_img.name}`
    })

    res.redirect('/admin/activities')
})

router.get('/activities', (req,res) => {
    if(req.session.userId){
        // ETKINLIKLERI LISTELE
        Activity.find({}).then(activities => {
            res.render('admin/activities', {activities:activities})
        })
    }else{
        res.redirect('/admin')
    }
})

router.get('/messages', (req,res) => {

    if(req.session.userId){
        // MESAJLARI LISTELE
        Message.find({}).then(messages => {
            res.render('admin/messages', {messages:messages})
        })
    }else{
        res.redirect('/admin')
    }

})

// admin logout
router.get('/logout', (req, res) => {
    // destroy session
    req.session.destroy(()=>{
        res.redirect('/admin')
    })
})

router.get('*', (req, res) => {
    if(req.session.userId){
        res.redirect('/admin/index')
    }else{
        res.redirect('/admin')
    }
})

router.get('/detay/:id', (req, res) => {
    if(req.session.userId){
        Blog.findById(req.params.id).then(blog => {
            res.render('admin/detay', {blog:blog})
        })
    }else{
        res.redirect('/admin')
    }
})

// blog delete
router.delete('/delete-blog/:id', (req, res) => {
    if(req.session.userId){
       Blog.remove({_id: req.params.id}).then(()=>{
            res.redirect('/admin/blogs')
        }) 
    }else{
        res.redirect('/admin')
    }
})

// member (author) delete
router.delete('/delete-member/:id', (req,res) => {
    Author.remove({_id: req.params.id}).then(()=>{
        res.redirect('/admin/members')
    })
})

// activities delete
router.delete('/delete-activity/:id', (req,res) => {
    if(req.session.userId){
        Activity.remove({_id: req.params.id}).then(() => {
            res.redirect('/admin/activities')
        })
    }else{
        res.redirect('/admin')
    }
})

// subscribes list
router.get('/subscribes', (req,res) => {

    if(req.session.userId){
        // ABONE OLAN KULLANICILARI LISTELEME
        Subscribe.find({}).sort({ $natural : -1 }).then(subscribes => {
            res.render('admin/subscribes', {subscribes:subscribes})
        })
    }else{
        res.redirect('/admin')
    }

})

module.exports = router
