const Admin = require("../models/admin.model");
const jwt = require("jsonwebtoken");

exports.adminSignup = (req, res) => {
    Admin.findOne({ email: req.body.email })
        .then((admin) => {
            if (admin) {
                return res.status(400).json({
                    message: "Admin already Registered..."
                })
            } else {
                const { firstName, lastName, email, password } = req.body;
                const _admin = new Admin({
                    firstName, lastName, email, password,
                    username: Math.random().toString().substring(2, 12)
                })
                _admin.save()
                    .then((data) => {
                        if (data) {
                            return res.status(201).json({
                                message: "Admin Registered Successfully",
                                user: data
                            })
                        } else {
                            return res.status(400).json({
                                message: "Something went wrong"
                            })
                        }
                    })
            }
        }).catch((error) => {
            return res.status(500).json({
                message: "Internal Server Error " + error.message
            })
        })
}

exports.adminSignin = (req, res) => {
    Admin.findOne({ email: req.body.email })
        .then((admin) => {
            if (!admin) {
                return res.status(400).json({
                    message: "Admin Not Registered..."
                })
            } else {
                if (admin.authenticate(req.body.password) && admin.role === "admin") {
                    const token = jwt.sign({ _id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
                    const { firstName, lastName, email, username, fullName, role } = admin;
                    res.cookie("token", token, { expiresIn: "1h" });
                    return res.status(200).json({
                        token,
                        message: "Signin Successfully",
                        user: { firstName, lastName, email, username, fullName, role }

                    })
                } else {
                    return res.status(400).json({
                        message: "Invalid Password"
                    })
                }
            }
        }).catch((error) => {
            return res.status(500).json({
                message: "Internal Server Error " + error.message
            })
        })
}

