const express = require('express')
const router = express.Router()
const Author = require('../models/Author')

router.get('/', (req, res) => {
    Author.find({}).sort({$natural: -1}).then(teams => {
        res.render('site/team', {layout: 'site-main', teams:teams})
    })
})

router.get('/detay/:id', (req, res) => {
    Author.findById(req.params.id).then(team => {
        res.render('site/detay', {team:team, layout: 'site-main'})
    })
})

module.exports = router