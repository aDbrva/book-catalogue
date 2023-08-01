const express = require("express")
const path = require("path")

const app = express()

app.set("view engine", "ejs")

const PORT = 3000

const createPath = (page) => path.resolve(__dirname, 'views', `${page}.ejs`)

app.use(express.static('css'))


app.get("/", (req, res) => {
    // console.log(createPath('index'))
    res.render(createPath('index'))
})

app.get("/add-book", (req, res) => {
    res.render(createPath('add-book'))
})

app.get("/books", (req, res) => {
    const books = [
        {"title": "Назва книги", "author": "Автор книги", "description": "Опис книги", "time": "00:00:00"},
        {"title": "Назва книги", "author": "Автор книги", "description": "Опис книги", "time": "00:00:00"},
    ]
    
    res.render(createPath('books'), {books})
})

app.get("/book/:id", (req, res) => {
    res.render(createPath('book'))
})

app.use((req, res) => {
    res.status(404)
        .render(createPath('error'))
})

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`)
})