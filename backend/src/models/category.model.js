const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        unique: true,
        required: true,
        indexedDB: true
    },
    type: {
        type: String,
    },
    categoryImage: {
        type: String,
    },
    parentId: {
        type: String,
    },
});

module.exports = mongoose.model("Category", categorySchema);
