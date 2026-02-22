const {Router}=require("express")
const { getAllAuthor, getOneAuthor, addAuthor, updateAuthor, deleteAuthor } = require("../controller/author.controller")

const autherRouter=Router()

autherRouter.get("/get_all_authors",getAllAuthor)
autherRouter.get("/get_one_author/:id",getOneAuthor)
autherRouter.post("/add_author",addAuthor)
autherRouter.put("/update_author/:id",updateAuthor)
autherRouter.delete("/delete_author/:id",deleteAuthor)

module.exports= autherRouter
