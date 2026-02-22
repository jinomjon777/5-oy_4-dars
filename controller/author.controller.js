const AuthorSchema = require("../schema/author.schema")
const Author = require("../schema/author.schema")

const getAllAuthor = async (req,res)=>{
try{
  const auther=await AuthorSchema.find()

  res.status(200).json(auther)
}catch(error){
  return res.status(500).json({
    message: error.message
  })
}
}

const getOneAuthor = async (req,res)=>{
try{
  const {id}=req.params

  foundedAuthor=await AuthorSchema.findById(id)

  if(!foundedAuthor){
    return res.status(404).json({
      message: "Author not found"
    })
  }

  res.status(200).json(foundedAuthor)
}catch(error){
  return res.status(500).json({
    message: error.message
  }) 
}
}

const addAuthor = async (req,res)=>{
try{
 const {fullName, birthDate, deathDate, bio, work, period, imageURL}=req.body

 await AuthorSchema.create({fullName, birthDate, deathDate, bio, work, period, imageURL})

 res.status(201).json({
  message: "Added author"
 })
}catch(error){
  return res.status(500).json({
    message: error.message
  })
}
}

const updateAuthor = async (req,res)=>{
try{
  const {fullName, birthDate, deathDate, bio, work, period, imageURL}=req.body
  const {id}=req.params

  foundedAuthor=await AuthorSchema.findById(id)

  if(!foundedAuthor){
    return res.status(404).json({
      message: "Author not found"
    })
  }

  await AuthorSchema.findByIdAndUpdate(id, {fullName, birthDate, deathDate, bio, work, period, imageURL})

  res.status(200).json({
    message: "Updated author"
  })
}catch(error){
  return res.status(500).json({
    message: error.message
  })
}
}

const deleteAuthor = async (req,res)=>{
try{
  const {id}=req.params

  foundedAuthor=await AuthorSchema.findById(id)

  if(!foundedAuthor){
    return res.status(404).json({
      message: "Author not found"
    })
  }

  await AuthorSchema.findByIdAndDelete(id)

  res.status(200).json({
    message: "Deleted author"
  })
}catch(error){
  return res.status(500).json({
    message: error.message
  })
}
}


module.exports={
  getAllAuthor,
  getOneAuthor,
  addAuthor,
  updateAuthor,
  deleteAuthor
}
 
