const mongoose = require('mongoose')

const Activity = new mongoose.Schema({
    title: {type: String, required: true},
    activity_img: {type: String, required: true},
    date: {type:String, required: true},
    content: {type: String, required: true}

})

module.exports = mongoose.model('Activity', Activity)