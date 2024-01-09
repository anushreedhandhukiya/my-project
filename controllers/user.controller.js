const user = require("../models/user.schema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const otpgenerator = require("otp-generator")
const nodemailer = require("nodemailer")

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

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "anushreecd2000@gmail.com",
        pass: "lgczdnaoxoyqyruu",
    },
});

let storedOTP = {}
const resetEmail = async (req, res) => {
    const { email } = req.body
    storedOTP.otp = otpgenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false
    })

    storedOTP.email = email
    const mailOption = {
        form: "anushreecd2000@gmail.com",
        to: email,
        subject: "Reset Your Password",
        html: `<a href="http://localhost:8090/user/verify/${storedOTP.otp}">Click to verify your OTP${storedOTP.otp}</a>`
    }
    transport.sendMail(mailOption, (err, info) => {
        if (err) {
            console.log(err.message)
        }
        else {
            console.log(info)
        }
    })
    res.render("otp")
}

const otpform = (req, res) => {
    res.render("otp")
}

const otpverify = (req, res) => {
    let { otp } = req.body;
    console.log(otp, storedOTP);
    try {
        if (otp === storedOTP.otp) {
            res.render("reset")
        } else {
            res.send("Wrong OTP");
        }
    }
    catch (error) {
        res.send({ error: "error" })
    }
}

const forgot = (req, res) => {
    res.render("resetform")
}

const reset = async (req, res) => {
    const {  newPassword } = req.body;
    const newpass = await user.findOneAndUpdate( { password: newPassword });
    res.send(newpass);
}

module.exports = { signup, signupage, login, loginpage, logout, reset, otpform, otpverify, resetEmail, forgot }