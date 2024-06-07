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
    MenuList,
    AvatarBadge,
    IconButton,
} from '@chakra-ui/react'

import logo_cervo_jd from '../../../assets/icons/John-Deere-Logo-Cervo.png'
import { NavLink, useNavigate } from 'react-router-dom'
import { PiPencil } from 'react-icons/pi'
import { useEffect, useState } from 'react'
import api from '../../../pages/helpers/axios'
import toastHandle from '../../toast'
import SimpleMenu from '../../menu'

interface Props {
    isAuth: boolean
}

export default function Header({ isAuth }: Props) {
    const [iconImage, setIconImage] = useState<string>();
    const toast = toastHandle();
    const navigate = useNavigate()

    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    const type = localStorage.getItem("type");;

    let menuItems = [];
    let adminVerify;

    function handleLogout() {
        api.get("/auth/logout", { withCredentials: true }).then(res => {
            if (res.status === 204) {
                localStorage.clear();
                toast({ title: "Você saiu da sua conta", status: "success" });
            }
        }).catch((e) => {
            toast({ title: "Erro ao sair da conta", status: "error" });
        });
        navigate('/');
    }

    function handleUpdateImage() {
        let input = document.createElement('input');

        input.type = 'file';
        input.accept = 'image/*'

        input.addEventListener('change', (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];

            if (file) {
                const imageURL = URL.createObjectURL(file);
                setIconImage(imageURL)
            }
        });

        input.click();
    }

    menuItems = [
        {
            title: 'Vendas', items: [
                { value: 'Listar', link: '/vendas/listar' },
                { value: 'Registar', link: '/vendas/cadastrar' }
            ]
        },
        {
            title: 'Produtos', items: [
                { value: 'Listar', link: '/produto/listar' },
                { value: 'Registar', link: '/produto/cadastrar' }
            ]
        }
    ];

    if (type === 'admin') {
        menuItems.push({ title: 'admin', items: [{ value: 'Usuários', link: '/admin/users' }] });
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
                    isAuth &&
                    <Stack
                        justify={'space-between'}
                        direction={'row'}>
                        <HStack spacing={8} alignItems={'center'} mr={5}>
                            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                                <NavLink key={"Pagina inicial"} to={'/home'}><Button colorScheme='green'>{"Pagina inicial"}</Button></NavLink>
                                {adminVerify ?
                                    <Button colorScheme='red' onClick={handleLogout}>Sair</Button>
                                    :
                                    menuItems.map(item => (
                                        <SimpleMenu items={item.items} title={item.title} link={''} />
                                    ))
                                }
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
                                    src={iconImage}
                                />
                            </MenuButton>
                            <MenuList alignItems={'center'}>
                                <br />
                                <Center>
                                    <Avatar
                                        size={'2xl'}
                                        src={iconImage}>
                                        <AvatarBadge as={IconButton}
                                            size="md"
                                            rounded="full"
                                            top="-10px"
                                            colorScheme="gray"
                                            border={"black solid 2px"}
                                            onClick={handleUpdateImage}
                                            icon={<PiPencil />} /> </Avatar>
                                </Center>
                                <br />
                                <Box display={'grid'} justifyContent={'center'} alignContent={'center'}>
                                    <p>{name}</p>
                                    <p>{email}</p>
                                    <p>{type}</p>
                                </Box>
                                <br />
                                <MenuDivider />
                                <MenuItem onClick={handleLogout}>Sair</MenuItem>
                            </MenuList>
                        </Menu>
                        <Text>{name}</Text>
                    </Stack>
                }
            </Flex>
        </Box>
    )
}
