import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, VStack, Spinner } from '@chakra-ui/react';
import axios from 'axios';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('/api/orders/user/', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <Spinner />;
    }

    return (
        <Box p={6}>
            <Heading color='white' as="h2" size="xl" mb={4}>Your Orders</Heading>
            {orders.length === 0 ? (
                <Text>No orders found</Text>
            ) : (
                <VStack spacing={4} align="stretch">
                    {orders.map(order => (
                        <Box color='white' key={order._id} borderWidth="1px" borderRadius="lg" p={4}>
                            <Heading as="h3" size="md">Order ID: {order._id}</Heading>
                            <Text>Total Amount: ${order.totalAmount.toFixed(2)}</Text>
                        </Box>
                    ))}
                </VStack>
            )}
        </Box>
    );
};

export default Orders;
