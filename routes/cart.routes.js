const {Router} = require("express")
const { cartpage, createproduct, cartdata, mycart, filltercategory, pricefilter, myproduct, addproduct, addmycart, mycartdata } = require("../controllers/cart.controllers")
const { isAdmin } = require("../middleware/auth")

const cartRoute = Router()

cartRoute.get("/",cartpage)
cartRoute.get("/create",cartdata)
cartRoute.post("/create",createproduct)
cartRoute.get("/mycart",mycart)
cartRoute.post("/mycart",addmycart)
cartRoute.get("/filter",filltercategory)
cartRoute.get("/sort",pricefilter)
cartRoute.get("/product",myproduct)
cartRoute.post("/product",addproduct)
cartRoute.get("/cartdata",mycartdata)

module.exports=cartRoute