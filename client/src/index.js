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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path='/all' element={<AllProducts />} />
            <Route path='/category/:category' element={<CategoryProducts />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </Layout>
      </Router>
    </ChakraProvider>
  </React.StrictMode>
);
