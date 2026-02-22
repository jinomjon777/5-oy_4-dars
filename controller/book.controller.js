const BookSchema = require("../schema/book.schema")
const Book = require("../schema/book.schema")

const getAllBook = async (req,res)=>{
try{
  const book=await BookSchema.find()

  res.status(200).json(book)
}catch(error){
  return res.status(500).json({
    message: error.message
  })
}
}

const getOneBook = async (req,res)=>{
try{
  const {id}=req.params

  foundedBook=await BookSchema.findById(id)

  if(!foundedBook){
    return res.status(404).json({
      message: "Book not found"
    })
  }

  res.status(200).json(foundedBook)
}catch(error){
  return res.status(500).json({
    message: error.message
  }) 
}
}

const addBook = async (req,res)=>{
try{
 const {title, peges, publishedYear, publishedHome, description, genre, imageURL}=req.body

 await BookSchema.create({title, peges, publishedYear, publishedHome, description, genre, imageURL})

 res.status(201).json({
  message: "Added Book"
 }) 
}catch(error){
  return res.status(500).json({
    message: error.message
  })
}
}

const updateBook = async (req,res)=>{
try{
  const {title, peges, publishedYear, publishedHome, description, genre, imageURL}=req.body
  const {id}=req.params

  foundedBook=await BookSchema.findById(id)

  if(!foundedBook){
    return res.status(404).json({
      message: "Book nor found"
    })
  }

  await BookSchema.findByIdAndUpdate(id, {title, peges, publishedYear, publishedHome, description, genre, imageURL})

  res.status(200).json({
    message: "Updated Book"
  })
}catch(error){
  return res.status(500).json({
    message: error.message
  })
}
}

const deleteBook = async (req,res)=>{
try{
  const {id}=req.params

  foundedBook=await BookSchema.findById(id)

  if(!foundedBook){
    return res.status(404).json({
      message: "Book nor found"
    })
  }

  await BookSchema.findByIdAndDelete(id)

  res.status(200).json({
    message: "Deleted Book"
  })
}catch(error){
  return res.status(500).json({
    message: error.message
  })
}
}


module.exports={
  getAllBook,
  getOneBook,
  addBook,
  updateBook,
  deleteBook
}
 
