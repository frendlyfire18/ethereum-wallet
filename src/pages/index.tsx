import React from "react";
import Main from "../layouts/Main";
import Head from "next/head"
import {Image, Box, Button, Center, Text, Heading, Badge, Flex, SimpleGrid, Icon, IconButton} from "@chakra-ui/react"
import {AiOutlineWallet} from "react-icons/ai"
import {FiLogIn} from "react-icons/fi";
import {MdOutlineAppRegistration} from "react-icons/md";
import {BsInputCursorText} from "react-icons/bs";
import {FaUserCheck,FaRegKissWinkHeart} from "react-icons/fa";
import {useRouter} from "next/router";
import {motion} from "framer-motion";
import {AES, enc} from "crypto-ts";

const Index = () => {
    const router = useRouter();

    const MainBlockVariants = {
        visible: { opacity: 1,y:0 },
        transition:{
            delay: 1,
            type: "spring", stiffness: 100,
            duration: 2,
        },
        hidden: { opacity: 0, y:"-250px" },
    }
    const IconBlockVariants = {
        visible: { opacity: 1 },
        animation:{
            x:[-20,20],
            y:[0,-30],
            transition:{
                x:{
                    yoyo:Infinity,
                    duration:0.5
                },
                y:{
                    yoyo:Infinity,
                    duration:0.25,
                    ease:"easeOut"
                }
            }
        },
        hidden: { opacity: 0 },
    }
    const textAnimation={
        hidden:{
            x:-100,
            opacity:0
        },
        visible:custom=>({
            opacity:1,
            x:0,
            transition:{delay:custom*0.2},
            type:"spring",
            stiffness:120
        })
    }
    const Header_2_Animation={
        visible:custom=>({
            opacity:1,
            y:0,
            transition:{delay:custom*0.2},
            type:"spring",
            stiffness:120
        }),
        hidden:{
            y:"-100px",
            opacity:0
        }
    }
    return(
        <>
            <Head>
                <title>EthereumWorlds - HD-кошелек для удобной работы.</title>
            </Head>
            <Main>
                <Box sx={{
                    background:`url(/main_image) center/cover no-repeat`,
                    backgroundAttachment:"fixed"
                }}>
                    <Center p={"100px"}>
                        <motion.div variants={MainBlockVariants} initial={"hidden"} whileInView={"visible"} viewport={{amount: 0.2}}>
                            <Box p={{base:"10px",md:"70px"}} rounded={"lg"} bgGradient={[
                                'linear(to-b, yellow.600, yellow.500)',
                            ]}>
                                <Center>
                                    <Heading fontSize={{base:"19px",md:"34px"}} p={5} color={"white"} py={5}><Flex alignItems={"center"}>Спасибо что выбрали EthereumWorlds
                                        <motion.div variants={IconBlockVariants} animate="animation">
                                            <Box mx={5} >
                                                <FaRegKissWinkHeart color={"white"}/>
                                            </Box>
                                        </motion.div>
                                    </Flex>
                                    </Heading>
                                </Center>
                                <Text fontSize={{base:"12px",md:"19px"}} fontWeight={"700"} width={{base:"350px",md:"950px"}} p={5} color={"white"}>
                                    <motion.p variants={textAnimation} custom={1} initial={"hidden"} animate={"visible"}>
                                        Кошелек — это продукт, который позволяет вам управлять своей учетной записью Ethereum.
                                        Он позволяет просматривать баланс счета, отправлять транзакции и многое другое.
                                        Большинство продуктов кошелька позволят вам создать учетную запись Ethereum.
                                    </motion.p>
                                    <br/>
                                    <br/>
                                    <motion.p variants={textAnimation} custom={2} initial={"hidden"} animate={"visible"}>
                                        Таким образом, вам это не нужно, прежде чем загружать кошелек.
                                    </motion.p>
                                    <br/><br/>
                                    <motion.p variants={textAnimation} custom={3} initial={"hidden"} animate={"visible"}>
                                        Типы кошельков Физические аппаратные кошельки, которые позволяют держать вашу криптовалюту в автономном режиме - очень безопасно<br/>
                                        HD-Wallet (Hierarchical Deterministic Wallet, иерархический детерминированный<br/>
                                        кошелек) — это система извлечения адресов и ключей из единственного источника,<br/>
                                        называемого сидом (от англ. seed — семя) <br/>
                                    </motion.p>
                                </Text>
                            </Box>
                            <motion.div variants={textAnimation} custom={3} initial={"hidden"} whileInView={"visible"} viewport={{amount:0.2}}>
                                <Center py={5}>
                                    <Button onClick={()=>{
                                        router.push("/register")
                                    }} fontSize={{base:"12px",md:"22px"}} h={"50px"} rightIcon={<AiOutlineWallet/>} width={{base:"350px",md:"1090px"}} colorScheme={"orange"}>
                                        Добавить кошелек
                                    </Button>
                                </Center>
                            </motion.div>
                        </motion.div>
                    </Center>
                </Box>
                <motion.div variants={Header_2_Animation} initial={"hidden"} whileInView={"visible"} viewport={{amount: 0.2}}>
                    <Box my={20}>
                        <Center>
                            <Heading my={10}><motion.h1 variants={Header_2_Animation} custom={1} initial={"hidden"} animate={"visible"}>Что такое EthereumWorlds ?</motion.h1></Heading>
                        </Center>
                        <Center>
                            <SimpleGrid columns={[1,2,3]} spacingX={"10px"} spacingY={"10px"}>
                                {
                                    [{text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",subtext:"Надежность",image:"/security"},
                                        {text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",subtext:"Быстрая скорость переводов",image:"/main_image"},
                                        {text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",subtext:"Анонимность",image:"/anonymous"}].map(index=>(
                                        <Box>
                                            <Box rounded={"lg"} color={"white"} sx={{
                                                background:`url(${index.image}) center/cover no-repeat`
                                            }} w={{base:"350px",md:"490px"}} h={{base:"200px",md:"490px"}} bg={"gray"}>
                                            </Box>
                                            <Center my={5}>
                                                <Badge color={"white"} rounded={"lg"} bgGradient={[
                                                    'linear(to-b, yellow.500, yellow.600)',
                                                ]}>
                                                    {index.subtext}
                                                </Badge>
                                            </Center>
                                        </Box>
                                    ))
                                }
                            </SimpleGrid>
                        </Center>
                    </Box>
                </motion.div>
                <motion.div variants={Header_2_Animation} initial={"hidden"} whileInView={"visible"} viewport={{amount: 0.2}}>
                    <Box my={20}>
                        <Center>
                            <Heading my={10}>Чем мы отличаемся от других ?</Heading>
                        </Center>
                        <Center>
                            <Box rounded={"lg"}>
                                <Center>
                                    <SimpleGrid columns={[1,2,4]} spacingX={"10px"} spacingY={"10px"}>
                                        {
                                            [{text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",subtext:"Приятный и дружественный интерфейс",image:"/interface"},
                                                {text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",subtext:"Любовь и забота о своих клиентах",image:"/love"},
                                                {text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",subtext:"Быстрая скорость загрузки",image:"/speed"},
                                                {text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",subtext:"Полная анонимность",image:"/anonymous"}].map(index=>(
                                                <Box boxShadow='md' p='6' rounded='md' bgGradient={[
                                                    'linear(to-b, blue.200, purple.400)',
                                                ]}>
                                                    <Center mx={5} my={10}>
                                                        <Image
                                                            borderRadius='full'
                                                            boxSize='275px'
                                                            src={index.image}
                                                        />
                                                    </Center>
                                                    <Center my={5}>
                                                        <Badge color={"white"} rounded={"lg"} bgGradient={[
                                                            'linear(to-b, blue.200, purple.400)',
                                                        ]}>
                                                            {index.subtext}
                                                        </Badge>
                                                    </Center>
                                                </Box>
                                            ))
                                        }
                                    </SimpleGrid>
                                </Center>
                            </Box>
                        </Center>
                    </Box>
                </motion.div>
                <motion.div variants={Header_2_Animation} initial={"hidden"} whileInView={"visible"} viewport={{amount: 0.2}}>
                    <Box my={20}>
                        <Center>
                            <Heading my={10}>Как создать свой кошелек ?</Heading>
                        </Center>
                        <Center>
                            <Box rounded={"lg"}>
                                <Center>
                                    <SimpleGrid columns={[1,2,4]} spacingX={"10px"} spacingY={"10px"}>
                                        {
                                            [{text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",subtext:"Перейти во вкладку создания кошелька",icon:MdOutlineAppRegistration},
                                                {text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",subtext:"Ввести свое имя, пароль и 12 слов",icon:BsInputCursorText},
                                                {text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",subtext:"Войти в свой кошелек",icon:FiLogIn},
                                                {text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",subtext:"Пользоваться",icon:FaUserCheck}].map(index=>(
                                                <Box boxShadow='md' p='6' rounded='md' bgGradient={[
                                                    'linear(to-b, purple.400, purple.800)',
                                                ]}>
                                                    <Center mx={10} my={10}>
                                                        <Box>
                                                            <Icon w={40} h={40} color={"white"} as={index.icon} />
                                                        </Box>
                                                    </Center>
                                                    <Center my={5}>
                                                        <Badge color={"white"} rounded={"lg"} bgGradient={[
                                                            'linear(to-b, blue.400, purple.400)',
                                                        ]}>
                                                            {index.subtext}
                                                        </Badge>
                                                    </Center>
                                                </Box>
                                            ))
                                        }
                                    </SimpleGrid>
                                </Center>
                            </Box>
                        </Center>
                    </Box>
                </motion.div>
                <motion.div variants={textAnimation} custom={2} initial={"hidden"} whileInView={"visible"} viewport={{amount:0.2}}>
                <Center my={10}>
                    <Button onClick={()=>{
                        router.push("/register")
                    }} rightIcon={<FaUserCheck/>} colorScheme={"purple"}>
                        Создать свой кошелек
                    </Button>
                </Center>
                </motion.div>
            </Main>
        </>
    )
}

export default Index
