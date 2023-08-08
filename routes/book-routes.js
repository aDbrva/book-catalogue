const express = require("express")
const router = express.Router()

const {
    getBooks,
    getBook,
    getAddBook,
    addBook,
    deleteBook,
    getEditBook,
    editBook
} = require("../controllers/book-controller")


router.get("/books", getBooks)
router.get("/book/:id", getBook)
router.get("/add-book", getAddBook)
router.post("/add-book", addBook)
router.delete("/book/:id", deleteBook)
router.get("/edit-book/:id", getEditBook)
router.put("/edit-book/:id", editBook)


module.exports = router