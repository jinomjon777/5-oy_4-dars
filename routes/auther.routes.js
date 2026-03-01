const {Router}=require("express")
const { getAllAuthor, getOneAuthor, addAuthor, updateAuthor, deleteAuthor, search } = require("../controller/author.controller")
const authorValidatorMiddleware = require("../middleware/author.validator.middleware")
const authorization = require("../middleware/authorization")

const autherRouter=Router()

autherRouter.get("/get_all_authors",getAllAuthor)
autherRouter.get("/get_one_author/:id",getOneAuthor)
autherRouter.post("/add_author",authorValidatorMiddleware, authorization, addAuthor)
autherRouter.get("/search",search)
autherRouter.put("/update_author/:id", authorization, updateAuthor)
autherRouter.delete("/delete_author/:id", authorization, deleteAuthor)

module.exports= autherRouter
