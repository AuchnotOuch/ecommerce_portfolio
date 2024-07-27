import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Image, Text, Spinner, Heading } from '@chakra-ui/react';
import axios from 'axios';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`/api/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <Spinner />;
    }

    if (!product) {
        return <Text>Product not found</Text>;
    }

    return (
        <Box p={6}>
            <Heading as="h2" size="xl" mb={4}>{product.name}</Heading>
            <Box display="flex" justifyContent="center" mb={4}>
                <Image src={product.images[0]} alt={product.name} boxSize="400px" objectFit="cover" />
            </Box>
            <Text fontSize="xl" mb={4}>{product.description}</Text>
            <Text fontSize="2xl" fontWeight="bold">${product.price.toFixed(2)}</Text>
        </Box>
    );
};

export default ProductDetails;
