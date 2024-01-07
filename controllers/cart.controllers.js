const product = require("../models/product.schema")


const cartpage = (req, res) => {
    res.render("cart")
}

const createproduct = async (req, res) => {
    try {
        let data = await product.create(req.body)
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
    req.body.createdBy = req.user
    let data = await product.create(req.body);
    res.send(data);

}


module.exports = { cartpage, createproduct, cartdata, mycart, filltercategory, pricefilter, myproduct, addproduct }