import React from 'react';
import Main from "../layouts/Main";
import {Box, Center, Heading, Stack,Text} from "@chakra-ui/layout";
import InputField from "../components/InputFiled";
import {Button} from "@chakra-ui/button";
import {Form, Formik} from "formik";
import InputTextAreaField from "../components/AreaField";
import {useRouter} from "next/router";
import Link from "next/link";
import Head from "next/head";
import Web3 from "web3";
import {send_eth} from "../utils/send_eth";
import {AES, enc} from "crypto-ts";
import sleep from "../utils/sleep";
import Get_data from "../utils/login";

function SendTransaction(props) {
    const router = useRouter();
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
            <Box sx={{
                background:`url(/send_back) center/cover no-repeat`,
                backgroundAttachment:"fixed"
            }}>
                <Center>
                    <Box my={20} p={10} rounded={"lg"} width={{ base: '100%x', md: '50%' }} bgGradient={[
                        'linear(to-b, blue.100, purple.200)',
                    ]}>
                        <Head>
                            <title>Отправить эфир</title>
                        </Head>
                        <Center>
                            <Heading my={5} color={"white"}>Отправить эфир</Heading>
                        </Center>
                        {
                            (typeof window !== "undefined")
                            &&
                            <Center width={"100%"} p={10}>
                                <Formik
                                    initialValues={{ from: localStorage.getItem("address"), to:'', ether:'' }}
                                    onSubmit={async (values, actions) => {
                                        console.log(values);
                                        const phrase = AES.decrypt(localStorage.getItem("key"),"test").toString(enc.Utf8).slice(
                                            0,
                                            AES.decrypt(localStorage.getItem("key"),"test").toString(enc.Utf8).indexOf("|")
                                        );
                                        const password = AES.decrypt(localStorage.getItem("key"),"test").toString(enc.Utf8).slice(
                                            AES.decrypt(localStorage.getItem("key"),"test").toString(enc.Utf8).indexOf("|")+1,
                                            AES.decrypt(localStorage.getItem("key"),"test").toString(enc.Utf8).length
                                        );
                                        const privateKey = localStorage.getItem("private_key");

                                        const info = {
                                            privateKey: privateKey,
                                            password: password,
                                            twelveWords: phrase,
                                            from:values.from,
                                            to:values.to,
                                            ether:values.ether
                                        }
                                        send_eth(info,actions);
                                        await sleep(15300);
                                        Get_data();
                                        await sleep(2600);
                                        router.push("/")
                                    }
                                    }
                                >
                                    {(props) => (
                                        <Form>
                                            <InputField
                                                placeholder={"От"}
                                                label={"От"}
                                                isDisabled={true}
                                                add_label={"Ваш текуший адресс"}
                                                name={"from"}
                                                type={"text"}
                                            />
                                            <InputField
                                                placeholder={"Кому"}
                                                label={"Кому"}
                                                add_label={"Адресс получателя"}
                                                name={"to"}
                                                type={"text"}
                                            />
                                            <InputField
                                                placeholder={"Эфир"}
                                                label={"Эфир"}
                                                add_label={"Не меньше нуля"}
                                                name={"ether"}
                                                isDisabled={(Number(localStorage.getItem("balance")) === 0)?true:false}
                                                warning={(Number(localStorage.getItem("balance")) === 0)&&"У вас нету на счете эфира"}
                                                type={"ether"}

                                            />
                                            <InputTextAreaField
                                                placeholder={"Описание"}
                                                label={"Описание"}
                                                name={"desc"}
                                                type={"desc"}
                                            />
                                            <Button
                                                onClick={async ()=>{
                                                    const web3 = new Web3("https://eth-mainnet.alchemyapi.io/v2/72Yad39rb8gE0A-owPj2t7VpOOb1BXSa");
                                                }}
                                                mt={8}
                                                width={"100%"}
                                                colorScheme='twitter'
                                                isLoading={props.isSubmitting}
                                                type='submit'
                                            >
                                                Отправить
                                            </Button>
                                        </Form>
                                    )}
                                </Formik>
                            </Center>
                        }
                    </Box>
                </Center>
            </Box>
        </Main>
    );
}

export default SendTransaction;