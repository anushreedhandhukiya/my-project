const {Router} = require("express")
const {signup, signupage, login, loginpage, logout, reset, otpform, otpverify, resetEmail, forgot} = require("../controllers/user.controller")

const userRouter = Router()

userRouter.post("/signup",signup)
userRouter.get("/signup",signupage)
userRouter.post("/login",login)
userRouter.get("/login",loginpage)
userRouter.get("/logout",logout)
userRouter.post("/reset",reset)
userRouter.post("/reset/otp",otpverify)
userRouter.get("/reset/:otp",otpform)
userRouter.post("/email",resetEmail)
userRouter.get("/resetpassword",forgot)

module.exports=userRouter