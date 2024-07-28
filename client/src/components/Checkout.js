import React, { useContext, useState, useEffect } from 'react';
import { Box, Heading, Text, VStack, Button, FormControl, FormLabel, Input, useToast, HStack, Image, SimpleGrid, Link } from '@chakra-ui/react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

const Checkout = () => {
    const { cart, dispatch } = useContext(CartContext);
    const { token } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [loading, setLoading] = useState(false);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const toast = useToast();
    const navigate = useNavigate();

    const totalAmount = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    useEffect(() => {
        const fetchRelatedProducts = async () => {
            if (cart.length === 0) return;

            const categoryIds = cart.map(item => item.product.category).join(',');
            try {
                const response = await axios.get(`/api/products/related`, {
                    params: { categories: categoryIds },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.data.length === 0) {
                    const allProductsResponse = await axios.get('/api/products', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    const sortedProducts = allProductsResponse.data.sort((a, b) => b.rating - a.rating).slice(0, 6);
                    setRelatedProducts(sortedProducts);
                } else {
                    setRelatedProducts(response.data.slice(0, 6));
                }
            } catch (error) {
                console.error('Error fetching related products:', error);
            }
        };
        fetchRelatedProducts();
    }, [cart, token]);

    const handleOrder = async () => {
        setLoading(true);
        try {
            await axios.post('/api/orders', {
                products: cart.map(item => ({ product: item.product._id, quantity: item.quantity })),
                totalAmount
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch({ type: 'SET_CART', payload: [] });
            toast({
                title: "Order placed",
                description: "Your order has been successfully placed.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            navigate('/');
        } catch (error) {
            console.error('Error placing order:', error);
            toast({
                title: "Error",
                description: "There was an issue placing your order. Please try again.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = (product) => {
        dispatch({ type: 'ADD_TO_CART', payload: { product, quantity: 1 } });
        toast({
            title: "Added to cart",
            description: `${product.name} has been added to your cart.`,
            status: "success",
            duration: 3000,
            isClosable: true,
        });
    };

    return (
        <Box display="flex" color='white' p={6}>
            <Box flex="1">
                <Heading as="h2" size="xl" mb={4}>Checkout</Heading>
                <VStack spacing={4} align="stretch">
                    <Heading as="h3" size="md" mb={2}>Order Summary</Heading>
                    {cart.map(item => (
                        <HStack bg="rgba(255, 255, 255, 0.1)" backdropFilter="blur(10px)" key={item.product._id} borderRadius="lg" p={4} w="100%">
                            <Image src={item.product.images[0]} alt={item.product.name} boxSize="100px" />
                            <VStack align="start">
                                <Text fontWeight="bold">{item.product.name}</Text>
                                <Text>Quantity: {item.quantity}</Text>
                                <Text>${item.product.price.toFixed(2)}</Text>
                            </VStack>
                        </HStack>
                    ))}
                    <Text fontSize="xl" fontWeight="bold" mt={4}>Total: ${totalAmount.toFixed(2)}</Text>
                    <Box maxWidth="50%">
                        <FormControl id="name">
                            <FormLabel>Name on Card</FormLabel>
                            <Input bg="rgba(255, 255, 255, 0.1)" backdropFilter="blur(10px)" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        </FormControl>
                        <FormControl id="cardNumber">
                            <FormLabel>Card Number</FormLabel>
                            <Input bg="rgba(255, 255, 255, 0.1)" backdropFilter="blur(10px)" type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                        </FormControl>
                        <FormControl id="expiryDate">
                            <FormLabel>Expiry Date</FormLabel>
                            <Input bg="rgba(255, 255, 255, 0.1)" backdropFilter="blur(10px)" type="text" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
                        </FormControl>
                        <FormControl id="cvv">
                            <FormLabel>CVV</FormLabel>
                            <Input bg="rgba(255, 255, 255, 0.1)" backdropFilter="blur(10px)" type="text" value={cvv} onChange={(e) => setCvv(e.target.value)} />
                        </FormControl>
                        <Button mt={2} size="lg" onClick={handleOrder} isLoading={loading}>Place Order</Button>
                    </Box>
                </VStack>
            </Box>
            <Box flex="1" pl={6}>
                <Heading as="h3" size="md" mb={4}>You May Also Like</Heading>
                <SimpleGrid columns={2} spacing={4}>
                    {relatedProducts.map(product => (
                        <Link as={RouterLink} to={`/product/${product._id}`} key={product._id} _hover={{ textDecoration: 'none' }}>
                            <Box display="flex" flexDirection="column" bg="rgba(255, 255, 255, 0.1)" backdropFilter="blur(10px)" borderRadius="lg" p={4}>
                                <Image justifyContent='center' borderRadius='lg' src={product.images[0]} alt={product.name} boxSize="100px" />
                                <Text fontWeight="bold" mt={2}>{product.name}</Text>
                                <Text>${product.price.toFixed(2)}</Text>
                                <Button mt={2} size="sm" onClick={(e) => {
                                    e.preventDefault();
                                    handleAddToCart(product);
                                }}>Add to Order</Button>
                            </Box>
                        </Link>
                    ))}
                </SimpleGrid>
            </Box>
        </Box>
    );
};

export default Checkout;
