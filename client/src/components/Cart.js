import React, { useContext } from 'react';
import { Box, Heading, Text, Button, Image, VStack, HStack, Link } from '@chakra-ui/react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { Link as RouterLink } from 'react-router-dom';

const Cart = () => {
    const { cart, dispatch } = useContext(CartContext);
    const { token } = useContext(AuthContext);

    const handleRemove = (productId) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    };

    const totalAmount = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    return (
        <Box p={6}>
            <Heading color='white' as="h2" size="xl" mb={4}>Your Cart</Heading>
            {cart.length === 0 ? (
                <Text color='white'>Your cart is empty</Text>
            ) : (
                <VStack spacing={4}>
                    {cart.map(item => (
                        <Box bg="rgba(255, 255, 255, 0.1)" color="white" key={item.product._id} borderRadius="lg" p={4} w="100%">
                            <HStack>
                                <Image src={item.product.images[0]} alt={item.product.name} boxSize="100px" />
                                <VStack align="start">
                                    <Text fontWeight="bold">{item.product.name}</Text>
                                    <Text>{item.product.description}</Text>
                                    <Text>${item.product.price.toFixed(2)}</Text>
                                    <Text>Quantity: {item.quantity}</Text>
                                    <Button onClick={() => handleRemove(item.product._id)} colorScheme="red" size="sm">Remove</Button>
                                </VStack>
                            </HStack>
                        </Box>
                    ))}
                </VStack>
            )}
            <Text color='white' fontSize="xl" fontWeight="bold" mt={4}>Total: ${totalAmount.toFixed(2)}</Text>
            {totalAmount === 0 ? (
                <Link as={RouterLink} to='/all'><Button>Add Products</Button></Link>
            ) : (
                <>
                    {token ? (
                        <Button
                            color="white"
                            as={RouterLink}
                            bg="none"
                            border='1px'
                            borderColor="white"
                            to="/checkout"
                            size="lg"
                            mt={6}
                        >
                            Proceed to Checkout
                        </Button>
                    ) : (
                        <Button
                            color="white"
                            as={RouterLink}
                            bg="none"
                            border='1px'
                            borderColor="white"
                            to="/signin"
                            size="lg"
                            mt={6}
                        >
                            Proceed to Login to Checkout
                        </Button>
                    )}
                </>
            )}
        </Box>
    );
};

export default Cart;
