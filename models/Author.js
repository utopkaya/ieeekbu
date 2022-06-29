const mongoose = require('mongoose')

// 9

const Author = new mongoose.Schema({
    username : {type: String, required: true},
    password : {type: String, required: true},
    name : {type: String, required: true},
    mail : {type: String, required: true},
    profile_img : {type: String, required: true},
    branch : {type: String, required: true},
    facebook_link : {type: String},
    twitter_link : {type: String},
    instagram_link : {type: String},
    linkedin_link : {type: String},
    content : {type: String, required: true}
})

module.exports = mongoose.model('Author', Author)