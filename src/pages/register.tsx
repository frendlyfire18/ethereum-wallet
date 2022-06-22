import React from 'react';
import Main from "../layouts/Main";
import {Box, Center, Heading} from "@chakra-ui/layout";
import InputField from "../components/InputFiled";
import {Button} from "@chakra-ui/button";
import {Form, Formik} from "formik";
import InputTextAreaField from "../components/AreaField";
import Lightwallet from 'eth-lightwallet';
import {generete_adresses} from "../utils/generete_adresses";
import Head from "next/head";

function Register(props) {
    return (
        <Main>
            <Head>
                <title>Добавление кошелька</title>
            </Head>
            <Box sx={{
                background:`url(/register_back) center/cover no-repeat`,
                backgroundAttachment:"fixed"
            }}>
                <Center>
                    <Box my={20} p={10} rounded={"lg"} width={{ base: '100%x', md: '50%' }} bgGradient={[
                        'linear(to-b, blue.100, purple.200)',
                    ]}>
                        <Center>
                            <Heading my={5} color={"white"}>Добавление кошелька</Heading>
                        </Center>
                        <Center width={"100%"} p={10}>
                            <Formik
                                initialValues={{ privateKey: '',password: '', twelveWords:'' }}
                                onSubmit={async (values, actions) => {
                                    actions.setSubmitting(true);
                                    if(values.password.length === 0 || values.password.length < 5){
                                        actions.setErrors({password:"Введите пароль"})
                                        actions.setSubmitting(false);
                                    }else if(values.twelveWords.length < 3){
                                        const new_seed = Lightwallet.keystore.generateRandomSeed();
                                        values.twelveWords = new_seed;
                                        generete_adresses(values,actions);
                                        actions.setSubmitting(false);
                                    }
                                }
                                }
                            >
                                {(props) => (
                                    <Form>
                                        <InputField
                                            placeholder={"Закрытый ключ"}
                                            label={"Закрытый ключ"}
                                            name={"privateKey"}
                                            type={"name"}
                                        />
                                        <InputField
                                            placeholder={"Пароль"}
                                            label={"Пароль"}
                                            name={"password"}
                                            type={"password"}
                                        />
                                        <InputTextAreaField
                                            placeholder={"12 уникальных слов"}
                                            label={"12 уникальных слов"}
                                            name={"twelveWords"}
                                            type={"twelveWords"}
                                        />
                                        <Button
                                            mt={8}
                                            width={"100%"}
                                            colorScheme='twitter'
                                            isLoading={props.isSubmitting}
                                            type='submit'
                                        >
                                            Генерировать кошелек и детали
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

export default Register;