const express = require('express')
const router = express.Router()
const {
    getProducts, getSingleProduct, addToCart, removeFromCart, getCartItems
} = require('../controllers/productsController')


//get all products

router.get('/', getProducts)

//get single product
router.get('/:id', getSingleProduct);





module.exports = router