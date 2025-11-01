const jwt = require("jsonwebtoken")
const multer = require("multer");
const path = require("path");
const shortid = require("shortid");
const slugify = require("slugify");
const { requireAdminSignin, adminMiddleware } = require("../controllers/middleware")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), "uploads"))
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + '-' + file.originalname)
    }
})
exports.upload = multer({ storage: storage })

exports.requireAdminSignin = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const admin = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = admin
        next()
    } catch (error) {
        return res.status(401).json({
            message: "Authorization Required"
        })
    }

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
