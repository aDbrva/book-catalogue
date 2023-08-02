const mongoose = require('mongoose')
const Schema = mongoose.Schema

const newBook = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

const Book = mongoose.model('Book', newBook)

module.exports = Book