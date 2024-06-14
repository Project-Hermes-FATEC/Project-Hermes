import { useState } from "react";
import Acordion from "../../../components/acordionUsers";
import CustomListSearch from "../../../components/customListSearch";
import Layout from "../../../components/defaultLayout/layout";
import api from "../../helpers/axios";
import { Button, useDisclosure } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import ModalCreateUser from "../../../components/modal/modalUsers";

function ListaUser() {
    const [listUsers, setListUsers] = useState<UserProps[]>([]);
    const { isOpen, onOpen, onClose } = useDisclosure()

    async function loadUsers() {
        await api.get('/user/admin', { withCredentials: true }).then(res => {
            if (res.status === 201) {
                setListUsers(res.data);
            }
        }).catch(e => {
            console.log(e);
        });
    }

    return (
        <Layout>
            <ModalCreateUser isOpen={isOpen} onClose={onClose} loadUsers={loadUsers} />
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
            {<Acordion content={listUsers} refreshUser={loadUsers} />}
        </Layout>
    )
}

export default ListaUser;