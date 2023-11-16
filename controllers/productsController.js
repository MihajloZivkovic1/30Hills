// const Product = require('../models/productModel');
const axios = require('axios')


const getProducts = async (req, res) => {
    try {
        const response = await axios.get('https://30hills.com/api/products.json');
        const products = response.data.products.data.items;
        res.json(products);
    } catch (error) {
        console.error('Error fetching product data:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}
const getSingleProduct = async (req, res) => {
    const productId = req.params.id;

    try {
        const response = await axios.get("https://30hills.com/api/products.json");
        const products = response.data.products.data.items;


        const product = products.find((p) => p.id === productId);

        if (!product) {
            res.status(404).json({ error: 'Product not found' });
        } else {
            res.json(product);
        }
    } catch (error) {
        console.error('Error fetching product data:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};

module.exports = {
    getProducts,
    getSingleProduct,

}
