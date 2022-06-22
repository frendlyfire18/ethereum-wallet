import React, {useEffect, useState} from 'react';
import Main from "../layouts/Main";
import {Box, Center, Text, SimpleGrid, Heading} from "@chakra-ui/layout";
import Link from "next/link";
import {useRouter} from "next/router";
import { AES,enc } from 'crypto-ts';
import {Badge, Button, Divider, Flex, IconButton, Image, Spinner, Stack} from "@chakra-ui/react";
import {MdUpdate} from "react-icons/md";
import {WiTime1} from "react-icons/wi";
import {BiDownArrow, BiUpArrow} from "react-icons/bi";
import {Ri24HoursFill} from "react-icons/ri";
import { UpdateData } from '../utils/update_data';
import Head from "next/head"
import Lightwallet from "eth-lightwallet";
import Web3 from "web3";
import {get_all_trx} from "../utils/get_all_trx";
import {ChevronLeftIcon,ChevronRightIcon} from "@chakra-ui/icons";

function TrxList() {
    const [data,setData] = useState(undefined);
    const [page,setPage] = useState<number>(1);
    const web3 = new Web3("https://eth-goerli.alchemyapi.io/v2/72Yad39rb8gE0A-owPj2t7VpOOb1BXSa");

    useEffect(() => {
        const address = localStorage.getItem("address");
        get_all_trx(address,page,setData)
    },[page])

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

    return(
        <>
            <Box>
                <Heading my={5} color={"white"}>Ваши транзакции</Heading>
                <Heading my={5} color={"white"}>Страница:<Badge fontSize={"25px"} mx={1} colorScheme={"blue"}>{page}</Badge></Heading>
                {
                    data.data.result.length === 0
                    ?
                        <Flex>
                            <IconButton aria-label={"icon button"}  my={5} colorScheme={"blue"} icon={<ChevronLeftIcon/>} onClick={()=>{
                                if(page > 1){
                                    setPage(page-1);
                                }
                            }}/>
                            <Divider/>
                        </Flex>
                    :
                    <Flex>
                        <IconButton aria-label={"icon button"} my={5} colorScheme={"blue"} icon={<ChevronLeftIcon/>} onClick={()=>{
                            if(page > 1){
                                setPage(page-1);
                            }
                        }}/>
                        <Divider/>
                        <IconButton aria-label={"icon button"}  my={5} colorScheme={"blue"} icon={<ChevronRightIcon/>} onClick={()=>{
                            setPage(page+1)
                        }}/>
                    </Flex>
                }
                <Stack>
            {
                data.data.result.map((trx,index)=>(
                    <Box color={"white"} p={5} bg={"blue.400"} rounded={"lg"}>
                        <Flex alignItems={"center"}>
                            <Text><Badge mx={1} colorScheme={"purple"}>{index+1}</Badge>:<Badge mx={1} colorScheme={"blue"}>Кому:</Badge>{trx.to}</Text>
                            <Text><Badge mx={1} colorScheme={"blue"}>От кого:</Badge>{trx.from}</Text>
                            <Text><Badge mx={1} colorScheme={"blue"}>Значение:</Badge>{web3.utils.fromWei(trx.value, 'ether')} ETH</Text>
                        </Flex>
                    </Box>
                ))
            }
                </Stack>
            </Box>
        </>
    )
}

function Wallet() {
    const router = useRouter();
    const [data,setData] = useState({
        data: undefined
    })
    const [address,setAdress] = useState("");
    const [balance,setBalance] = useState("");
    useEffect(() => {
        UpdateData(setData)
        if(typeof window !== "undefined" && localStorage.getItem("balance") && localStorage.getItem("address")){
            setAdress(localStorage.getItem("address"));
            setBalance(localStorage.getItem("balance"))
        }
    },[])
    if((typeof window !== "undefined")&&!(localStorage.getItem("key"))){
        router.push("/login");
        return(
            <Main>
                <Center>
                    <Box my={"250px"}>
                        <Text>Вам необходимо войти в аккаунт <Link href={"/login"}>(Войти)</Link></Text>
                    </Box>
                </Center>
            </Main>
        )
    }
    return (
        <Main>
            <Head>
                <title>Кошелек</title>
            </Head>
            <Box sx={{
                background:`url(/login_back) center/cover no-repeat`,
                backgroundAttachment:"fixed"
            }}>
                <Box p={{base:"10px",md:"70px"}} >
                    <Box p={{base:"5px",md:"35px"}} rounded={"lg"} bgGradient={[
                        'linear(to-b, blue.100,purple.200, blue.300)',
                    ]}>
                        <SimpleGrid columns={[1,null,2]} spacingX={"300px"}>
                            <Box  color={"white"} m={1} p={10} rounded={"lg"} bgGradient={[
                                'linear(to-b, blue.300,purple.400, blue.500)',
                            ]}>
                                <Flex my={5} alignItems={"center"}>
                                    <Flex>
                                        <Image src={data.data?.image.small}/>
                                        <Heading>{balance} ETH</Heading>
                                    </Flex>
                                    <Button onClick={()=>{
                                        router.push("/send_transaction")
                                    }} colorScheme={"purple"} mx={5}>
                                        Отправить эфир
                                    </Button>
                                </Flex>
                                <Divider/>
                                <Box>
                                    <Text py={5}><Badge mx={2} colorScheme={"purple"}>Адрессс : </Badge>{address} </Text>
                                </Box>
                            </Box>
                            <Box m={1} p={5} rounded={"lg"} bgGradient={[
                                'linear(to-b, blue.300,purple.400, blue.500)',
                            ]}>
                                <Flex display={{base:"block",md:"flex"}} my={3} alignItems={"center"}>
                                    <Text color={"white"} fontSize={"36px"} fontWeight={"700"}>{data.data?.name}({data.data?.symbol.toUpperCase()})</Text>
                                    <Image src={data.data?.image.small}/>
                                    <Button onClick={()=>{
                                        UpdateData(setData)
                                    }} colorScheme={"purple"} rightIcon={<MdUpdate/>}>Обновить</Button>
                                </Flex>
                                <Divider my={1}/>
                                <Flex color={"gray.200"} alignItems={"center"}>
                                    <Text mx={1} color={"gray.200"}>Изменения за час</Text>
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
                                <Flex color={"gray.200"} alignItems={"center"}>
                                    <Text mx={2} color={"gray.200"}>Изменения за день</Text>
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
                            </Box>
                        </SimpleGrid>
                        <TrxList/>
                    </Box>
                </Box>
            </Box>
        </Main>
    );
}
/*
*/

export default Wallet;