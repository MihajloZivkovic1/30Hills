const { getProducts } = require("./productsController");

let cart = [];

const addToCart = async (req, res) => {
    const productId = req.params.id;
    const products = await getProducts();
    const product = products.find(item => item.id === productId)

    if (product) {
        cart.push(product)
        res.json({
            success: true, cart
        })
    }
    else {
        res.status(404).json({
            success: false,
            message: "Product not found"
        })
    }

}
const removeFromCart = async (req, res) => {
    const productId = req.params.id;
    cart.filter(item => item.id !== productId)
    res.json({
        success: true, cart
    })
}
const getCartItems = async (req, res) => {
    res.json(cart)
}


module.exports = {
    addToCart,
    removeFromCart,
    getCartItems
}