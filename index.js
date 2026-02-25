console.log("RESTART", new Date().toISOString())
const express=require("express")
const cors=require("cors")
const connectDB = require("./config/db.config")
const autherRouter = require("./routes/auther.routes")
const bookRouter = require("./routes/book.routes")
const errorMiddleware = require("./middleware/error.middleware")
require("dotenv").config()

PORT=process.env.PORT || 3000
const app=express()

connectDB()
app.use(express.json())
app.use(cors())
app.use(autherRouter)
app.use(bookRouter)


app.use(errorMiddleware)


app.listen(PORT, ()=>{ 
  console.log("Server is runing at: "+PORT);          
})   