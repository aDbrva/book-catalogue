const express = require("express")
const path = require("path")
const mongoose = require("mongoose")

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


app.get("/", (req, res) => {
    const title = "Головна"
    // console.log(createPath('index'))
    res.render(createPath('index'), {title})
})

app.get("/add-book", (req, res) => {
    const title = "Додати книгу"
    res.render(createPath('add-book'), {title})
})

app.post("/add-book", (req, res) => {
    const {title, author, description} = req.body
    const book = {
        id: new Date(),
        title,
        author,
        description,
        time: (new Date()).toLocaleDateString()
    }
    // console.log(book)
    res.render(createPath('book'), {title, book})
})

app.get("/books", (req, res) => {
    const title = "Каталог"
    const books = [
        {"id":"1", "title": "Назва книги", "author": "Автор книги", "description": "Опис книги", "time": "00:00:00"},
        {"id":"2", "title": "Назва книги", "author": "Автор книги", "description": "Опис книги", "time": "00:00:00"},
    ]
    
    res.render(createPath('books'), {books, title})
})

app.get("/book/:id", (req, res) => {
    const book = {
        "id":"1", 
        "title": "Назва книги", 
        "author": "Автор книги", 
        "description": "Опис книги", 
        "time": "00:00:00"
    }
    res.render(createPath('book'), {book})
})

app.use((req, res) => {
    const title = "Помилка"
    res.status(404)
        .render(createPath('error'), {title})
})

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`)
})