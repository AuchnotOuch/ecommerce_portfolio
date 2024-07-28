import React, { useEffect, useState } from 'react';
import { Box, Spinner, SimpleGrid, Heading, Center } from '@chakra-ui/react';
import Product from './Product';
import axios from 'axios';

const ProductList = ({ category }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                console.log('Fetching products...');
                const response = await axios.get('/api/products');
                console.log('Response:', response);

                let fetchedProducts = response.data;
                if (category) {
                    fetchedProducts = fetchedProducts.filter(product => product.category === category);
                }
                setProducts(fetchedProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
                if (error.response) {
                    console.error('Response data:', error.response.data);
                    console.error('Response status:', error.response.status);
                    console.error('Response headers:', error.response.headers);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category]);

    if (loading) {
        return <Spinner />;
    }

    return (
        <Box>
            <Heading color='white' as="h2" size="lg" mb={4} textAlign='center'>
                {category ? `Products in ${category}` : 'All Products'}
            </Heading>
            <SimpleGrid columns={[1, 2, 3]} spacing="5px">
                {products.map(product => (
                    <Product key={product._id} product={product} />
                ))}
            </SimpleGrid>
        </Box>
    );
};

export default ProductList;
