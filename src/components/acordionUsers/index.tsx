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
    useToast,
    Heading,
    Stack,
    Switch
} from '@chakra-ui/react'
import { useState } from 'react'
import api from '../../pages/helpers/axios';
import { Form } from 'react-router-dom';

interface Props {
    content: Array<UserProps>
    refreshUser(): void
}

export default function AccordionUser({ content, refreshUser }: Props) {
    const emptyUser: UserProps = { email: '', id: 0, name: '', type: '', phone: '', userId: '' }
    const [userEdit, setUserEdit] = useState<UserProps>(emptyUser);
    const [isEdit, setIsEdit] = useState(false);
    const toast = useToast();
    const accordPanelColor = useColorModeValue('green.200', 'wheat.200');

    async function updateUser(id: number) {
        if (!userEdit.email && !userEdit.phone && !userEdit.type) return toast({ title: "Preencha pelo menos um campo", status: 'error' });

        await api.put(`/user/${id}`, userEdit, { withCredentials: true }).then(res => {
            if (res.status == 200) {
                refreshUser();
                setUserEdit(emptyUser);
                setIsEdit(!isEdit);
                toast({ title: "Informações do usuário atualizadas!", status: 'success' });
            }
        }).catch(e => {
            toast({ title: "Não foi possível atualizar informações", status: 'error' });
            console.log(e);
        });
    }

    async function resetPassword(id: number) {
        await api.get(`/user/resetPass/${id}`, { withCredentials: true }).then(res => {
            if (res.status === 200) toast({ title: "Senha resetada com sucesso!", status: 'success' });
        }).catch(e => {
            toast({ title: "Não foi possível resetar a senha", status: 'error' });
            console.log(e);
        });
    }

    return (
        <Flex
            align={'center'}
            justify={'center'}
            bg={'green.800'}
            borderRadius={'5px'}>
            <Container minH={'full'} minW={'full'}>
                <Accordion key={'userAccordion'} bg={useColorModeValue('gray.50', 'gray.800')} allowToggle minW={'full'} minH={'full'}>
                    {
                        content.length >= 1 ?
                            <>
                                <AccordionItem bgColor='gray.400'>
                                    <AccordionButton pointerEvents={'none'} display='grid' gridTemplateColumns={'1fr 1fr 1fr auto'} justifyContent='space-between'>
                                        <Heading>User ID</Heading>
                                        <Heading>Nome</Heading>
                                        <Heading>E-mail</Heading>
                                    </AccordionButton>
                                </AccordionItem>
                                {content.map((user) => (
                                    <AccordionItem key={user.id}>
                                        <AccordionButton pointerEvents={!isEdit ? 'auto' : 'none'} key={'accordionButtonMain'}
                                            _expanded={{ bg: 'green.500' }}
                                            onClick={() => { setIsEdit(false) }}
                                            display="grid"
                                            alignItems="center"
                                            gridTemplateColumns={'1fr 1fr 1fr auto'}
                                            py={4} >
                                            <Text fontSize="md">{user.userId}</Text>
                                            <Text fontSize="md">{user.name}</Text>
                                            <Text fontSize="md">{user.email}</Text>
                                            <AccordionIcon />
                                        </AccordionButton>
                                        <AccordionPanel pb={4} bgColor={accordPanelColor}>
                                            <Form id={user.id.toString()}>
                                                <Box display={"flex"}>
                                                    <FormControl isDisabled pointerEvents={isEdit ? 'auto' : 'none'}>
                                                        <FormLabel>Nome</FormLabel>
                                                        <Input defaultValue={user.name} bgColor={"white"} width={"fit-content"} colorScheme='green' />
                                                    </FormControl>
                                                    <FormControl isDisabled pointerEvents={isEdit ? 'auto' : 'none'}>
                                                        <FormLabel>User ID</FormLabel>
                                                        <Input defaultValue={user.userId} bgColor={"white"} width={"fit-content"} colorScheme='green' />
                                                    </FormControl>
                                                    <FormControl isDisabled={isEdit ? false : true} pointerEvents={isEdit ? 'auto' : 'none'}>
                                                        <FormLabel>E-mail</FormLabel>
                                                        <Input defaultValue={user.email} bgColor={"white"} width={"fit-content"} onChange={(e) => setUserEdit({ ...userEdit, email: e.target.value })} colorScheme='green' />
                                                    </FormControl>
                                                    <FormControl isDisabled={isEdit ? false : true} pointerEvents={isEdit ? 'auto' : 'none'}>
                                                        <FormLabel>Telefone</FormLabel>
                                                        <Input defaultValue={user.phone} bgColor={"white"} width={"fit-content"} onChange={(e) => setUserEdit({ ...userEdit, phone: e.target.value })} />
                                                    </FormControl>
                                                    <FormControl isDisabled={isEdit ? false : true} pointerEvents={isEdit ? 'auto' : 'none'} >
                                                        <FormLabel>Permissões do usuário</FormLabel>
                                                        <Select value={userEdit.type ? userEdit.type : user.type} background={"white"} onChange={(e) => {setUserEdit({ ...userEdit, type: e.target.value })}}>
                                                            {['admin', 'user'].sort((a) => a > user.type ? 1 : -1).map(item => (
                                                                <option key={item} value={item}>{item}</option>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </Box>
                                                <Box m="20px" display="flex" justifyContent="space-around">
                                                    <Button colorScheme='red' onClick={() => resetPassword(user.id)}>Resetar Senha</Button>
                                                    <Stack spacing={3} flexDirection='row'>
                                                        <Button colorScheme={isEdit ? 'green' : 'blue'} onClick={() => { isEdit ? updateUser(user.id) : setIsEdit(!isEdit) }}>{isEdit ? 'Salvar' : 'Atualizar'}</Button>
                                                        <Button visibility={isEdit ? 'visible' : 'collapse'} type='reset' colorScheme='red' onClick={() => { setIsEdit(false); setUserEdit(emptyUser) }}>Cancelar</Button>
                                                    </Stack>
                                                </Box>
                                            </Form>
                                        </AccordionPanel>
                                    </AccordionItem>
                                ))}
                            </>

                            :

                            <Text fontSize={'4xl'} fontWeight={'bold'} textAlign={'center'}>Não há usuários cadastrados</Text>
                    }
                </Accordion>
            </Container>
        </Flex>
    )
}