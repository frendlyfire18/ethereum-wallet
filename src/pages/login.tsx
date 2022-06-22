import React from 'react';
import Main from "../layouts/Main";
import {Box, Center, Heading, Stack} from "@chakra-ui/layout";
import InputField from "../components/InputFiled";
import {Button} from "@chakra-ui/button";
import {Form, Formik} from "formik";
import { AES,enc } from 'crypto-ts';
import {useRouter} from "next/router";
import Head from "next/head";
import Get_data from "../utils/login";
import InputTextAreaField from "../components/AreaField";
import Lightwallet from "eth-lightwallet";
import Web3 from "web3";
import sleep from "../utils/sleep";


function checkLogin(loginString:string){
    const pattern = /^[a-zA-Z](.[a-zA-Z0-9_-]*)$/;
    return pattern.test(loginString);
}


//item table soup long force favorite rather tell fetch math travel cousin 46aab97153b14e6cf9cd542314812236e6e3b47571485d05954a00c3d29ef0e0
function Login(props) {
    const router = useRouter();
    return (
        <Main>
            <Box sx={{
                background:`url(/login_back) center/cover no-repeat`,
                backgroundAttachment:"fixed"
            }}>
                <Head>
                    <title>Вход в кошелек</title>
                </Head>
                <Center>
                    <Box my={20} p={10} rounded={"lg"} width={{ base: '100%x', md: '50%' }} bgGradient={[
                        'linear(to-b, blue.100, purple.200)',
                    ]}>
                        <Center>
                            <Heading my={5} color={"white"}>Вход в кошелек</Heading>
                        </Center>
                        <Center width={"100%"} p={10}>
                            <Formik
                                initialValues={{ twelveWords:'',password:'' }}
                                onSubmit={async (values, actions) => {
                                    if(Lightwallet.keystore.isSeedValid(values.twelveWords)){
                                        const encryptedMessage = AES.encrypt(values.twelveWords+"|"+values.password, 'test').toString();
                                        localStorage.setItem("key",encryptedMessage);
                                        await Get_data();
                                        await sleep(2600);
                                        router.push("/")
                                    }else{
                                        actions.setErrors({twelveWords:"Неправильный сид"})
                                    }
                                }
                                    }
                            >
                                {(props) => (
                                    <Form>
                                        <InputTextAreaField
                                            placeholder={"12 уникальных слов"}
                                            label={"12 уникальных слов"}
                                            name={"twelveWords"}
                                            type={"twelveWords"}
                                        />
                                        <InputField
                                            placeholder={"Пароль"}
                                            label={"Пароль"}
                                            add_label={"Любое значение"}
                                            name={"password"}
                                            type={"password"}
                                        />
                                        <Button
                                            mt={8}
                                            width={"100%"}
                                            colorScheme='twitter'
                                            isLoading={props.isSubmitting}
                                            type='submit'
                                        >
                                            Войти
                                        </Button>
                                    </Form>
                                )}
                            </Formik>
                        </Center>
                    </Box>
                </Center>
            </Box>
        </Main>
    );
}

export default Login;