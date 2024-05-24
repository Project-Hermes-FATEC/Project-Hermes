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

import logo_cervo_jd from '../../assets/icons/John-Deere-Logo-Cervo.png'
import { NavLink } from 'react-router-dom'
import profileImg from '../../assets/members/ArthurSilva.jpg'
import { handleLogout } from '../../functions/auth/logout'
import { PiPencil } from 'react-icons/pi'

interface Props {
    isAuth: boolean
}

export default function Header({ isAuth }: Props) {
    let Links = [{ titulo: '', link: '' }];
    let adminVerify;

    location.pathname.match("/admin/") ? adminVerify = true : adminVerify = false

    if(!adminVerify){
        Links = [{ titulo: 'Página inicial', link: '/home' },
        { titulo: 'Listar vendas', link: '/vendas/listar' },
        { titulo: 'Registar venda', link: '/vendas/cadastrar' }];
    }

    const userName = localStorage.getItem("name");

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
                                    {adminVerify ? 
                                    <Button colorScheme='red' onClick={handleLogout}>Sair</Button>
                                    :
                                    Links.map((link) => (
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
                                            src={profileImg}> 
                                        <AvatarBadge as={IconButton}
                                        size="md"
                                        rounded="full"
                                        top="-10px"
                                        colorScheme="gray"
                                        border={"black solid 2px"}
                                        aria-label="remove Image" 
                                        icon={<PiPencil />} /> </Avatar>
                                    </Center>
                                    <br />
                                    <Center>
                                        <p>{userName}</p>
                                    </Center>
                                    <br />
                                    <MenuDivider />
                                    <MenuItem onClick={handleLogout}>Sair</MenuItem>
                                </MenuList>
                            </Menu>
                            <Text>{userName}</Text>
                        </Stack>
                }
            </Flex>
        </Box>
    )
}
