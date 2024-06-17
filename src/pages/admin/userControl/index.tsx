import { useState } from "react";
import AccordionUser from "../../../components/acordionUsers";
import CustomListSearch from "../../../components/customListSearch";
import Layout from "../../../components/defaultLayout/layout";
import api from "../../helpers/axios";
import { Box, Button, Stack, useDisclosure, useToast } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import ModalCreateUser from "../../../components/modal/modalUsers";

function ListaUser() {
    const [listUsers, setListUsers] = useState<UserProps[]>([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    async function loadUsers() {
        await api.get('/user/admin', { withCredentials: true }).then( res => {
            if (res.status === 201) {
                const users: UserProps[] = res.data;

                setListUsers(users.filter(user => (user.email != localStorage.getItem("email"))));
            }
        }).catch(e => {
            toast({ title: "Não foi possível carregar", status: 'error', id: Date.now() });
            console.log(e);
        });
    }

    return (
        <Layout>
            <ModalCreateUser isOpen={isOpen} onClose={onClose} loadUsers={loadUsers} />
            <Box py={6} px={5} width="full" bgColor={"green.100"}>
                <Stack spacing={4} width={'100%'} direction={'column'}>
                    <CustomListSearch title='Lista de'
                        title_sub='Usuários'
                        placeHolder='Pesquise por um usuário'
                        buttons={[
                            <Button
                                key={'userListButton'}
                                leftIcon={<FaPlus />}
                                colorScheme='green' onClick={onOpen}>
                                Cadastrar usuário
                            </Button>
                        ]} />
                    <AccordionUser content={listUsers} refreshUser={loadUsers} />
                </Stack>
            </Box>
        </Layout>
    )
}

export default ListaUser;