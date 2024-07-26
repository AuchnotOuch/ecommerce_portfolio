import React from 'react';
import { Box } from '@chakra-ui/react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
    return (
        <Box>
            <Sidebar />
            <Box as="main" mt={4}>
                {children}
            </Box>
        </Box>
    );
};

export default Layout;
