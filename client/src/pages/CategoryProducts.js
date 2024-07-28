import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, SimpleGrid, Spinner, Text } from '@chakra-ui/react';
import axios from 'axios';
import Product from '../components/Product';

const CategoryProducts = () => {
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`/api/products?category=${category}`);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category]);

    if (loading) {
        return <Spinner />;
    }

    if (products.length === 0) {
        return <Text>No products found in this category</Text>;
    }

    return (
        <Box p={6}>
            <Heading as="h2" size="xl" mb={4}>Products in {category}</Heading>
            <SimpleGrid columns={[1, null, 2, 3]} spacing={10}>
                {products.map(product => (
                    <Product key={product._id} product={product} />
                ))}
            </SimpleGrid>
        </Box>
    );
};

export default CategoryProducts;
