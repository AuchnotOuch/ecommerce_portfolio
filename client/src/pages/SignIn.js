import React, { useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Heading,
    useToast,
    VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    const handleSignIn = async () => {
        setLoading(true);
        try {
            const response = await axios.post('/api/users/login', { email, password });
            localStorage.setItem('token', response.data.token);
            toast({
                title: "Signed in successfully.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            navigate('/all');
        } catch (error) {
            toast({
                title: "Error signing in.",
                description: error.response?.data?.msg || "Something went wrong.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box maxW="md" mx="auto" mt={10}>
            <Heading as="h1" mb={6}>Sign In</Heading>
            <VStack spacing={4} align="stretch">
                <FormControl id="sign-in-email" mb={4}>
                    <FormLabel>Email address</FormLabel>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                    />
                </FormControl>
                <FormControl id="sign-in-password">
                    <FormLabel>Password</FormLabel>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                    />
                </FormControl>
                <Button colorScheme="teal" onClick={handleSignIn} isLoading={loading}>
                    Sign In
                </Button>
                <Button variant="link" onClick={() => navigate('/signup')}>Don't have an account? Sign Up</Button>
            </VStack>
        </Box>
    );
};

export default SignIn;
