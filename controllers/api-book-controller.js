const Book = require("../models/book")

const handleError = (res, err) => {
    res.status(500).send(err)
}

const getBooks = (req, res) => {
    Book
        .find()
        .sort()
        .then((books) => res.status(200).json(books))
        .catch((err) => handleError(res, err))
}

const getBook = (req, res) => {
    Book
    .findById(req.params.id)
    .then((book) => res.status(200).json(book))
    .catch((err) => handleError(res, err))
}

const addBook = (req, res) => {
    const {title, author, description} = req.body
    const book = new Book({title, author, description})

    book
        .save()
        .then((book) => res.status(200).json(book))
        .catch((err) => handleError(res, err))
}

const deleteBook = (req, res) => {
    Book
    .findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json(req.params.id))
    .catch((err) => handleError(res, err))
}

const editBook = (req, res) => {
    const id = req.params.id
    const {title, author, description} = req.body

    Book
        .findByIdAndUpdate(id, {title, author, description})
        .then((book) => res.status(200).json(book))
        .catch((err) => handleError(res, err))
}

module.exports = {
    getBooks,
    getBook,
    addBook,
    deleteBook,
    editBook
}