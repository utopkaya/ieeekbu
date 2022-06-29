const mongoose = require('mongoose')

const Message = new mongoose.Schema({
    name : {type: String, required: true},
    mail : {type: String, required: true},
    branch : {type: String, required: true},
    message : {type: String, required: true}
})

module.exports = mongoose.model('Message', Message)