const express = require("express")
const mongoose = require("mongoose")
const bookRoutes = require("./routes/book-routes")
const createPath = require("./helpers/create-path")

const app = express()

app.set("view engine", "ejs")

const PORT = 3000
const db = 'mongodb+srv://aDbrv:220700july22@cluster0.jswevtt.mongodb.net/book-catalogue?retryWrites=true&w=majority'

mongoose
    .connect(db)
    .then((res) => console.log('Connected to DB'))
    .catch((err) => console.log(err))

app.use(express.static('css'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())


app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`)
})


app.get("/", (req, res) => {
    const title = "Головна"
    res.render(createPath('index'), {title})
})

app.use(bookRoutes)

app.use((req, res) => {
    const title = "Помилка"
    res.status(404)
        .render(createPath('error'), {title})
})