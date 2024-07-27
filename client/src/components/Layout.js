import React from 'react';
import { Box } from '@chakra-ui/react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
    return (
        <Box minH="100vh" position="relative" bgGradient="linear(120deg, #f6d365, #fda085, #ff9a9e, #fad0c4, #fcb69f)" backgroundSize="400% 400%" animation="shimmer 10s ease infinite">
            <Sidebar />
            <Box as="main" mt={4} p={4} zIndex="1000">
                {children}
            </Box>
        </Box>
    );
};

export default Layout;
