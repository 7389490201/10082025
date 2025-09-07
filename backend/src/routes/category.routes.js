const express = require("express");
const router = express.Router();
const Category = require("../models/category.model");
const slugify = require("slugify");
const path = require("path");
const multer = require("multer")
const shortid = require("shortid");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), "uploads"))
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + '-' + file.originalname)
    }
})
const upload = multer({ storage: storage })

router.post("/category/create", upload.single("categoryImage"), async (req, res) => {
    try {
        const { name, parentId } = req.body;
        const slug = slugify(name, { lower: true, strict: true });

        // Duplicate slug check
        const existingCategory = await Category.findOne({ slug });
        if (existingCategory) {
            return res.status(400).json({ message: "Category already exists" });
        }
        let categoryImage = "";
        if (req.file) {
            categoryImage = process.env.API + "/public/" + req.file.filename;
        }

        const category = new Category({ name, slug, parentId, categoryImage });
        await category.save();
        res.status(201).json({ message: "Category created successfully", category });
    } catch (error) {
        res.status(500).json({ message: "Error creating category", error });
    }
});

function createCategoryTree(categories, parentId = null) {
    const categoryList = [];
    let filteredCategories;
    if (parentId == null) {
        filteredCategories = categories.filter(cat => !cat.parentId);
    } else {
        filteredCategories = categories.filter(cat => cat.parentId == parentId);
    }

    for (let cat of filteredCategories) {
        categoryList.push({
            _id: cat._id,
            name: cat.name,
            slug: cat.slug,
            parentId: cat.parentId,
            children: createCategoryTree(categories, cat._id.toString())
        });
    }
    return categoryList;
}

router.get("/category/get", async (req, res) => {
    try {
        const categories = await Category.find();
        const categoryTree = createCategoryTree(categories);
        res.status(200).json({ categories: categoryTree });
    } catch (error) {
        res.status(500).json({ message: "Error fetching categories", error });
    }
});

router.post("/category/update", upload.array("categoryImage"), async (req, res) => {
    try {

        const categories = JSON.parse(req.body.categories);


        // Process each category
        for (let i = 0; i < categories.length; i++) {
            const category = categories[i];
            const { _id, name, parentId, type } = category;

            console.log(category);
            // Find the category by ID
            const existingCategory = await Category.findById(_id);
            if (!existingCategory) {
                return res.status(404).json({ message: "Category not found" });
            }

            // Update category fields
            existingCategory.name = name;
            if (!parentId) {
                existingCategory.parentId = null;
            }
            if (!type) {
                existingCategory.type = null;
            }
            existingCategory.parentId = parentId;
            existingCategory.type = type;

            // Handle category image upload
            if (req.files && req.files[i]) {
                existingCategory.categoryImage = process.env.API + "/public/" + req.files[i].filename;
            }

            await existingCategory.save();
        }

        res.status(200).json({ message: "Categories updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating categories", error: error.message });
    }
});

module.exports = router;