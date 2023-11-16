
import React from 'react';

const Cart = ({ cart, onRemoveFromCart }) => {
    return (
        <div className="cart">
            <h2>Your Shopping Cart</h2>

            {cart.length > 0 ? (
                <div>
                    {cart.map(item => (
                        <div key={item.id} className="cart-item">
                            <img src={item.images[0]} alt={item.name} />
                            <div className="cart-item-info">
                                <h3 className="cart-item-title">{item.name}</h3>
                                <p className="cart-item-price">${item.price}</p>
                            </div>
                            <div className="cart-item-actions">
                                <span className="cart-item-remove" onClick={() => onRemoveFromCart(item)}>
                                    Remove
                                </span>
                            </div>
                        </div>
                    ))}

                    <div className="cart-total">
                        Total: ${parseFloat(cart.reduce((total, item) => total + parseFloat(item.price), 0)).toFixed(2)}
                    </div>
                </div>
            ) : (
                <p className="cart-empty">Your cart is empty.</p>
            )}
        </div>
    );
};

export default Cart;
