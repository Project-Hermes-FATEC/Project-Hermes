import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Text,
  useColorModeValue,
  Image,
} from '@chakra-ui/react'

import farm_bg from '../../assets/farm-background.webp'
import logo from '../../assets/logo.png'
import Layout from '../../components/layout'


export default function Login() {
  return (
    <Layout>
      <Flex
        minH={'calc(100vh - 108px)'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
        bgImg={farm_bg}
        backgroundRepeat={'no-repeat'}
        bgSize={'cover'}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} width={'100%'} py={12} px={6}>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>

            <Stack align={'center'}>
              <Image src={logo} boxSize='100px' />
              <Text fontSize={'lg'} color={'orange.300'}>Hermes</Text>
            </Stack>

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
    </Layout>
  )
}