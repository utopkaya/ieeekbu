const mongoose = require('mongoose')

const Subscribe = new mongoose.Schema({
    mail : {type: String, required: true},
    date : {type: Date, default: Date.now}
})

module.exports = mongoose.model('Subscribe', Subscribe)