import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    Flex,
    useColorModeValue,
    Text,
    Container,
    AccordionIcon,
    Input,
    Box,
    Button,
    Select,
    FormLabel,
    FormControl,
} from '@chakra-ui/react'
import { useState } from 'react'
import toastHandle from '../toast';
import api from '../../pages/helpers/axios';

interface Props {
    content: Array<UserProps>
    refreshUser() : void
}

export default function Acordion({ content, refreshUser }: Props) {
    const [user, setUser] = useState<UserProps>();
    const toast = toastHandle();

    content = content.filter(user => (user.email !== localStorage.getItem("email")));

    function updateUser(id: number) {
        if (!user) return toast({ title: "Preencha pelo menos um campo", status: 'error' });

        api.put(`/user/${id}`, user, {withCredentials: true}).then( res => {
            if(res.status === 200){
                toast({ title: "Informações do usuário atualizadas!", status: 'success'});
            }
        }).catch(e => {
            toast({ title: "Não foi possível atualizar informações", status: 'error'});
        });

        refreshUser();
    }

    function resetPassword(id: number){
        api.get(`/user/resetPass/${id}`, { withCredentials: true }).then(res => {
            if(res.status === 200) toast({ title: "Senha resetada com sucesso!", status: 'success'});
        }).catch(e => {
            toast({ title: "Não foi possível resetar a senha", status: 'error'});
        });

        refreshUser();
    }

    return (
        <Flex
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Container minH={'full'} minW={'full'}>
                <Accordion allowToggle minW={'full'} minH={'full'} rounded="lg">
                    {
                        content.map((user) => (
                            <AccordionItem key={user.id}>
                                <AccordionButton _expanded={{ bg: 'green.300' }} 
                                    onClick={() => { refreshUser();}}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent={'space-between'}
                                    p={4} >
                                    <Text fontSize="md">{user.userId}</Text>
                                    <Text fontSize="md">{user.name}</Text>
                                    <Text fontSize="md">{user.email}</Text>
                                    <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel pb={4} bgColor={useColorModeValue('yellow.500', 'wheat.600')}>
                                    <Box display={"flex"}>
                                        <FormControl>
                                            <FormLabel>E-mail</FormLabel>
                                            <Input defaultValue={user.email} bgColor={"white"} width={"fit-content"} onChange={(e) => setUser({ ...user, email: e.target.value })} colorScheme='green' />
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Telefone</FormLabel>
                                            <Input defaultValue={user.phone} bgColor={"white"} width={"fit-content"} onChange={(e) => setUser({ ...user, phone: e.target.value })} />
                                        </FormControl>
                                        <FormControl maxW={'fit-content'}>
                                            <FormLabel>Permissões do usuário</FormLabel>
                                            <Select background={"white"} defaultValue={user.type || 'User'} onChange={(e) => setUser({ ...user, type: e.target.value })}>
                                                <option>Admin</option>
                                                <option>User</option>
                                            </Select>
                                        </FormControl>
                                    </Box>

                                    <Box m="20px" display="flex" justifyContent="space-around">
                                        <Button onClick={() => resetPassword(user.id)}>Resetar senha</Button>
                                        <Button onClick={() => updateUser(user.id)}>Atualizar</Button>
                                    </Box>
                                </AccordionPanel>
                            </AccordionItem>
                        ))
                    }
                </Accordion>
            </Container>
        </Flex>
    )
}