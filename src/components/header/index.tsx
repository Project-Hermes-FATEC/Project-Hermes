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
    Avatar
} from '@chakra-ui/react'

import logo_cervo_jd from '../../assets/John-Deere-Logo-Cervo.png'
import { NavLink, useLocation } from 'react-router-dom'

const Links = [{ titulo: 'Página inicial', link: '/home' },
{ titulo: 'Listar vendas', link: '/produto/listaVendas' },
{ titulo: 'Registar venda', link: '/produto/verificarEntrada' }];

function fakeAuth(){
    if(useLocation().pathname.match('login')){
        return false;
    } else {
        return true;
    }
}

export default function Header() {
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
                    fakeAuth() ?
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

                            <Avatar
                                size={'sm'}
                                src={
                                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                                }
                            />
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
