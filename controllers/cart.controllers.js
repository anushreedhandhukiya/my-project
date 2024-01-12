const Cart = require("../models/cart.schema")
const product = require("../models/product.schema")
const Razorpay = require("razorpay")
const { options } = require("../routes/cart.routes")


const cartpage = (req, res) => {
    res.render("cart")
}

const createproduct = async (req, res) => {
    try {
        let data = await product.find()
        res.send(data)
    }
    catch (error) {
        res.send({ msg: error })
    }
}

const cartdata = async (req, res) => {
    const { id } = req.params
    let data = await product.find(id)
    res.send(data)
}
const mycart = (req, res) => {
    res.render("mycart")
}

const filltercategory = async (req, res) => {
    const { category } = req.query
    try {
        let data = await product.find({ category })
        res.send(data)
    }
    catch (error) {
        res.send({ msg: error })
    }
}

const pricefilter = async (req, res) => {
    const { sort } = req.query
    if (sort == "lth") {
        const data = await product.find().sort({ price: 1 })
        res.send(data)
    }

    else if (sort == "htl") {
        const data = await product.find().sort({ price: -1 })
        res.send(data)
    }
}

const myproduct = (req, res) => {
    res.render("cartform")
}

const addproduct = async (req, res) => {
    req.body.createdBy = req.user.id
    let data = await product.create(req.body);
    res.send(data);
}

const addmycart = async(req,res) =>{
    console.log(req.body);
    let userId = req.user.id;
    req.body.userId = userId;
    console.log(req.body);

    let data = await Cart.create(req.body)
    res.send(data)
}

const mycartdata = async(req,res)=>{
    let data = await Cart.find({ userId: req.user.id }).populate("productId")
    console.log(data);
    res.send(data)
}

const updatedata = async(req,res) =>{
    let {qty} = req.body
    let {id} = req.params
    let data = await Cart.findById(id)
    data.qty = data.qty + qty
    await data.save()
    if(data.qty == 0){
        await Cart.findByIdAndDelete(id)
    }
    res.send({update : data})
}

const deletedata = async(req,res) =>{
    const {id} = req.params
    let data = await Cart.findByIdAndDelete(id)
    res.send({data : "deleted successfully"})
}

let razorpay = new Razorpay({
    key_id: "rzp_test_aseYwd9Lw0lp7m",
    key_secret:"Z5PEDx1r727w21A97LuCr6ri"
})

const payment = (req, res) => {
    let options = {
        amount: req.body.amount * 100,
        currency: "INR"
    }
    razorpay.orders.create(options, (err, order) => {
        if (err) {
            console.log(err);
            res.send({ status: err })
        }
        else {
            res.send(order)
        }
    })
}

module.exports = { cartpage,cartdata,payment,deletedata,createproduct,updatedata, mycart, filltercategory, pricefilter, myproduct, addproduct,addmycart ,mycartdata}