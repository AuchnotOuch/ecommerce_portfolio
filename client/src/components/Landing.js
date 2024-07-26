import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';

const HomePage = () => {
    return (
        <Box textAlign="center" py={10} px={6}>
            <Heading as="h2" size="xl" mb={4}>
                Welcome to Our E-commerce Site!
            </Heading>
            <Text fontSize="lg" mb={6}>
                Explore our collection of products and enjoy seamless shopping.
            </Text>
            <Button colorScheme="teal" size="lg">
                Shop Now
            </Button>
        </Box>
    );
};

export default HomePage;
