const express = require("express");
const router = express.Router();
const Cart = require("../models/cart.model")
const { requireUserSignin, userMiddleware } = require('../controllers/middleware')

router.post("/user/cart/addtocart", requireUserSignin, userMiddleware, async (req, res) => {
    const { productId, price, quantity } = req.body.cartitems[0]
    const priceAsNumber = Number(price);
    const quantityAsNumber = Number(quantity);
    const userId = req.user._id;

    if (!productId || isNaN(quantityAsNumber) || isNaN(priceAsNumber)) {
        return res.status(400).json({
            message: "Invalid item in cart"
        })
    }

    try {

        let cart = await Cart.findOne({ userId: userId })
        if (cart) {
            const existingItem = cart.cartitems.find(c => c.productId.toString() === productId);
            if (existingItem) {
                existingItem.price += priceAsNumber;
                existingItem.quantity += quantityAsNumber
            } else {
                cart.cartitems.push({
                    productId,
                    price: priceAsNumber,
                    quantity: quantityAsNumber
                })
            }
            const updatedCart = await cart.save()
            return res.status(201).json({
                message: "Cart Update Successfully",
                cart: updatedCart
            })
        } else {
            const newCart = new Cart({
                userId,
                cartitems: [
                    {
                        productId: productId,
                        price: priceAsNumber,
                        quantity: quantityAsNumber
                    }
                ]
            })
            const createCart = await newCart.save();
            return res.status(201).json({
                message: "Cart Created Successfully",
                cart: createCart
            })
        }

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }


});



module.exports = router;