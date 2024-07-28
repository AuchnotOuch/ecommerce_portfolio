import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item) => {
        const existItem = cart.find(x => x.product._id === item.product._id);
        if (existItem) {
            setCart(cart.map(x => x.product._id === existItem.product._id ? item : x));
        } else {
            setCart([...cart, item]);
        }
    };

    const removeFromCart = (productId) => {
        setCart(cart.filter(x => x.product._id !== productId));
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
