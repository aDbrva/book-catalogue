const express = require("express")
const path = require("path")

const app = express()

const PORT = 3000

const createPath = (page) => path.resolve(__dirname, 'views', `${page}.html`)

app.get("/", (req, res) => {
    // console.log(createPath('index'))
    res.sendFile(createPath('index'))
})

app.get("/add-book", (req, res) => {
    res.sendFile(createPath('add-book'))
})

app.use((req, res) => {
    res.status(404)
        .sendFile(createPath('error'))
})

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`)
})