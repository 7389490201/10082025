const express = require("express");
const router = express.Router();
const Product = require("../models/product.model");
const Category = require('../models/category.model');
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

router.post("/initialdata", async (req, res) => {
    try {
        const product = await Product.find({}).populate("category", "_id name");
        res.status(200).json({ product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.get("/products/:slug", async (req, res) => {
    const { slug } = req.params;
    const lowerSlug = slug.toLowerCase();
    try {
        const category = await Category.findOne({ slug: lowerSlug })
        if (category) {
            const product = await Product.find({ category: category._id })
            res.status(200).json({
                product,
                productByPrice: {
                    under5k: product.filter(item => item.price <= 5000),
                    under10k: product.filter(item => item.price > 5000 && item.price <= 10000),
                    under15k: product.filter(item => item.price > 10000 && item.price <= 15000),
                    under20k: product.filter(item => item.price > 15000 && item.price <= 20000),
                    under30k: product.filter(item => item.price > 20000 && item.price <= 30000),
                }
            })
        } else {
            return res.status(400).json({
                message: "Product Not Found"
            })
        }
    } catch (error) {
        return res.status(500).json({
            error: "Internal Server Error" + error.message
        })
    }

})

module.exports = router;