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
import { useState } from 'react'
import SimpleMenu from '../../menu'
import { useAuth } from '../../../hooks/authProvider'
import api from '../../../pages/helpers/axios'

export default function Header() {
    const [iconImage, setIconImage] = useState<string>();
    const navigate = useNavigate();
    const auth = useAuth();

    const user = auth?.getUser();

    let menuItems = [];
    let adminVerify;

    async function logOut() {
        auth?.logOut();
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
                const blob = {profilePic: new Blob([file], {type: 'text'})}

                api.post('/user/profile', blob)
                .then(() => {
                    localStorage.setItem('profile', imageURL);
                    setIconImage(imageURL);
                })
                .catch(e => {
                    console.log(e);
                });              
            }
        });

        input.click();
    }


    menuItems = [
        {
            title: 'Vendas', items: [
                { value: 'Visualizar', link: '/vendas/listar' },
            ]
        },
        {
            title: 'Produtos', items: [
                { value: 'Visualizar', link: '/produto/listar' },
            ]
        },
        {
            title: 'Checklist', items: [
                { value: 'Visualizar', link: '/checklist/listar' },
            ]
        }
    ];

    if (user?.type === 'admin') {
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
                    !location.pathname.match('/login') &&
                    <Stack
                        justify={'space-between'}
                        direction={'row'}>
                        <HStack spacing={8} alignItems={'center'} mr={5}>
                            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                                <NavLink key={"Pagina inicial"} to={'/home'}><Button colorScheme='green'>{"Pagina inicial"}</Button></NavLink>
                                {adminVerify ?
                                    <Button colorScheme='red' onClick={logOut}>Sair</Button>
                                    :
                                    menuItems.map(item => (
                                        <SimpleMenu items={item.items} title={item.title} link={''} />
                                    ))
                                }
                            </HStack>
                        </HStack>

                        <Menu key={'profileMenu'}>
                            <MenuButton
                                key={'buttonProfileMenu'}
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
                            <MenuList key={"menuListProfile"} alignItems={'center'}>
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
                                    <p>{user?.name}</p>
                                    <p>{user?.email}</p>
                                    <p>{user?.userId}</p>
                                </Box>
                                <br />
                                <MenuDivider />
                                <MenuItem key={'itemMenuLogout'} onClick={logOut}>Sair</MenuItem>
                            </MenuList>
                        </Menu>
                        <Text>{user?.name}</Text>
                    </Stack>
                }
            </Flex>
        </Box>
    )
}
