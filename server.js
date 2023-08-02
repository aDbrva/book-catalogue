const express = require("express")
const path = require("path")

const app = express()

app.set("view engine", "ejs")

const PORT = 3000

const createPath = (page) => path.resolve(__dirname, 'views', `${page}.ejs`)

app.use(express.static('css'))


app.get("/", (req, res) => {
    const title = "Головна"
    // console.log(createPath('index'))
    res.render(createPath('index'), {title})
})

app.get("/add-book", (req, res) => {
    const title = "Додати книгу"
    res.render(createPath('add-book'), {title})
})

app.get("/books", (req, res) => {
    const title = "Каталог"
    const books = [
        {"title": "Назва книги", "author": "Автор книги", "description": "Опис книги", "time": "00:00:00"},
        {"title": "Назва книги", "author": "Автор книги", "description": "Опис книги", "time": "00:00:00"},
    ]
    
    res.render(createPath('books'), {books, title})
})

app.get("/book/:id", (req, res) => {
    const title = "Книга"
    res.render(createPath('book'), {title})
})

app.use((req, res) => {
    const title = "Помилка"
    res.status(404)
        .render(createPath('error'), {title})
})

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`)
})