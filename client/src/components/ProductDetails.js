import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Image, Text, Spinner, Heading, FormControl, FormLabel, Textarea, Button, Select, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState('');
    const [reviewLoading, setReviewLoading] = useState(false);
    const [error, setError] = useState(null);
    const { addToCart } = useContext(CartContext);
    const { token, loggedInCheck } = useContext(AuthContext);
    const [quantity, setQuantity] = useState(1);
    const toast = useToast();

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
            await axios.post(`/api/reviews/${id}`, { rating, comment }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setComment('');
            setRating(1);
            const response = await axios.get(`/api/products/${id}`);
            setProduct(response.data);
        } catch (error) {
            console.error('Error submitting review:', error);
            setError('Error submitting review');
        } finally {
            setReviewLoading(false);
        }
    };

    const handleAddToCart = () => {
        addToCart({ product, quantity });
        toast({
            title: "Added to cart",
            description: `${product.name} has been added to your cart.`,
            status: "success",
            duration: 3000,
            isClosable: true,
        });
    };

    if (loading) {
        return <Spinner />;
    }

    if (!product) {
        return <Text>Product not found</Text>;
    }

    return (
        <Box color="white" p={6}>
            <Heading as="h2" size="xl" mb={4}>{product.name}</Heading>
            <Box display="flex" justifyContent="center" mb={4}>
                <Image src={product.images[0]} alt={product.name} boxSize="400px" objectFit="cover" />
            </Box>
            <Text fontSize="xl" mb={4}>{product.description}</Text>
            <Text fontSize="2xl" fontWeight="bold">${product.price.toFixed(2)}</Text>

            <FormControl id="quantity" mb={4} w="100px">
                <FormLabel>Quantity</FormLabel>
                <Select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
                    {[...Array(10).keys()].map(x => (
                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                    ))}
                </Select>
            </FormControl>

            <Button onClick={handleAddToCart}>Add to Cart</Button>
            <Text mt={4}>Rating: {product.rating.toFixed(2)} ({product.numReviews} reviews)</Text>

            <Box mt={6}>
                <Heading as="h3" size="lg" mb={4}>Reviews</Heading>
                {product.reviews.length === 0 && <Text>No reviews yet</Text>}
                {product.reviews.map((review) => (
                    <Box bg="rgba(255, 255, 255, 0.1)" key={review._id} borderRadius="lg" p={4} mb={4}>
                        <Text fontWeight="bold">{review.name}</Text>
                        <Text>Rating: {review.rating}</Text>
                        <Text>{review.comment}</Text>
                        <Text fontSize="sm" color="gray.500">{new Date(review.date).toLocaleString()}</Text>
                    </Box>
                ))}
            </Box>

            {loggedInCheck() && (
                <Box mt={6}>
                    <Heading as="h3" size="lg" mb={4}>Add a Review</Heading>
                    {error && <Text color="red.500">{error}</Text>}
                    <FormControl id="rating" mb={4}>
                        <FormLabel>Rating</FormLabel>
                        <Select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
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
            )}
        </Box>
    );
};

export default ProductDetails;
