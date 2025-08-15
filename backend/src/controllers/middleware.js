const jwt = require("jsonwebtoken")

exports.requireAdminSignin = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const admin = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = admin
    next()
}

exports.adminMiddleware = (req, res, next) => {
    const admin = req.admin;
    if (admin && admin.role === "admin") {
        next();
    } else {
        return res.status(400).json({
            message: "Invalid Login"
        });
    }
}

exports.requireUserSignin = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user

    next()
}


exports.userMiddleware = (req, res, next) => {
    const user = req.user;
    if (user && user.role === "user") {
        next()
    } else {
        return res.status(400).json({
            message: "Invalid Login"
        })
    }
}