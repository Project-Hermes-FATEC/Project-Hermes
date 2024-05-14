import {
    Box,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'

export default function Footer() {
    return (
        <Box
            minH={'50px'}
            bg={useColorModeValue('gray.50', 'gray.900')}
            color={useColorModeValue('gray.700', 'gray.200')}
            maxW={'100%'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}>
            <Text
                width={'100%'}
                fontFamily={'Jockey One'}
                fontSize={'15px'}>
                © 2024 FATEC Indaiatuba. Todos os direitos reservados
            </Text>
        </Box>
    )
}