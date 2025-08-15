const express = require("express");
const router = express.Router();
const Product = require("../models/product.model");
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
const upload = multer({ storage: storage })

router.post("/product/create", requireAdminSignin, adminMiddleware, upload.array("productPictures"), (req, res) => {
    const { name, price, quantity, category, description, } = req.body;
    let productPictures = [];
    if (req.files) {
        productPictures = req.files.map(file => {
            return { img: file.filename }
        })
    }

    const product = new Product({
        name: name,
        slug: slugify(name, { lower: true }),
        price,
        quantity,
        category,
        description,
        productPictures,
        createdBy: {
            userId: req.admin._id
        }
    })
    product.save()
        .then((product) => {
            return res.status(201).json({ product })
        }).catch((error) => {
            return res.status(400).json({ error: error.message })
        })

})

module.exports = router;