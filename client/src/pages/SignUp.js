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

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    const handleSignUp = async () => {
        setLoading(true);
        try {
            await axios.post('/api/users/register', { name, email, password });
            toast({
                title: "Account created.",
                description: "You can now sign in.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            navigate('/signin');
        } catch (error) {
            toast({
                title: "Error creating account.",
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
        <Box color='white' maxW="md" mx="auto" mt={10}>
            <Heading as="h1" mb={6}>Sign Up</Heading>
            <VStack spacing={4} align="stretch">
                <FormControl id="sign-up-name" mb={4}>
                    <FormLabel>Name</FormLabel>
                    <Input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="name"
                    />
                </FormControl>
                <FormControl id="sign-up-email" mb={4}>
                    <FormLabel>Email address</FormLabel>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                    />
                </FormControl>
                <FormControl id="sign-up-password">
                    <FormLabel>Password</FormLabel>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="new-password"
                    />
                </FormControl>
                <Button onClick={handleSignUp} isLoading={loading}>
                    Sign Up
                </Button>
            </VStack>
        </Box>
    );
};

export default SignUp;
