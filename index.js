const express = require("express");
const cookies = require("cookie-parser")
const connected = require("./config/db");
const userRouter = require("./routes/user.routes");
const cartRoute = require("./routes/cart.routes");

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookies())
app.use("/user", userRouter)
app.use("/cart",cartRoute)

app.set("view engine", "ejs")
app.set("/views", __dirname + "/views")
app.use(express.static(__dirname + "/public"))

app.use("/",(req,res)=>{
    res.render("index")
})

app.listen(8090, () => {
    console.log("listing port 8090");
    connected()
})