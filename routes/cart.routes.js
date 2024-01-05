const {Router} = require("express")
const { cartpage, createproduct, cartdata, contact, mycart, filltercategory, cartdetails, pricefilter, myproduct } = require("../controllers/cart.controllers")

const cartRoute = Router()

cartRoute.get("/",cartpage)
cartRoute.get("/create",cartdata)
cartRoute.post("/create",createproduct)
cartRoute.get("/contact",contact)
cartRoute.get("/mycart",mycart)
cartRoute.get("/filter",filltercategory)
cartRoute.get("/sort",pricefilter)
cartRoute.get("/cartdetails",cartdetails)
cartRoute.get("/product",myproduct)

module.exports=cartRoute