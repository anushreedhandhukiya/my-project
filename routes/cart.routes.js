const {Router} = require("express")
const { cartpage, mycart, filltercategory, pricefilter, myproduct, addproduct, addmycart, mycartdata, cartdata, createproduct } = require("../controllers/cart.controllers")
const { isAdmin, verifyToken } = require("../middleware/auth")

const cartRoute = Router()

cartRoute.get("/",cartpage)
cartRoute.get("/create",cartdata)
cartRoute.post("/create",createproduct)
cartRoute.get("/mycart",verifyToken,mycart)
cartRoute.post("/mycart",verifyToken,addmycart)
cartRoute.get("/filter",filltercategory)
cartRoute.get("/sort",pricefilter)
cartRoute.get("/product",verifyToken,myproduct)
cartRoute.post("/product",verifyToken,addproduct)
cartRoute.get("/cartdata",verifyToken,mycartdata)

module.exports=cartRoute