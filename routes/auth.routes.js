const {Router}=require("express")
const { Verify, Register, Login, Logout } = require("../controller/auth.controller")
const authorization = require("../middleware/authorization")
const refresh_token = require("../middleware/refresh_token")



const authRouter=Router()

authRouter.post("/register",Register)
authRouter.post("/verify",Verify)
authRouter.post("/login",Login)
authRouter.get("/logout",authorization,Logout)
authRouter.get("/refresh", refresh_token)

module.exports= authRouter
