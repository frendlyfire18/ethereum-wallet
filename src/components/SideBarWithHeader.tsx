import React, {Dispatch, ReactNode, SetStateAction, useEffect, useState} from 'react';
import {
    IconButton,
    Avatar,
    Box,
    CloseButton,
    Flex,
    HStack,
    VStack,
    Icon,
    Center,
    useColorModeValue,
    Link,
    Image,
    Drawer,
    DrawerContent,
    Text,
    useDisclosure,
    BoxProps,
    FlexProps,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList, Button,
} from '@chakra-ui/react';
import {MdOutlineAppRegistration,MdOutlineAccountBalanceWallet} from "react-icons/md";
import {
    FiHome,
    FiLogIn,
    FiTrendingUp,
    FiCompass,
    FiStar,
    FiSettings,
    FiMenu,
    FiBell,
    FiChevronDown,
} from 'react-icons/fi';
import {AiOutlineTransaction} from "react-icons/ai"
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import {useRouter} from "next/router";
import { AES,enc } from 'crypto-ts';
import Head from "next/head";
import Lightwallet from "eth-lightwallet";
import Web3 from "web3";
import {motion} from "framer-motion";

interface LinkItemProps {
    name: string;
    icon: IconType;
    link:string;
}
const LinkItems: Array<LinkItemProps> = [
    { name: 'Главная', icon: FiHome,link:"/" },
    { name: 'Ethereum', icon: FiTrendingUp, link:"/about_crypto"},
    { name: 'Кошелек', icon: FiCompass, link:"/wallet" },
    { name: 'Отправить', icon: FiStar, link:"/send_transaction" }
];

export default function SidebarWithHeader({
                                              children,
                                          }: {
    children: ReactNode;
}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isAuth,auth] = useState(false);
    useEffect(() => {
        if(localStorage.getItem("key")){
            auth(true)
        }
    },[(typeof window !== 'undefined')?localStorage.getItem("key"):isAuth])
    return (
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
            <SidebarContent
                onClose={() => onClose}
                display={{ base: 'none', md: 'block' }}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full">
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav isAuth={isAuth} auth={auth} onOpen={onOpen} />
            <Box ml={{ base: 0, md: 60 }}>
                {children}
            </Box>
        </Box>
    );
}

interface SidebarProps extends BoxProps {
    onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
    return (
        <Box
            transition="3s ease"
            bgGradient={[
                'linear(to-b, blue.100, purple.200)',
            ]}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            {...rest}>
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Image mx={10} src={"/logo.png"}/>
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            {LinkItems.map((link) => (
                <NavItem link={link.link} key={link.name} icon={link.icon}>
                    {link.name}
                </NavItem>
            ))}
        </Box>
    );
};

interface NavItemProps extends FlexProps {
    icon: IconType;
    children: ReactText;
    link: string;
}
const NavItem = ({ icon, children,link, ...rest }: NavItemProps) => {
    const router = useRouter();
    return (
        <Link onClick={()=>{
            router.push(link)
        }}style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: 'cyan.400',
                    color: 'white',
                }}
                {...rest}>
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: 'white',
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Link>
    );
};

interface MobileProps extends FlexProps {
    onOpen: () => void;
    isAuth: boolean;
    auth: Dispatch<SetStateAction<boolean>>;
}
const MobileNav = ({ onOpen,isAuth,auth, ...rest }: MobileProps) => {
    const router = useRouter();

    const [address,setAdress] = useState("");
    const [balance,setBalance] = useState("");

    const header_block_variant={
        hidden:{
            opacity:0,
            y:-100
        },
        visible:{
            opacity:1,
            y:0
        }
    }

    useEffect(() => {
        if(typeof window !== "undefined" &&
            localStorage.getItem("key")
        ){

            setBalance(localStorage.getItem("balance"));
            setAdress(localStorage.getItem("address"))
        }
    },[])

    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height="20"
            alignItems="center"
            bgGradient={[
                'linear(to-b, blue.100, purple.200)',
            ]}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent={{ base: 'space-between', md: 'flex-end' }}
            {...rest}>
            <IconButton
                variant='outline' colorScheme={"twitter"}
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
                aria-label="open menu"
                icon={<FiMenu />}
            />

            {isAuth &&
                <motion.div variants={header_block_variant} initial={"hidden"} animate={"visible"}>
                    <HStack spacing={{base: '0', md: '6'}}>
                        <Button
                            onClick={()=>{
                                router.push("/send_transaction")
                            }}
                            size="lg"
                            variant="ghost"
                            aria-label="open menu"
                            leftIcon={<AiOutlineTransaction/>}
                        >
                            Сделать транзакцию
                        </Button>
                        <Flex alignItems={'center'}>
                            <Menu>
                                <MenuButton
                                    py={2}
                                    transition="all 0.3s"
                                    _focus={{boxShadow: 'none'}}>
                                    <HStack>
                                        <Avatar
                                            size={'sm'}
                                            src={
                                                'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                                            }
                                        />
                                        <VStack
                                            display={{base: 'none', md: 'flex'}}
                                            alignItems="flex-start"
                                            spacing="1px"
                                            ml="2">
                                            {
                                                (typeof window !== "undefined" && localStorage.getItem("address"))
                                                    ?
                                                    <Text fontSize="sm">{localStorage.getItem("address").toString()}</Text>
                                                    :
                                                    <Text fontSize="sm">{address}</Text>
                                            }
                                            {
                                                (typeof window !== "undefined" && localStorage.getItem("balance"))
                                                    ?
                                                    <Text fontSize="xs" color="gray.600">{localStorage.getItem("balance").toString()} ETH</Text>
                                                    :
                                                    <Text fontSize="xs" color="gray.600">
                                                        {balance} ETH
                                                    </Text>
                                            }
                                        </VStack>
                                        <Box display={{base: 'none', md: 'flex'}}>
                                            <FiChevronDown/>
                                        </Box>
                                    </HStack>
                                </MenuButton>
                                <MenuList
                                    bg={useColorModeValue('white', 'gray.900')}
                                    borderColor={useColorModeValue('gray.200', 'gray.700')}>
                                    <MenuItem onClick={()=>{
                                        if(typeof window !== "undefined"){
                                            if(localStorage.getItem("key")){
                                                router.push("/wallet")
                                            }
                                        }
                                    }
                                    }>Кошелек</MenuItem>
                                    <MenuDivider/>
                                    <MenuItem onClick={()=>{
                                        if(typeof window !== "undefined"){
                                            localStorage.removeItem("key")
                                            localStorage.removeItem("info")
                                            localStorage.removeItem("address")
                                            localStorage.removeItem("balance")
                                            localStorage.removeItem("private_key")
                                            router.push("/")
                                            auth(false);
                                        }
                                    }
                                    }>Выход</MenuItem>
                                </MenuList>
                            </Menu>
                        </Flex>
                </HStack>
            </motion.div>
            }
            {
                !isAuth&&<HStack spacing={{base: '0', md: '6'}}>
                    <Flex alignItems={'center'}>
                        <IconButton aria-label={"login"} onClick={()=>{
                            router.push("/login");
                        }} variant='outline' colorScheme={"twitter"} mx={5} icon={<FiLogIn/>}/>

                        <IconButton aria-label={"register"} onClick={()=>{
                            router.push("/register");
                        }} variant='outline' colorScheme={"twitter"} mx={5} icon={<MdOutlineAppRegistration/>}/>
                    </Flex>
                </HStack>
            }
        </Flex>
    );
};