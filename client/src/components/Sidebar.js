import React, { useState, useEffect, useContext } from 'react';
import {
    Box, Button, Drawer, DrawerBody, DrawerOverlay, DrawerContent, DrawerCloseButton,
    useDisclosure, List, ListItem, Link, VStack, Text
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Sidebar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();
    const navigate = useNavigate();
    const [isButtonVisible, setButtonVisible] = useState(true);
    const { token, logout } = useContext(AuthContext);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/products/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleOpen = () => {
        onOpen();
        setButtonVisible(false);
    };

    const handleClose = () => {
        onClose();
        setButtonVisible(true);
    };

    const handleSignOut = () => {
        logout();
        navigate('/');
        handleClose();
    };

    return (
        <>
            {isButtonVisible && (
                <Button ref={btnRef} onClick={handleOpen} position="fixed" top="1rem" right="1rem" zIndex="2000" background="none">
                    <HamburgerIcon />
                </Button>
            )}
            <Drawer isOpen={isOpen} placement="right" onClose={handleClose} finalFocusRef={btnRef}>
                <DrawerOverlay />
                <DrawerContent bg="rgba(255, 255, 255, 0.1)" zIndex="3000" color="white" borderRadius="15px" mx="2" my="4" backdropFilter="blur(10px)" minHeight="fit-content">
                    <DrawerCloseButton onClick={handleClose} />
                    <DrawerBody overflowY="auto">
                        <VStack spacing={4} align="stretch">
                            <Link as={RouterLink} to="/" onClick={handleClose}>Home</Link>
                            <Link as={RouterLink} to="/cart" onClick={handleClose}>View Cart</Link>
                            {token && <Link as={RouterLink} to="/orders" onClick={handleClose}>View Orders</Link>}
                            {token ? (
                                <Link as={RouterLink} to="/" onClick={handleSignOut}>Sign Out</Link>
                            ) : (
                                <Link as={RouterLink} to="/signin" onClick={handleClose}>Sign In</Link>
                            )}
                            <Link as={RouterLink} to="/all" onClick={handleClose}>Shop All</Link>
                            <Box flex="1" textAlign="left" textDecoration="underline">Shop By Category</Box>
                            <List spacing={2}>
                                {categories.length > 0 ? (
                                    categories.map((category) => (
                                        <ListItem key={category}>
                                            <Link as={RouterLink} to={`/category/${category}`} onClick={handleClose}>
                                                {category}
                                            </Link>
                                        </ListItem>
                                    ))
                                ) : (
                                    <Text>No categories found</Text>
                                )}
                            </List>
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default Sidebar;
