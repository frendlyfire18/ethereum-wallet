import { ReactNode } from 'react';
import {
    Box,
    Container,
    Stack,
    SimpleGrid,
    Text,
    Link,
    Button,
    VisuallyHidden,
    chakra,
    useColorModeValue,
} from '@chakra-ui/react';
import { FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';

const ListHeader = ({ children }: { children: ReactNode }) => {
    return (
        <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
            {children}
        </Text>
    );
};

const SocialButton = ({
                          children,
                          label,
                          href,
                      }: {
    children: ReactNode;
    label: string;
    href: string;
}) => {
    return (
        <chakra.button
            bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
            rounded={'full'}
            w={8}
            h={8}
            cursor={'pointer'}
            as={'a'}
            href={href}
            display={'inline-flex'}
            alignItems={'center'}
            justifyContent={'center'}
            transition={'background 0.3s ease'}
            _hover={{
                bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
            }}>
            <VisuallyHidden>{label}</VisuallyHidden>
            {children}
        </chakra.button>
    );
};

export default function LargeWithAppLinksAndSocial() {
    return (
        <Box
            bgGradient={[
                'linear(to-b, purple.100, blue.200)',
            ]}
            color={useColorModeValue('gray.700', 'gray.200')}>
            <Container as={Stack} maxW={'6xl'} py={10}>
                <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
                    <Stack align={'flex-start'}>
                        <ListHeader>О компании</ListHeader>
                        <Link href={'#'}>О нас</Link>
                        <Link href={'#'}>Блог</Link>
                        <Link href={'#'}>Карьера</Link>
                        <Link href={'#'}>Связь с нами</Link>
                    </Stack>

                    <Stack align={'flex-start'}>
                        <ListHeader>Поддержка</ListHeader>
                        <Link href={'#'}>Центр поддержки</Link>
                        <Link href={'#'}>Центр безопасности</Link>
                        <Link href={'#'}>Руководство для пользователя</Link>
                    </Stack>

                    <Stack align={'flex-start'}>
                        <ListHeader>Права</ListHeader>
                        <Link href={'#'}>Права куки</Link>
                        <Link href={'#'}>Правила конф-ти</Link>
                        <Link href={'#'}>Термины сервиса</Link>
                        <Link href={'#'}>Закон</Link>
                    </Stack>

                    <Stack align={'flex-start'}>
                        <ListHeader>Установить приложение(в разработке)</ListHeader>
                        <Text>-</Text>
                    </Stack>
                </SimpleGrid>
            </Container>

            <Box
                borderTopWidth={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.700')}>
                <Container
                    as={Stack}
                    maxW={'6xl'}
                    py={4}
                    direction={{ base: 'column', md: 'row' }}
                    spacing={4}
                    justify={{ md: 'space-between' }}
                    align={{ md: 'center' }}>
                    <Text>© 2022 EthereumWorlds. Все права защищены</Text>
                    <Stack direction={'row'} spacing={6}>
                        <Button colorScheme={"twitter"}>
                            <FaTwitter />
                        </Button>
                        <Button colorScheme={"red"}>
                            <FaYoutube />
                        </Button>
                        <Button colorScheme={"purple"}>
                            <FaInstagram />
                        </Button>
                    </Stack>
                </Container>
            </Box>
        </Box>
    );
}