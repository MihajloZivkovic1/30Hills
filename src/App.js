
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';
import ProductDetails from './components/ProductDetails';
import Notification from './components/Notification';
import Cart from './components/Cart';
import ProductList from './components/ProductList';


const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        // Fetch products from the server
        axios.get('http://localhost:4000/api/products')
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));

        const storedCart = JSON.parse(localStorage.getItem('cart')) || []
        setCart(storedCart)
    }, []);
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart]);
    const addToCart = (product) => {
        setCart(prevCart => [...prevCart, product]);
        setNotification(`${product.name} added to cart!`);
    };
    const closeNotification = () => {
        setNotification(null);
    };

    const removeFromCart = (product) => {
        const updatedCart = cart.filter(item => item.id !== product.id);
        setCart(updatedCart);
    };
    return (
        <Router>
            <div>
                <nav className='navbar'>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/cart">Cart</Link>
                        </li>
                    </ul>
                </nav>
                {notification && (
                    <Notification message={notification} onClose={closeNotification} />
                )}
                <Switch>
                    <Route path="/cart">
                        <Cart cart={cart} onRemoveFromCart={removeFromCart} />
                    </Route>
                    <Route path="/products/:id" render={(props) => <ProductDetails {...props} addToCart={addToCart} />} />
                    <Route path="/">
                        <h1>Shopping App</h1>

                        <ProductList>
                            <div>
                                <h2>Products</h2>
                                {products.map(product => (
                                    <div key={product.id}>
                                        <h3>{product.name}</h3>
                                        <p>${product.price}</p>
                                        <Link to={`/products/${product.id}`}>Details</Link>
                                    </div>
                                ))}
                            </div>
                        </ProductList>

                    </Route>
                </Switch>
            </div>
        </Router >
    );
};

export default App;