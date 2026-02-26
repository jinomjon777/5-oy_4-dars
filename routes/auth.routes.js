const {Router}=require("express")
const {Register, Verify} = require("../controller/auth.controller")



const authrRouter=Router()

autherRouter.post("/register",Register)
autherRouter.post("/verify",Verify)

module.exports= authRouter
