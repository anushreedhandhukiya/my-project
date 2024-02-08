const {Router} = require("express")
const { cartpage, mycart, filltercategory, pricefilter, myproduct, addproduct, addmycart, mycartdata, cartdata, createproduct, updatedata, deletedata, payment, allproduct, singleproduct } = require("../controllers/cart.controllers")
const { isAdmin, verifyToken } = require("../middleware/auth")

const cartRoute = Router()

cartRoute.get("/",cartpage)
cartRoute.get("/create",cartdata)
cartRoute.post("/create",createproduct)

cartRoute.get("/product",isAdmin,myproduct)
cartRoute.post("/product",isAdmin,addproduct)

cartRoute.get("/mycart",mycart)
cartRoute.post("/mycart",verifyToken,addmycart)

cartRoute.get("/filter",filltercategory)
cartRoute.get("/sort",pricefilter)
cartRoute.get("/allproduct",allproduct)

cartRoute.get("/cartdata",verifyToken,mycartdata)
cartRoute.patch("/update/:id",verifyToken,updatedata)
cartRoute.delete("/delete/:id",deletedata)
cartRoute.post("/payment",payment)

cartRoute.get("/singleproduct/:id",verifyToken,singleproduct)

module.exports=cartRoute
