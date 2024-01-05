const user = require("../models/user.schema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const signup = async (req, res) => {
    const { username, email, password, role } = req.body
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            let finddata = await user.findOne({ email })
            if (!finddata) {
                let data = await user.create({
                    username: username,
                    email: email,
                    password: hash,
                    role: role
                })
                let token = jwt.sign({ id: data._id, role: data.role }, "token")
                res.cookie("token", token).send(data)
            }
            else {
                res.send("already exits")
            }
        })
    }
    catch (error) {
        res.send({ error: "error" })
    }
}

const signupage = (req, res) => {
    res.render("signup")
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let data = await user.findOne({ email });
        if (data) {
            bcrypt.compare(password, data.password, (err, result) => {
                if (result) {
                    let token = jwt.sign({ id: data._id, role: data.role }, "token");
                    res.cookie("token", token).send({ msg: "user login successfully" });
                }
                else {
                    res.send({ msg: "Password incorrect" });
                }
            });
        }
    }
    catch (error) {
        res.send({ error: "error" })
    }
}

const loginpage = (req, res) => {
    res.render("login")
}

const logout = (req, res) => {
    res.clearCookie("token").send({ message: "Logout Successfull" })
}

module.exports = { signup, signupage, login, loginpage, logout }