import React from 'react';
import { Box, Image, Text, Link, Badge } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Product = ({ product }) => {
    return (
        <Link as={RouterLink} to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
            <Box color="white" borderRadius="lg" overflow="hidden" p={4} m={2} position="relative" maxHeight='400px' bg="rgba(255, 255, 255, 0.1)" backdropFilter="blur(10px)">
                <Badge position="absolute" top="10px" right="10px">
                    ${product.price.toFixed(2)}
                </Badge>
                <Box display="flex" alignItems="center" justifyContent="center" height="200px" borderRadius="lg" width="100%" mb={2}>
                    <Image src={product.images[0]} alt={product.name} boxSize="200px" objectFit="cover" borderRadius="lg" />
                </Box>
                <Text mt={2} fontWeight="bold" textAlign="center">{product.name}</Text>
                <Text textAlign="center">{product.description}</Text>
            </Box>
        </Link>
    );
};

export default Product;
