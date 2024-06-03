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

import logo from '../../assets/icons/logo.png'
import Layout from '../../components/defaultLayout/layout'
import { Form, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import api from '../helpers/axios'
import farmWallpaper from '../../assets/backgrounds/farm-background.webp'
import toastHandle from '../../components/toast'

export default function Login() {
  const navigate = useNavigate();
  const toast = toastHandle();

  const [userData, setUserData] = useState({
    email: "",
    password: ""
  });

  async function handleLogin() {
    if(!userData.email || !userData.password) return toast({ title: 'Preencha todos os campos', status: 'error' });

    await api.post('/auth/login', userData, { withCredentials: true })
      .then((resposta) => {
        if (resposta.status === 200) {
          localStorage.setItem("name", resposta.data.name);
          localStorage.setItem("email", resposta.data.email);
          localStorage.setItem("type", resposta.data.type);

          toast({ title: 'Login efetuado com sucesso!', status: 'success' });

          navigate("/home");
        }
      }).catch((err) => {
        toast({ title: "Email ou senha incorretos!", status: 'error' });
        console.log(err);
      });
  }

  return (
    <Layout>
      <Flex
        bgImage={farmWallpaper}
        backgroundSize={"cover"}
        backgroundRepeat={"no-repeat"}
        minH={'calc(100vh - 108px)'}
        align={'center'}
        justify={'center'}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} width={'100%'} py={12} px={6}>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            <Stack align={'center'}>
              <Image src={logo} boxSize='100px' />
              <Text fontSize={'lg'} color={'orange.300'}>Hermes</Text>
            </Stack>

            <Stack spacing={4}>
              <Form>
                <FormControl id="email">
                  <FormLabel>Email</FormLabel>
                  <Input type="email" required={true} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Senha</FormLabel>
                  <Input type="password" required={true} onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
                </FormControl>
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}>
                    <Checkbox colorScheme='green'>Lembrar de mim</Checkbox>
                    <Text color={'green.400'}>Problemas para entrar?</Text>
                  </Stack>
                  <Stack>
                    <Button
                      bg={'yellow.400'}
                      color={'black'}
                      width={'100%'}
                      _hover={{
                        bg: 'yellow.500'
                      }}
                      onClick={handleLogin}>
                      Entrar
                    </Button>
                  </Stack>
                </Stack>
              </Form>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Layout>
  )
}