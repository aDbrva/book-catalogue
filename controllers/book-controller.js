const Book = require("../models/book")
const createPath = require("../helpers/create-path")

const handleError = (res, err) => {
    console.log(err)
    res.render(createPath('error'), {title: "Помилка"})
}

const getBooks = (req, res) => {
    const title = "Каталог"
    Book
        .find()
        .sort()
        .then((books) => res.render(createPath('books'), {books, title}))
        .catch((err) => handleError(res, err))
}

const getBook = (req, res) => {
    Book
    .findById(req.params.id)
    .then((book) => {
        res.render(createPath('book'), {book})
    })
    .catch((err) => handleError(res, err))
}

const getAddBook = (req, res) => {
    const title = "Додати книгу"
    res.render(createPath('add-book'), {title})
}

const addBook = (req, res) => {
    const {title, author, description} = req.body
    const book = new Book({title, author, description})

    book
        .save()
        .then(() => res.redirect("/books"))
        .catch((err) => handleError(res, err))
}

const deleteBook = (req, res) => {
    Book
    .findByIdAndDelete(req.params.id)
    .then(() => res.sendStatus(200))
    .catch((err) => handleError(res, err))
}

const getEditBook = (req, res) => {
    const title = "Редагувати книгу"
    Book
        .findById(req.params.id)
        .then((book) => {
            res.render(createPath('edit-book'), {book, title})
        })
        .catch((err) => handleError(res, err))
}

const editBook = (req, res) => {
    const id = req.params.id
    const {title, author, description} = req.body

    Book
        .findByIdAndUpdate(id, {title, author, description})
        .then(() => res.sendStatus(200))
        .catch((err) => handleError(res, err))
}

module.exports = {
    getBooks,
    getBook,
    getAddBook,
    addBook,
    deleteBook,
    getEditBook,
    editBook
}