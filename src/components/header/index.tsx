import {
    Box,
    Flex,
    Text,
    Button,
    Stack,
    useColorModeValue,
    useBreakpointValue,
    Image,
} from '@chakra-ui/react'


import logo_cervo_jd from '../../assets/John-Deere-Logo-Cervo.png'

export default function Header() {
    return (
        <Box>
            <Flex
                bg={useColorModeValue('white', 'gray.800')}
                color={useColorModeValue('gray.60 0', 'white')}
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
            </Flex>
        </Box>
    )
}
