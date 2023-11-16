const express = require('express')

const router = express.Router();

const { addToCart, removeFromCart, getCartItems } = require('../controllers/cartControllers')


// Add to cart
router.post('/add', addToCart);

// Remove from cart
router.post('/remove', removeFromCart);

// Get cart items
router.get('cart', getCartItems);

module.exports = router;
