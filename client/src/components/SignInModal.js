import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignInModal = ({ isOpen, onClose, onSwitchToSignUp }) => {
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
            onClose();
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

    const handleSwitchToSignUp = () => {
        onClose();  // Close the Sign In modal
        onSwitchToSignUp();  // Close the Sidebar and navigate to Sign Up
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Sign In</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
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
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="teal" mr={3} onClick={handleSignIn} isLoading={loading}>
                        Sign In
                    </Button>
                    <Button variant="ghost" onClick={onClose}>Cancel</Button>
                </ModalFooter>
                <ModalFooter>
                    <Button variant="link" onClick={handleSwitchToSignUp}>Don't have an account? Sign Up</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default SignInModal;
