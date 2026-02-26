const CustomErrorhandler = require("../error/custom-error.handler")
const bcrypt=require("bcryptjs")
const sendMessage = require("../utils/sint.email")
const AuthSchema = require("../schema/auth.schema")
const { accses_token } = require("../utils/jwt")

const Register = async (req,res, next)=>{
  try{
    const {username,email,password} = req.body

    const foundedUser = await AuthSchema.findOne({email})

    if(foundedUser){
      throw CustomErrorhandler.BadRequest("User already exsist")
    }

    const hashPassword = await bcrypt.hash(password, 12)

    const code = String(Math.floor(100000 + Math.random()*900000))

    await sendMessage(code,email)

    await AuthSchema.create({
      username,
      email,
      password: hashPassword,
      otp: code,
      otpTime: new Date(Date.now() + 120000)
    })

    res.status(200).json({message: "Registered"})
  }catch(error){
    next(error)
  }
}


const Verify = async (req,res, next)=>{
  try{
    const {email,code} = req.body

    const foundedUser = await AuthSchema.findOne({email})

    if(!foundedUser){
      throw CustomErrorhandler.BadRequest("User not found")
    }

    if(!foundedUser.otp){
      throw CustomErrorhandler.UnAuthorized("Otp not found")
    }

    if(foundedUser.otpTime < Date.now()){
      throw CustomErrorhandler.UnAuthorized("Otp exspired")
    }

    if(foundedUser.otp !== String(code)){
      throw CustomErrorhandler.UnAuthorized("Wrong otp")
    }

    await AuthSchema.findByIdAndUpdate(foundedUser._id,{otp: "", otpTime: 0})

    const token = accses_token({id: foundedUser._id, role: foundedUser.role, email: foundedUser.email})
    res.cookie("accses_token",token,{maxAge: 1000*60*15,httpOnly: true})

    res.status(200).json({message: "Succses"})
  }catch(error){
    next(error)
  }
}


module.exports = {
  Register,
  Verify
}