import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './components/Landing';
import Layout from './components/Layout';
import './index.css';
import AllProducts from './pages/AllProducts';
import CategoryProducts from './pages/CategoryProducts';
import ProductDetails from './components/ProductDetails';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import { CartProvider } from './context/CartContext';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Orders from './components/Orders';
import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <ChakraProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/all" element={<AllProducts />} />
                <Route path="/category/:category" element={<CategoryProducts />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/orders" element={<Orders />} />
              </Routes>
            </Layout>
          </Router>
        </ChakraProvider>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
