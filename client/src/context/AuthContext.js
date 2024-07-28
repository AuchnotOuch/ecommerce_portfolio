import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
        }
    }, []);

    const login = (userData, tokenData) => {
        console.log(userData);
        console.log(tokenData);
        setUser(userData);
        setToken(tokenData);
        localStorage.setItem('token', tokenData);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
    };

    const loggedInCheck = () => {
        if (localStorage.getItem("token")) {
            return true
        } else {
            return false
        }
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout, loggedInCheck }}>
            {children}
        </AuthContext.Provider>
    );
};
