const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const e = require("express");
const { SignUp, Signin } = require("../controllers/user.controller");
const { requireUserSignin, userMiddleware } = require("../controllers/middleware");
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require("../validators/auth");


router.post("/signup", validateSignupRequest, isRequestValidated, SignUp);

router.post("/signin", validateSigninRequest, isRequestValidated, Signin);

router.post("/profile", requireUserSignin, userMiddleware, (req, res) => {
    return res.status(200).json({
        message: "Profile"
    })
})


module.exports = router;