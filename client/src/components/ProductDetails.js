import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Image, Text, Spinner, Heading, FormControl, FormLabel, Textarea, Button, Select } from '@chakra-ui/react';
import axios from 'axios';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [reviewLoading, setReviewLoading] = useState(false);
    const [error, setError] = useState(null);

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

    const submitReview = async () => {
        setReviewLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`/api/reviews/${id}`, { rating, comment }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setComment('');
            setRating(0);
            // Refetch product details to show the new review
            const updatedProduct = await axios.get(`/api/products/${id}`);
            setProduct(updatedProduct.data);
        } catch (error) {
            console.error('Error submitting review:', error);
            setError('Error submitting review');
        } finally {
            setReviewLoading(false);
        }
    };

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
            <Text mt={4}>Rating: {product.rating} ({product.numReviews} reviews)</Text>

            <Box mt={6}>
                <Heading as="h3" size="lg" mb={4}>Reviews</Heading>
                {product.reviews.length === 0 && <Text>No reviews yet</Text>}
                {product.reviews.map((review) => (
                    <Box key={review._id} borderWidth="1px" borderRadius="lg" p={4} mb={4}>
                        <Text fontWeight="bold">{review.name}</Text>
                        <Text>Rating: {review.rating}</Text>
                        <Text>{review.comment}</Text>
                        <Text fontSize="sm" color="gray.500">{new Date(review.date).toLocaleString()}</Text>
                    </Box>
                ))}
            </Box>

            <Box mt={6}>
                <Heading as="h3" size="lg" mb={4}>Add a Review</Heading>
                {error && <Text color="red.500">{error}</Text>}
                <FormControl id="rating" mb={4}>
                    <FormLabel>Rating</FormLabel>
                    <Select value={rating} onChange={(e) => setRating(e.target.value)}>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Excellent</option>
                    </Select>
                </FormControl>
                <FormControl id="comment" mb={4}>
                    <FormLabel>Comment</FormLabel>
                    <Textarea value={comment} onChange={(e) => setComment(e.target.value)} />
                </FormControl>
                <Button colorScheme="teal" onClick={submitReview} isLoading={reviewLoading}>Submit Review</Button>
            </Box>
        </Box>
    );
};

export default ProductDetails;
