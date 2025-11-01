const { upload } = require("../controllers/middleware");
const { createPage } = require("../controllers/page.controller");
const express = require("express");
const router = express.Router();

router.post("/page/create",upload.fields([
    {name:"banners"},
    {name:"products"},
]),createPage)



module.exports = router;