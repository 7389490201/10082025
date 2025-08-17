const express = require("express");
const router = express.Router();
const Admin = require("../models/admin.model");
const jwt = require("jsonwebtoken");
const { adminSignup, adminSignin } = require("../controllers/admin.controller");
const { requireAdminSignin, adminMiddleware } = require("../controllers/middleware");
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require("../validators/auth");

router.post("/admin/signup", validateSignupRequest, isRequestValidated, adminSignup)
router.post("/admin/signin", validateSigninRequest, isRequestValidated, adminSignin)
router.post("/admin/signout", (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({
        message: "Signout Successfully"
    })
})

router.post("/admin/profile", requireAdminSignin, adminMiddleware, (req, res) => {
    return res.status(200).json({
        message: "Profile"
    })
})

module.exports = router;

