const express = require('express')
const router = express.Router()
const Message = require('../models/Message')
const Blog = require('../models/Blog')
const Activity = require('../models/Activity')
const Subscribe = require('../models/Subscribe')

// main router
router.get('/', (req, res) => {
    Blog.find({}).limit(3).sort({$natural: -1}).then(blogs => {
        res.render('site/home', {layout: 'site-main', blogs:blogs})
    })
})

router.get('/about', (req, res) => {
    res.render('site/about', {layout: 'site-main'})
})

router.get('/activity', (req, res) => {
    Activity.find({}).limit(3).sort({$natural: -1}).then(activities => {
        res.render('site/activity', {layout: 'site-main', activities:activities})
    })
})

router.get('/contact', (req, res) => {
    res.render('site/contact', {layout: 'site-main'})
})

router.get('/yazi', (req, res) => {
    res.render('site/yazi', {layout: 'site-main'})
})


router.post('/contact', (req, res) => {
    // MESAJ KAYIT
    Message.create({
        ...req.body
    })

    req.session.sessionFlash = {
        typeSuccess: 'alert alert-success',
        messageSuccess: 'Mesajınız ilgili arkadaşlarımıza ulaştı, en yakın zamanda dönüş yapacağız :)',
        typeDanger: 'alert alert-danger',
        messageDanger: 'Galiba bir sorun oldu, lütfen kontrol edip tekrar dener misiniz?'
    }

    res.redirect('/contact')
})

router.post('/subscribe', (req,res) => {
    Subscribe.create({
        ...req.body
    })

    res.redirect('/')
})


module.exports = router