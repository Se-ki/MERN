const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const authorSchema = new Schema({
    fullname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    refreshToken: String,
}, { timestamps: true })

const Author = mongoose.model('author', authorSchema)

module.exports = Author