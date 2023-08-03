const express = require("express")
const path = require("path")
const methodOverride = require('method-override')
const mongoose = require("mongoose")
const Book = require("./models/book")

const app = express()

app.set("view engine", "ejs")

const PORT = 3000

const db = 'mongodb+srv://aDbrv:220700july22@cluster0.jswevtt.mongodb.net/book-catalogue?retryWrites=true&w=majority'

mongoose
    .connect(db)
    .then((res) => console.log('Connected to DB'))
    .catch((err) => console.log(err))

const createPath = (page) => path.resolve(__dirname, 'views', `${page}.ejs`)

app.use(express.static('css'))

app.use(express.urlencoded({extended: false}))

app.use(methodOverride('_method'))


app.get("/", (req, res) => {
    const title = "Головна"
    // console.log(createPath('index'))
    res.render(createPath('index'), {title})
})

app.get("/books", (req, res) => {
    const title = "Каталог"
    Book
        .find()
        .sort()
        .then((books) => res.render(createPath('books'), {books, title}))
        .catch((err) => {
            console.log(err)
            res.render(createPath('error'), {title: "Помилка"})
        })
})

app.get("/book/:id", (req, res) => {
    Book
        .findById(req.params.id)
        .then((book) => {
            // console.log(book)
            res.render(createPath('book'), {book})
        })
        .catch((err) => {
            console.log(err)
            res.render(createPath('error'), {title: "Помилка"})
        })
})

app.get("/add-book", (req, res) => {
    const title = "Додати книгу"
    res.render(createPath('add-book'), {title})
})

app.post("/add-book", (req, res) => {
    const {title, author, description} = req.body
    const book = new Book({title, author, description})

    book
        .save()
        .then(() => res.redirect("/books"))
        .catch((err) => {
            console.log(err)
            res.render(createPath('error'), {title: "Помилка"})
        })
})

app.delete("/book/:id", (req, res) => {
    Book
        .findByIdAndDelete(req.params.id)
        .then(() => res.sendStatus(200))
        .catch((err) => {
            console.log(err)
            res.render(createPath('error'), {title: "Помилка"})
        })
})

app.get("/edit-book/:id", (req, res) => {
    const title = "Редагувати книгу"
    Book
        .findById(req.params.id)
        .then((book) => {
            res.render(createPath('edit-book'), {book, title})
        })
        .catch((err) => {
            console.log(err)
            res.render(createPath('error'), {title: "Помилка"})
        })
})

app.put("/edit-book/:id", (req, res) => {
    const id = req.params.id
    const {title, author, description} = req.body

    Book
        .findByIdAndUpdate(id, {title, author, description})
        .then(() => res.redirect(`/book/${id}`))
        .catch((err) => {
            console.log(err)
            res.render(createPath('error'), {title: "Помилка"})
        })
})


app.use((req, res) => {
    const title = "Помилка"
    res.status(404)
        .render(createPath('error'), {title})
})

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`)
})