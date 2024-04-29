import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Image,
} from '@chakra-ui/react'

import farm_bg from '../../assets/farm-background.webp'
import logo from '../../assets/logo.png'


export default function Login() {
  return (
    <Flex 
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
      bgImg={farm_bg}
      backgroundRepeat={'no-repeat'}
      bgSize={'cover'}
      >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} color={'gray.300'}>Faça login no sistema</Heading>
          <Text fontSize={'lg'} color={'yellow.400'}>
            Project Hermes <Image src={logo} boxSize='100px' />
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Senha</FormLabel>
              <Input type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox colorScheme='green'>Lembrar de mim</Checkbox>
                <Text color={'green.400'}>Esqueceu a senha?</Text>
              </Stack>
              <Button
                bg={'yellow.400'}
                color={'black'}
                _hover={{
                  bg: 'yellow.500',
                }}>
                Entrar
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}