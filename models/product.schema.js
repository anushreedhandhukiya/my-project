const mongoose = require("mongoose")

const  productSchema = new mongoose.Schema({
    img : String,
    title : String,
    price : Number,
    category : String
})

const product = mongoose.model("product",productSchema)
module.exports=product