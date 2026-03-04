const {Router}=require("express")
const { getAllBook, getOneBook, addBook, updateBook, deleteBook, searchBook, uploadFile } = require("../controller/book.controller")
const bookValidatorMiddleware = require("../middleware/book.validator.middleware")
const authorization = require("../middleware/authorization")
const upload = require("../middleware/upload")
const stream = require("../controller/audio.controller")

const bookRouter=Router()

bookRouter.get("/get_all_books",getAllBook)
bookRouter.get("/get_one_book/:id",getOneBook)
bookRouter.post("/add_book",bookValidatorMiddleware,addBook)
bookRouter.get("/search_book",searchBook)
bookRouter.put("/update_book/:id",authorization,updateBook)
bookRouter.delete("/delete_book/:id",authorization,deleteBook)


bookRouter.post("/books/:bookId/audio",upload.single("audio"), uploadFile);
bookRouter.get("/books/:bookId/audio", stream);

module.exports= bookRouter  
