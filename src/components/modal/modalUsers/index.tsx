import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, Select, InputRightElement, InputGroup } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import toastHandle from "../../toast";
import api from "../../../pages/helpers/axios";

interface Props {
    isOpen: boolean
    onClose(): void
    loadUsers(): void
}

function ModalCreateUser({ isOpen, onClose, loadUsers }: Props) {
    const emptyUser = { email: "", name: "", id: 0, type: "", userId: "", phone: "" };
    const [user, setUser] = useState<UserProps>(emptyUser);
    const [password, setPassword] = useState('JohnDeere2023');
    const [show, setShow] = React.useState(false)
    const toast = toastHandle();

    useEffect(() => {loadUsers()}, [isOpen]);

    async function createUser() {
        if (!user.email || !user.name || !user.type || !password || !user.userId) return toast({ title: 'Preencha todos os campos necessários', status: 'error' });

        const newUser = { email: user.email, name: user.name, type: user.type, password: password, phone: user.phone, userId: user.userId};

        await api.post('/user', newUser, { withCredentials: true }).then(res => {
            if (res.status === 201) {
                toast({ title: 'Usuário cadastrado com sucesso!', status: 'success' });
                setUser(emptyUser);
                onClose();
            }
        }).catch(error => {
            toast({ title: 'Erro ao cadastrar usuário!', status: 'error', description: error.response.data.error });
        });
    }

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Cadastrar usuário</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl isRequired={true}> <FormLabel>Nome</FormLabel> <Input placeholder='Nome' onChange={(event) => setUser({ ...user, name: event.target.value })} /> </FormControl>

                        <FormControl isRequired={true} mt={4}> <FormLabel>Email</FormLabel> <Input placeholder='Email' onChange={(event) => setUser({ ...user, email: event.target.value })} /> </FormControl>

                        <FormControl mt={4}> <FormLabel>Senha</FormLabel>
                            <InputGroup>
                                <Input type={ show? "text" : "password" } defaultValue={'JohnDeere123'} placeholder='Senha' onChange={(event) => setPassword(event.target.value)} />
                                <InputRightElement width='4.5rem'>
                                    <Button h='1.75rem' size='sm' onClick={() => { setShow(!show) }}>
                                        {show ? 'Hide' : 'Show'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>

                        <FormControl isRequired={true} mt={4}> <FormLabel>User ID</FormLabel> <Input placeholder='UserId' onChange={(event) => setUser({ ...user, userId: event.target.value })} /> </FormControl>

                        <FormControl mt={4}> <FormLabel>Telefone</FormLabel> <Input placeholder='Telefone' onChange={(event) => setUser({ ...user, phone: event.target.value })} /> </FormControl>

                        <FormControl isRequired={true} mt={4}> <FormLabel>Tipo de usuário</FormLabel>
                            <Select placeholder='Selecione o tipo de usuário' onChange={(event) => setUser({ ...user, type: event.target.value })}>
                                <option>Admin</option>
                                <option>User</option>
                            </Select>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='green' mr={3} onClick={createUser}>
                            Criar
                        </Button>
                        <Button onClick={onClose}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalCreateUser;