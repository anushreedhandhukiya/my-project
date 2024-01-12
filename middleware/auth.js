const jwt = require("jsonwebtoken")

const isAdmin = (req, res, next) => {
    let { token } = req.cookies;
    if (!token) {
      return res.redirect("/user/login");
    }
    
    let data = jwt.verify(token, "token");
    if (data.role == "admin") {
      req.user=data
      return next();
    } 
    else {
      return res.send("not authorized");
    }
}

const verifyToken = (req, res, next) => {
    let { token } = req.cookies;
    if (token) {
        let data = jwt.verify(token, "token");
        if (data) {
            req.user = data;
            next();
        } else {
            res.send("Invalid token ");
        }
    }
    else {
        res.send("token not received");
    }
}

module.exports = { isAdmin, verifyToken }