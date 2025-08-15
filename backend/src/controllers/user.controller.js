const User = require("../models/user.model");
const jwt = require("jsonwebtoken")

exports.SignUp = (req, res) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                return res.status(400).json({
                    message: "User Already Registered..."
                })
            }
            const { firstName, lastName, email, password } = req.body;
            const _user = new User({
                firstName,
                lastName,
                email,
                password,
                username: Math.random().toString().substring(2, 10)
            })
            _user.save().then((data) => {
                return res.status(201).json({
                    user: data
                })
            }).catch((error) => {
                return res.status(400).json({
                    message: "Something went wrong" + error.message
                })
            })
        }).catch((error) => {
            return res.status(500).json({
                message: "Internal Server Error" + error.message
            })
        })
}

exports.Signin = (req, res) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                return res.status(400).json({
                    message: "User Not Registered"
                })
            }
            if (user) {
                if (user.authenticate(req.body.password) && user.role === "user") {
                    const token = jwt.sign({ _id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" })
                    const { _id, firstName, lastName, email, fullName, role } = user;
                    return res.status(200).json({
                        token,
                        user: { _id, firstName, lastName, email, fullName, role }
                    })
                } else {
                    return res.status(400).json({
                        message: "Invalid Password"
                    })
                }
            } else {
                return res.status(400).json({
                    message: "Something went wrong"
                })
            }
        }).catch((error) => {
            return res.status(500).json({
                message: "Something went wrong " + error.message
            })
        })
}