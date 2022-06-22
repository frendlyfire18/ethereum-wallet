import React, {useEffect, useState} from 'react';
import Main from "../layouts/Main";
import axios from "axios";
import {Badge, Box, Button, Center, Divider, Flex, Heading, Image, SimpleGrid, Spinner, Text} from "@chakra-ui/react";
import {BiDownArrow, BiUpArrow} from "react-icons/bi";
import {WiTime1} from "react-icons/wi"
import {MdOutlineLibraryAdd, MdUpdate} from "react-icons/md"
import {AiOutlineInfoCircle} from "react-icons/ai"
import {Ri24HoursFill} from "react-icons/ri"
import Link from "next/link"
import Head from "next/head"
import {API_URL} from "../constants/constants"
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import {UpdateData} from "../utils/update_data";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
import {motion} from "framer-motion";

function Diagramm(){
    const [data,setData] = useState(undefined)
    useEffect(() => {
        axios.get(API_URL+'/coins/ethereum/market_chart?vs_currency=rub&&days=360').then(function (response) {
            // handle success
            setData(response);
        })
    },[])

    if(!data){
        return (
            <Main>
                <Center>
                    <Spinner
                        my={"500px"}
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                    />
                </Center>
            </Main>
        )
    }
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Ethereum',
            },
        },
    };
    const labels = data?.data?.prices.map(pairs=>new Date(pairs[0]).toLocaleDateString())
    const data_diagramm = {
        labels,
        datasets: [
            {
                label: 'Курс Ethereum за год в ₽',
                data: labels.map((value,index) => data.data?.prices[index][1]),
                borderColor: '#4090c5',
                backgroundColor: '#4090c5',
            },
        ],
    };
    return(
        <Box rounded={"lg"} p={10} bgGradient={[
            'linear(to-b, purple.100, gray.200, blue.100)',
        ]}>
            <Line options={options} data={data_diagramm} />
        </Box>
    )
}

