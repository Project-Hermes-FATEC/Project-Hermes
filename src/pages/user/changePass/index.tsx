import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Text,
    useColorModeValue,
    useToast,
} from '@chakra-ui/react'
import Layout from '../../../components/defaultLayout/layout'
import { Form } from 'react-router-dom'
import { useRef, useState } from 'react'
import api from '../../helpers/axios'

export default function ChangePass() {
    const toast = useToast();
    const [loginLoading, setLoginLoading] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const [userData, setUserData] = useState({
        oldpass: "",
        newpass: ""
    });

    async function changePass() {
        if (!userData.newpass || !userData.oldpass) return toast({ title: 'Preencha todos os campos obrigatórios', status: 'error' });
        if (userData.newpass == userData.oldpass) return toast({ title: 'As senhas devem ser diferentes', status: 'error' });

        setLoginLoading(true);

        await api.post('/user/changePass', userData)
            .then((res) => {
                if (res.status === 200) {
                    setUserData({ oldpass: '', newpass: '' });
                    formRef.current?.reset();
                    toast({ title: 'Senha alterada com sucesso!', status: 'success' });
                }
            }).catch((error) => {
                if (error.response.data.error.match('Senha antiga está incorreta')) {
                    toast({ title: "A senha antiga está incorreta", status: 'error' })
                } else {
                    toast({ title: "Erro ao tentar alterar a senha", status: 'error' });
                }
            }).finally(() => {
                setLoginLoading(false);
            });
    }

    return (
        <Layout>
            <Flex
                minH={'calc(100vh - 108px)'}
                align={'center'}
                justify={'center'}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} width={'100%'} py={12} px={6}>
                    <Text
                        bgGradient='linear(to-r, green.400, yellow.500)'
                        bgClip='text'
                        fontSize='6xl'
                        fontWeight='extrabold'>
                        ChangePass
                    </Text>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>

                        <Form ref={formRef}>
                            <Stack spacing={6}>
                                <FormControl isRequired id="oldpassword">
                                    <FormLabel>Senha antiga</FormLabel>
                                    <Input type="password" defaultValue={''} onChange={(e) => setUserData({ ...userData, oldpass: e.target.value })} />
                                </FormControl>
                                <FormControl isRequired id="newpassword">
                                    <FormLabel>Senha nova</FormLabel>
                                    <Input type="password" defaultValue={''} onChange={(e) => setUserData({ ...userData, newpass: e.target.value })} />
                                </FormControl>
                                <Stack spacing={10}>
                                    <Stack>
                                        <Button
                                            isLoading={loginLoading}
                                            bg={'yellow.400'}
                                            color={'black'}
                                            width={'100%'}
                                            _hover={{
                                                bg: 'yellow.500'
                                            }}
                                            onClick={changePass}>
                                            Alterar Senha
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Form>
                    </Box>
                </Stack>
            </Flex>
        </Layout>
    )
}