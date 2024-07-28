import React, { useState, useEffect, useContext } from 'react';
import {
    Box, Button, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton,
    useDisclosure, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon,
    List, ListItem, Link, VStack
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Sidebar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();
    const navigate = useNavigate();
    const [isButtonVisible, setButtonVisible] = useState(true);
    const { token, logout } = useContext(AuthContext);

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
                <DrawerContent bg="rgba(255, 255, 255, 0.1)" zIndex="3000" color="white" borderRadius="15px" mx="2" my="4" backdropFilter="blur(10px)">
                    <DrawerCloseButton onClick={handleClose} />
                    <DrawerHeader>Navigation</DrawerHeader>
                    <DrawerBody>
                        <VStack spacing={4} align="stretch">
                            <Link as={RouterLink} to="/" onClick={handleClose}>Home</Link>
                            <Link as={RouterLink} to="/all" onClick={handleClose}>Shop All</Link>
                            <Accordion allowToggle>
                                <AccordionItem>
                                    <AccordionButton>
                                        <Box flex="1" textAlign="left">Shop by Category</Box>
                                    </AccordionButton>
                                    <AccordionIcon />
                                    <AccordionPanel pb={4}>
                                        <List spacing={2}>
                                            <ListItem><Link as={RouterLink} to="/category/category1" onClick={handleClose}>Category 1</Link></ListItem>
                                            <ListItem><Link as={RouterLink} to="/category/category2" onClick={handleClose}>Category 2</Link></ListItem>
                                            <ListItem><Link as={RouterLink} to="/category/category3" onClick={handleClose}>Category 3</Link></ListItem>
                                        </List>
                                    </AccordionPanel>
                                </AccordionItem>
                            </Accordion>
                            <Link as={RouterLink} to="/cart" onClick={handleClose}>View Cart</Link>
                            {token && <Link as={RouterLink} to="/orders" onClick={handleClose}>View Orders</Link>}
                            {token ? (
                                <Link as={RouterLink} to="/" onClick={handleSignOut}>Sign Out</Link>
                            ) : (
                                <Link as={RouterLink} to="/signin" onClick={handleClose}>Sign In</Link>
                            )}
                            <Link as={RouterLink} to="/privacy" onClick={handleClose}>Privacy Info</Link>
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default Sidebar;
