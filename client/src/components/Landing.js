import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, Button, VStack, SimpleGrid, Image, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import Slider from 'react-slick';
import axios from 'axios';

const images = [
    "/images/1.webp",
    "/images/2.webp",
    "/images/3.webp",
];

const Landing = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    const [popularProducts, setPopularProducts] = useState([]);

    useEffect(() => {
        const fetchPopularProducts = async () => {
            try {
                const response = await axios.get('/api/products');
                const products = response.data.sort((a, b) => b.rating - a.rating).slice(0, 6); // Get top 6 products by rating
                setPopularProducts(products);
            } catch (error) {
                console.error('Error fetching popular products:', error);
            }
        };

        fetchPopularProducts();
    }, []);

    return (
        <Box textAlign="center" py={10} px={6}>
            <Heading as="h2" size="xl" mb={4}>
                EcoSphere
            </Heading>
            <Text fontSize="lg" mb={6}>
                Explore our collection of products.
            </Text>
            <SimpleGrid columns={[1, null, 3]} spacing={10}>
                <VStack spacing={4} align="stretch">
                    <Box borderRadius="lg" mb={4} p={0} bg="rgba(255, 255, 255, 0.1)" backdropFilter="blur(10px)" position="relative" overflow="hidden">
                        <Heading as="h3" size="md" mb={2}>Updates</Heading>
                        <Box m={0} p={0} position="relative" width="100%" height="100%" overflow="hidden" whiteSpace="nowrap">
                            <Box p={0} as="span" display="inline-block" animation="ticker 10s linear infinite">
                                <Text display="inline-block" px={4}>Store Wide Sale! 20% off your entire order!</Text>
                                <Text display="inline-block" px={4}>New Fall Collection is here!</Text>
                            </Box>
                        </Box>
                    </Box>
                    <Box borderRadius="lg" p={4} bg="rgba(255, 255, 255, 0.1)" backdropFilter="blur(10px)">
                        <Heading as="h3" size="md" mb={2}>Follow Us!</Heading>
                        <Box display="flex" justifyContent="space-around">
                            <Box boxSize="50px" bg="gray.200" borderRadius="50%"></Box>
                            <Box boxSize="50px" bg="gray.200" borderRadius="50%"></Box>
                            <Box boxSize="50px" bg="gray.200" borderRadius="50%"></Box>
                            <Box boxSize="50px" bg="gray.200" borderRadius="50%"></Box>
                        </Box>
                    </Box>
                </VStack>
                <Box width="100%" maxWidth="450px" mx="auto">
                    <Slider {...settings}>
                        {images.map((src, index) => (
                            <Box key={index} borderRadius="15px" overflow="hidden">
                                <img src={src} alt={`Product ${index + 1}`} style={{ width: "100%", height: "auto" }} />
                            </Box>
                        ))}
                    </Slider>
                    <Button size="lg" mt={10} bg="rgba(255, 255, 255, 0.1)" border="1px" borderColor="white">
                        Explore
                    </Button>
                </Box>
                <VStack spacing={4} align="stretch">
                    <Box borderRadius="lg" p={4} bg="rgba(255, 255, 255, 0.1)" backdropFilter="blur(10px)">
                        <Heading as="h3" size="md" mb={2}>Popular Products</Heading>
                        <SimpleGrid justifyContent="center" columns={2} spacing={4} >
                            {popularProducts.map(product => (
                                <Link as={RouterLink} to={`/product/${product._id}`} key={product._id} _hover={{ textDecoration: 'none' }}>
                                    <Box borderRadius="lg" overflow="hidden" p={2} display="flex" justifyContent="center">
                                        <Image borderRadius="lg" src={product.images[0]} alt={product.name} boxSize="100px" objectFit="cover" />
                                    </Box>
                                </Link>
                            ))}
                        </SimpleGrid>
                    </Box>
                </VStack>
            </SimpleGrid>
        </Box >
    );
};

export default Landing;
