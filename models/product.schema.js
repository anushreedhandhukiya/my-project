const mongoose = require("mongoose")

const  productSchema = new mongoose.Schema({
    img : String,
    title : String,
    price : Number,
    category : String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" }
})

const product = mongoose.model("Product",productSchema)
module.exports=product