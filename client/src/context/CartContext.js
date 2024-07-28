import React, { createContext, useReducer } from 'react';

const initialState = {
    cart: [],
};

export const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const item = action.payload;
            const existItem = state.cart.find(x => x.product._id === item.product._id);
            if (existItem) {
                return {
                    ...state,
                    cart: state.cart.map(x => x.product._id === existItem.product._id ? item : x),
                };
            } else {
                return {
                    ...state,
                    cart: [...state.cart, item],
                };
            }
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cart: state.cart.filter(x => x.product._id !== action.payload),
            };
        case 'SET_CART':
            return {
                ...state,
                cart: action.payload,
            };
        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    return (
        <CartContext.Provider value={{ cart: state.cart, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};
