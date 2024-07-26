import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './components/Landing';
import Layout from './components/Layout';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Landing />} />
            {/* Add other routes here */}
          </Routes>
        </Layout>
      </Router>
    </ChakraProvider>
  </React.StrictMode>
);
