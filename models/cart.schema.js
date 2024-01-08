const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
})

const Cart = mongoose.model("cart",cartSchema)
module.exports = Cart