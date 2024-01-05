const {Router} = require("express")
const {signup, signupage, login, loginpage, logout} = require("../controllers/user.controller")

const userRouter = Router()

userRouter.post("/signup",signup)
userRouter.get("/signup",signupage)
userRouter.post("/login",login)
userRouter.get("/login",loginpage)
userRouter.get("/logout",logout)

module.exports=userRouter