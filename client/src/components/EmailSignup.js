// src/components/EmailSignup.js
import React, { useState } from 'react';
import { Box, Input, Button, FormControl, FormLabel, useToast } from '@chakra-ui/react';
import axios from 'axios';

const EmailSignup = () => {
    const [email, setEmail] = useState('');
    const toast = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/newsletter/signup', { email });
            toast({
                title: "Subscription Successful",
                description: "You have been subscribed to the newsletter.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            setEmail('');
        } catch (error) {
            toast({
                title: "Subscription Failed",
                description: "There was an error subscribing to the newsletter.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Box as="form" onSubmit={handleSubmit} mt={4}>
            <FormControl>
                <FormLabel color="white">Email Address</FormLabel>
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    mb={3}
                    required
                />
            </FormControl>
            <Button type="submit" >Subscribe</Button>
        </Box>
    );
};

export default EmailSignup;
