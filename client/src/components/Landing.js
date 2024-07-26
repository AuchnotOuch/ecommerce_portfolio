import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import Slider from 'react-slick';

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

    return (
        <Box textAlign="center" py={10} px={6}>
            <Heading as="h2" size="xl" mb={4}>
                Welcome to Our E-commerce Site!
            </Heading>
            <Text fontSize="lg" mb={6}>
                Explore our collection of products and enjoy seamless shopping.
            </Text>
            <Box width="80%" mx="auto" mb={6}>
                <Slider {...settings}>
                    {images.map((src, index) => (
                        <Box key={index}>
                            <img src={src} alt={`Product ${index + 1}`} style={{ width: "100%", height: "auto" }} />
                        </Box>
                    ))}
                </Slider>
            </Box>
            <Button colorScheme="teal" size="lg">
                Shop Now
            </Button>
        </Box>
    );
};

export default Landing;
