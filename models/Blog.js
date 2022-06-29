const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Blog = new mongoose.Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    content: {type: String, required: true},
    blog_img: {type: String, required: true},
    source: {type: String, required: true},
    date: {type:Date, default: Date.now}
})

module.exports = mongoose.model('Blog', Blog)

