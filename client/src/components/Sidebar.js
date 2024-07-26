import React from 'react';
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

    return (
        <>
            <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
                <HamburgerIcon />
            </Button>
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Navigation</DrawerHeader>

                    <DrawerBody>
                        <VStack spacing={4} align="stretch">
                            <Link as={RouterLink} to="/" onClick={onClose}>
                                Home
                            </Link>
                            <Link as={RouterLink} to="/shop-all" onClick={onClose}>
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
                                                <Link as={RouterLink} to="/category/category1" onClick={onClose}>
                                                    Category 1
                                                </Link>
                                            </ListItem>
                                            <ListItem>
                                                <Link as={RouterLink} to="/category/category2" onClick={onClose}>
                                                    Category 2
                                                </Link>
                                            </ListItem>
                                            <ListItem>
                                                <Link as={RouterLink} to="/category/category3" onClick={onClose}>
                                                    Category 3
                                                </Link>
                                            </ListItem>
                                        </List>
                                    </AccordionPanel>
                                </AccordionItem>
                            </Accordion>
                            <Link as={RouterLink} to="/cart" onClick={onClose}>
                                View Cart
                            </Link>
                            <Link as={RouterLink} to="/sign-in" onClick={onClose}>
                                Sign In
                            </Link>
                            <Link as={RouterLink} to="/privacy" onClick={onClose}>
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
