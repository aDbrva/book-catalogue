const express = require("express")
const router = express.Router()

const {
    getBooks,
    getBook,
    addBook,
    deleteBook,
    editBook
} = require("../controllers/api-book-controller")


router.get("/api/books", getBooks)
router.get("/api/book/:id", getBook)
router.post("/api/add-book", addBook)
router.delete("/api/book/:id", deleteBook)
router.put("/api/edit-book/:id", editBook)


module.exports = router