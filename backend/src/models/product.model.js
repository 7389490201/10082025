const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        indexedDB: true
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    offer: { type: Number },
    description: {
        type: String,
        required: true,
    },
    productPictures: [
        {
            img: { type: String, required: true },

        },
    ],
    category: {
        type: mongoose.Schema.Types.ObjectId, ref: "Category",
        required: true,
    },
    review: [
        {
            review: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            type: String,
        }
    ],
    createdBy: {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true, },

    },
    updatedAt: Date,


}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);