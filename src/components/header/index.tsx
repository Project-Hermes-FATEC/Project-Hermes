import {
    Box,
    Flex,
    Text,
    Button,
    Stack,
    useColorModeValue,
    useBreakpointValue,
    Image,
    HStack,
    Avatar,
    Menu,
    Center,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList
} from '@chakra-ui/react'

import logo_cervo_jd from '../../assets/icons/John-Deere-Logo-Cervo.png'
import { NavLink, useNavigate } from 'react-router-dom'
import profileImg from '../../assets/members/ArthurSilva.jpg'
import api from '../../pages/helpers/axios'

interface Props {
    isAuth: boolean
}

export default function Header({ isAuth }: Props) {
    const Links = [{ titulo: 'Página inicial', link: '/home' },
    { titulo: 'Listar vendas', link: '/vendas/listar' },
    { titulo: 'Registar venda', link: '/vendas/cadastrar' }];

    const userName = localStorage.getItem("name");
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();

        api.get("/auth/logout", {withCredentials: true}).then((res) => {
            if (res.status === 204) {
                navigate("/", { state: { message: "Você saiu da sua conta", type: "success" } });
            }
        }).catch(() => {
            navigate("/")
        })
    }

    return (
        <Box>
            <Flex
                bg={useColorModeValue('white', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                minH={'50px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}>

                <Flex flex={{ base: 1 }} alignItems={'center'} justify={{ base: 'center', md: 'start' }}>
                    <Box mr={1}>
                        <Image src={logo_cervo_jd} boxSize='40px' />
                    </Box>
                    <Text
                        textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                        fontFamily={'heading'}
                        fontWeight={'bold'}
                        fontSize={'22px'}
                        color={useColorModeValue('orange.300', 'white')}>
                        Hermes
                    </Text>
                </Flex>


                {
                    isAuth ?
                        <Stack
                            justify={'space-between'}
                            direction={'row'}>
                            <HStack spacing={8} alignItems={'center'} mr={5}>
                                <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                                    {Links.map((link) => (
                                        <NavLink key={link.titulo} to={link.link}>{link.titulo}</NavLink>
                                    ))}
                                </HStack>
                            </HStack>

                            <Menu>
                                <MenuButton
                                    as={Button}
                                    rounded={'full'}
                                    variant={'link'}
                                    cursor={'pointer'}
                                    minW={0}>
                                    <Avatar
                                        size={'sm'}
                                        src={profileImg}
                                    />
                                </MenuButton>
                                <MenuList alignItems={'center'}>
                                    <br />
                                    <Center>
                                        <Avatar
                                            size={'2xl'}
                                            src={profileImg}
                                        />
                                    </Center>
                                    <br />
                                    <Center>
                                        <p>{userName}</p>
                                    </Center>
                                    <br />
                                    <MenuDivider />
                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                </MenuList>
                            </Menu>
                            <Text>{userName}</Text>
                        </Stack>

                        :

                        <Stack
                            flex={{ base: 1, md: 0 }}
                            justify={'flex-end'}
                            direction={'row'}
                            spacing={6}>
                            <Button color='black' as={'a'} fontSize={'sm'} fontWeight={400} variant={'link'} href={'#'}>
                                Entrar
                            </Button>
                            <Button
                                as={'a'}
                                display={{ base: 'none', md: 'inline-flex' }}
                                fontSize={'sm'}
                                fontWeight={600}
                                color={'black'}
                                bg={'green.400'}
                                href={'#'}
                                _hover={{
                                    bg: 'green.300',
                                }}>
                                Registrar
                            </Button>
                        </Stack>
                }
            </Flex>
        </Box>
    )
}
