const mongoose = require('mongoose');

const cartProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
});

const cartProduct = mongoose.model('cartProduct', cartProductSchema);

module.exports = cartProduct;
