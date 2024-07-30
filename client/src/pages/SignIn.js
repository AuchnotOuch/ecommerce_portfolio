import React, { useState, useContext } from 'react';
import { Box, Button, Input, VStack, Heading, Text, useToast } from '@chakra-ui/react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const toast = useToast();
    const navigate = useNavigate();
    console.log(login)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/users/login', { email, password });
            console.log(res)
            login(res.data.user, res.data.token);
            toast({
                title: "Signed in successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            navigate('/');
        } catch (err) {
            toast({
                title: "Error signing in",
                description: err.response?.data?.msg || "Something went wrong",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Box color='white' p={6} maxWidth="400px" mx="auto">
            <Heading as="h2" size="xl" mb={4}>Sign In</Heading>
            <VStack as="form" spacing={4} align="stretch" onSubmit={handleSubmit}>
                <Input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button type="submit" size="lg">Sign In</Button>
                <Text>
                    Don't have an account? <a href="/signup">Sign Up</a>
                </Text>
            </VStack>
        </Box>
    );
};

export default SignIn;