function AboutCrypto(props) {
    const [data,setData] = useState(undefined)
    useEffect(() => {
        UpdateData(setData)
    },[])
    const MainBlockVariants = {
        visible: { opacity: 1,x:0 },
        transition:{
            delay: 1,
            type: "spring", stiffness: 100,
            duration: 2,
        },
        hidden: { opacity: 0, x:"-250px" },
    }
    if(!data){
        return (
            <Main>
               <Center>
                   <Spinner
                       my={"500px"}
                       thickness='4px'
                       speed='0.65s'
                       emptyColor='gray.200'
                       color='blue.500'
                       size='xl'
                   />
               </Center>
            </Main>
        )
    }
    return (
        <Main>
            <Head>
                <title>Цена Ethereum,график цен</title>
            </Head>
            <Box sx={{
                background:`url(/eth_back) center no-repeat`,
                backgroundAttachment:"fixed"
            }} rounded={"lg"} p={{base:0,md:10}}>
                <motion.div variants={MainBlockVariants} initial={"hidden"} whileInView={"visible"} viewport={{amount: 0.2}}>
                    <Center>
                        <Box rounded={"lg"} p={10} bgGradient={[
                            'linear(to-b, gray.700, purple.600)',
                        ]}>
                            <SimpleGrid columns={[1,null,2]} spacingX={"500px"}>
                                <Box>
                                    <Flex display={{base:"block",md:"flex"}} my={3} alignItems={"center"}>
                                        <Text color={"white"} fontSize={"36px"} fontWeight={"700"}>{data.data?.name}({data.data?.symbol.toUpperCase()})</Text>
                                        <Image src={data.data?.image.small}/>
                                        <Button onClick={()=>{
                                            UpdateData(setData)
                                        }} colorScheme={"purple"} rightIcon={<MdUpdate/>}>Обновить</Button>
                                    </Flex>
                                    <Divider my={1}/>
                                    <Flex color={"gray.400"} alignItems={"center"}>
                                        <Text mx={1} color={"gray.400"}>Изменения за час</Text>
                                        <WiTime1/>
                                    </Flex>
                                    <Flex display={{base:"block",md:"flex"}}>
                                        <Flex my={3} alignItems={"center"}>
                                            <Text color={"white"} fontSize={"24px"}>${data.data?.market_data.current_price.usd} |</Text>
                                            <Box ml={1} color={"white"}>
                                                {(data.data?.market_data.price_change_percentage_1h_in_currency.usd.toString().indexOf("-") !== -1)?
                                                    <BiDownArrow/>
                                                    :
                                                    <BiUpArrow/>
                                                }
                                            </Box>
                                            <Badge mx={1} colorScheme={(data.data?.market_data.price_change_percentage_1h_in_currency.usd.toString().indexOf("-") !== -1)?
                                                "red"
                                                :
                                                "green"
                                            } fontSize={"18px"}>
                                                {data.data?.market_data.price_change_percentage_1h_in_currency.usd.toString().slice(
                                                    0,
                                                    data.data?.market_data.price_change_percentage_1h_in_currency.usd.toString().indexOf(".")+5)}%
                                            </Badge>
                                        </Flex>
                                        <Flex ml={2} my={3} alignItems={"center"}>
                                            <Text color={"white"} fontSize={"24px"}>{data.data?.market_data.current_price.rub.toString().slice(0,2)}к  ₽ |</Text>
                                            <Box ml={1} color={"white"}>
                                                {(data.data?.market_data.price_change_percentage_1h_in_currency.rub.toString().indexOf("-") !== -1)?
                                                    <BiDownArrow/>
                                                    :
                                                    <BiUpArrow/>
                                                }
                                            </Box>
                                            <Badge mx={1} colorScheme={(data.data?.market_data.price_change_percentage_1h_in_currency.rub.toString().indexOf("-") !== -1)?
                                                "red"
                                                :
                                                "green"
                                            } fontSize={"18px"}>
                                                {data.data?.market_data.price_change_percentage_1h_in_currency.rub.toString().slice(
                                                    0,
                                                    data.data?.market_data.price_change_percentage_1h_in_currency.rub.toString().indexOf(".")+5)}%
                                            </Badge>
                                        </Flex>
                                    </Flex>
                                    <Flex my={3} alignItems={"center"}>
                                        <Text color={"white"} fontSize={"24px"}>{data.data?.market_data.current_price.btc.toString().slice(0,5)} BTC |</Text>
                                        <Box ml={1} color={"white"}>
                                            {(data.data?.market_data.price_change_percentage_1h_in_currency.btc.toString().indexOf("-") !== -1)?
                                                <BiDownArrow/>
                                                :
                                                <BiUpArrow/>
                                            }
                                        </Box>
                                        <Badge mx={1} colorScheme={(data.data?.market_data.price_change_percentage_1h_in_currency.btc.toString().indexOf("-") !== -1)?
                                            "red"
                                            :
                                            "green"
                                        } fontSize={"18px"}>
                                            {data.data?.market_data.price_change_percentage_1h_in_currency.btc.toString().slice(
                                                0,
                                                data.data?.market_data.price_change_percentage_1h_in_currency.btc.toString().indexOf(".")+5)}%
                                        </Badge>
                                    </Flex>
                                    <Divider my={1}/>
                                    <Flex color={"gray.400"} alignItems={"center"}>
                                        <Text mx={2} color={"gray.400"}>Изменения за день</Text>
                                        <Ri24HoursFill/>
                                    </Flex>
                                    <Flex display={{base:"block",md:"flex"}}>
                                        <Flex my={3} alignItems={"center"}>
                                            <Text color={"white"} fontSize={"24px"}>${data.data?.market_data.current_price.usd} |</Text>
                                            <Box ml={1} color={"white"}>
                                                {(data.data?.market_data.price_change_percentage_24h_in_currency.usd.toString().indexOf("-") !== -1)?
                                                    <BiDownArrow/>
                                                    :
                                                    <BiUpArrow/>
                                                }
                                            </Box>
                                            <Badge mx={1} colorScheme={(data.data?.market_data.price_change_percentage_24h_in_currency.usd.toString().indexOf("-") !== -1)?
                                                "red"
                                                :
                                                "green"
                                            } fontSize={"18px"}>
                                                {data.data?.market_data.price_change_percentage_24h_in_currency.usd.toString().slice(
                                                    0,
                                                    data.data?.market_data.price_change_percentage_24h_in_currency.usd.toString().indexOf(".")+5)}%
                                            </Badge>
                                        </Flex>
                                        <Flex ml={2} my={3} alignItems={"center"}>
                                            <Text color={"white"} fontSize={"24px"}>{data.data?.market_data.current_price.rub.toString().slice(0,2)}к  ₽ |</Text>
                                            <Box ml={1} color={"white"}>
                                                {(data.data?.market_data.price_change_percentage_24h_in_currency.rub.toString().indexOf("-") !== -1)?
                                                    <BiDownArrow/>
                                                    :
                                                    <BiUpArrow/>
                                                }
                                            </Box>
                                            <Badge mx={1} colorScheme={(data.data?.market_data.price_change_percentage_24h_in_currency.rub.toString().indexOf("-") !== -1)?
                                                "red"
                                                :
                                                "green"
                                            } fontSize={"18px"}>
                                                {data.data?.market_data.price_change_percentage_24h_in_currency.rub.toString().slice(
                                                    0,
                                                    data.data?.market_data.price_change_percentage_24h_in_currency.rub.toString().indexOf(".")+5)}%
                                            </Badge>
                                        </Flex>
                                    </Flex>
                                    <Flex my={3} alignItems={"center"}>
                                        <Text color={"white"} fontSize={"24px"}>{data.data?.market_data.current_price.btc.toString().slice(0,5)} BTC |</Text>
                                        <Box ml={1} color={"white"}>
                                            {(data.data?.market_data.price_change_percentage_24h_in_currency.btc.toString().indexOf("-") !== -1)?
                                                <BiDownArrow/>
                                                :
                                                <BiUpArrow/>
                                            }
                                        </Box>
                                        <Badge mx={1} colorScheme={(data.data?.market_data.price_change_percentage_24h_in_currency.btc.toString().indexOf("-") !== -1)?
                                            "red"
                                            :
                                            "green"
                                        } fontSize={"18px"}>
                                            {data.data?.market_data.price_change_percentage_24h_in_currency.btc.toString().slice(
                                                0,
                                                data.data?.market_data.price_change_percentage_24h_in_currency.btc.toString().indexOf(".")+5)}%
                                        </Badge>
                                    </Flex>
                                    <Divider my={1}/>
                                    <Flex color={"gray.400"} alignItems={"center"}>
                                        <Text mx={1} color={"gray.400"}>Дополнительная информация</Text>
                                        <MdOutlineLibraryAdd/>
                                    </Flex>
                                    <Flex display={{base:"block",md:"flex"}} alignItems={"center"} my={2}>
                                        <Badge colorScheme={"telegram"}>Market Cap</Badge>
                                        <Text mx={2} color={"white"}>:</Text>
                                        <Flex alignItems={"center"} >
                                            <Badge colorScheme={"telegram"}>{data.data?.market_data.market_cap.rub}₽</Badge>
                                            <Flex alignItems={"center"}  ml={2} color={"white"}>
                                                {(data.data?.market_data.market_cap_change_percentage_24h_in_currency.rub.toString().indexOf("-") !== -1)?
                                                    <BiDownArrow/>
                                                    :
                                                    <BiUpArrow/>
                                                }
                                                <Badge mx={1} colorScheme={(data.data?.market_data.market_cap_change_percentage_24h_in_currency.rub.toString().indexOf("-") !== -1)?
                                                    "red"
                                                    :
                                                    "green"
                                                } fontSize={"18px"}>
                                                    {data.data?.market_data.market_cap_change_percentage_24h_in_currency.rub.toString().slice(
                                                        0,
                                                        data.data?.market_data.market_cap_change_percentage_24h_in_currency.rub.toString().indexOf(".")+5)}%
                                                </Badge>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                    <Flex my={2} alignItems={"center"} >
                                        <Badge colorScheme={"telegram"}>Максимальная цена за 24 часа</Badge>
                                        <Text mx={2} color={"white"}>:</Text>
                                        <Badge fontSize={"14px"} colorScheme={"green"}>{data.data?.market_data.high_24h.rub.toString().slice(0,2)}к ₽</Badge>
                                    </Flex>
                                    <Divider/>
                                    <Box my={3}>
                                        <Flex color={"gray.400"} alignItems={"center"}>
                                            <Text mx={1} color={"gray.400"}>Информация о платформе</Text>
                                            <AiOutlineInfoCircle/>
                                        </Flex>
                                        <Flex my={2}>
                                            <Badge mx={2} colorScheme={"telegram"}>Дата создания :</Badge>
                                            <Badge mx={2} colorScheme={"telegram"}>{data.data?.genesis_date}</Badge>
                                        </Flex>
                                        <Flex my={2}>
                                            <Badge mx={2} colorScheme={"telegram"}>Алгоритм хеширования :</Badge>
                                            <Badge mx={2} colorScheme={"telegram"}>{data.data?.hashing_algorithm}</Badge>
                                        </Flex>
                                    </Box>
                                </Box>
                                <Box>
                                    <Heading color={"white"}>Информация</Heading>
                                    <Flex display={{base:"block",md:"flex"}}>
                                        <Box my={3}>
                                            <Text fontSize={"24px"} color={"white"}>Категории</Text>
                                            <Badge mx={2} colorScheme={"telegram"}>{data.data?.categories[0]}</Badge>
                                        </Box>
                                        <Box my={3}>
                                            <Text fontSize={"24px"} color={"white"}>Блокчейн сайт</Text>
                                            <Badge mx={2} colorScheme={"telegram"}><Link href={data.data?.links.blockchain_site[0]}>{data.data?.links.blockchain_site[0].slice(8,data.data?.links.blockchain_site[0].length-1)}</Link></Badge>
                                            <Badge mx={2} colorScheme={"telegram"}><Link href={data.data?.links.blockchain_site[1]}>{data.data?.links.blockchain_site[1].slice(8,data.data?.links.blockchain_site[0].length-1)}</Link></Badge>
                                        </Box>
                                    </Flex>
                                    <Divider/>
                                    <Box my={3}>
                                        <Text fontSize={"24px"} color={"white"}>GitHub</Text>
                                        <Badge mx={2} colorScheme={"telegram"}><Link href={data.data?.links.repos_url.github[0]}>{data.data?.links.repos_url.github[0].slice(8,data.data?.links.repos_url.github[0].length-1)}</Link></Badge>
                                        <Badge mx={2} colorScheme={"telegram"}><Link href={data.data?.links.repos_url.github[1]}>{data.data?.links.repos_url.github[1].slice(8,data.data?.links.repos_url.github[0].length-1)}</Link></Badge>
                                        <Badge mx={2} colorScheme={"telegram"}><Link href={data.data?.links.repos_url.github[2]}>{data.data?.links.repos_url.github[2].slice(8,data.data?.links.repos_url.github[0].length-1)}</Link></Badge>
                                    </Box>
                                    <Divider/>
                                    <Box>
                                        <Text fontSize={"24px"} color={"white"}>Описание</Text>
                                        <Box my={2} p={5} rounded={"lg"} color={"blue.600"} bg={"blue.200"}>
                                            <Text fontWeight={"500"}>
                                                Ethereum — криптовалюта и платформа для создания децентрализованных онлайн-сервисов на базе блокчейна, работающих на базе умных контрактов.
                                                Реализована как единая децентрализованная виртуальная машина.
                                                Концепт был предложен основателем журнала Bitcoin Magazine Виталиком Бутериным в конце 2013 года, сеть была запущена 30 июля 2015 года.
                                            </Text>
                                        </Box>
                                    </Box>
                                </Box>
                            </SimpleGrid>
                        </Box >
                    </Center>
                </motion.div>
                <Box>
                    <motion.div variants={MainBlockVariants} initial={"hidden"} whileInView={"visible"} viewport={{amount: 0.2}}>
                        <Center my={10}>
                            <Heading color={"white"}>Ethereum(ETH) график цены за год</Heading>
                        </Center>
                        <Diagramm/>
                    </motion.div>
                </Box>
            </Box>
        </Main>
    );
}


export default AboutCrypto;