import React, { useState } from 'react';
import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    List,
    ListItem,
    Link,
    VStack,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';

const Sidebar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();

    // State to control the visibility of the menu button
    const [isButtonVisible, setButtonVisible] = useState(true);

    // Function to handle opening the drawer
    const handleOpen = () => {
        onOpen();
        setButtonVisible(false);
    };

    // Function to handle closing the drawer
    const handleClose = () => {
        onClose();
        setButtonVisible(true);
    };

    return (
        <>
            {isButtonVisible && (
                <Button
                    ref={btnRef}
                    colorScheme="teal"
                    onClick={handleOpen}
                    position="fixed"
                    top="1rem"
                    left="1rem"
                    zIndex="2000"
                >
                    <HamburgerIcon />
                </Button>
            )}
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={handleClose}
                finalFocusRef={btnRef}
                returnFocusOnClose={false}
                preserveScrollBarGap
            >
                <DrawerOverlay />
                <DrawerContent
                    bg="rgba(255, 255, 255, 0.1)"
                    backdropFilter="blur(10px)"
                    zIndex="3000"
                    color="white"
                    borderRadius="15px" // Added border radius for softer edges
                    mx="2" // Added margin to the sides to make the border radius visible
                    my="4" // Added margin to the top and bottom to make the border radius visible
                >
                    <DrawerCloseButton onClick={handleClose} />
                    <DrawerHeader>Navigation</DrawerHeader>

                    <DrawerBody>
                        <VStack spacing={4} align="stretch">
                            <Link as={RouterLink} to="/" onClick={handleClose}>
                                Home
                            </Link>
                            <Link as={RouterLink} to="/all" onClick={handleClose}>
                                Shop All
                            </Link>
                            <Accordion allowToggle>
                                <AccordionItem>
                                    <AccordionButton>
                                        <Box flex="1" textAlign="left">
                                            Shop by Category
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                    <AccordionPanel pb={4}>
                                        <List spacing={2}>
                                            <ListItem>
                                                <Link as={RouterLink} to="/category/category1" onClick={handleClose}>
                                                    Category 1
                                                </Link>
                                            </ListItem>
                                            <ListItem>
                                                <Link as={RouterLink} to="/category/category2" onClick={handleClose}>
                                                    Category 2
                                                </Link>
                                            </ListItem>
                                            <ListItem>
                                                <Link as={RouterLink} to="/category/category3" onClick={handleClose}>
                                                    Category 3
                                                </Link>
                                            </ListItem>
                                        </List>
                                    </AccordionPanel>
                                </AccordionItem>
                            </Accordion>
                            <Link as={RouterLink} to="/cart" onClick={handleClose}>
                                View Cart
                            </Link>
                            <Link as={RouterLink} to="/sign-in" onClick={handleClose}>
                                Sign In
                            </Link>
                            <Link as={RouterLink} to="/privacy" onClick={handleClose}>
                                Privacy Info
                            </Link>
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default Sidebar;
