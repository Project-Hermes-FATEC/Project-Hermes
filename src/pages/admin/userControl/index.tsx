import { useState } from "react";
import Acordion from "../../../components/acordionUsers";
import CustomListSearch from "../../../components/customListSearch";
import Layout from "../../../components/defaultLayout/layout";
import api from "../../helpers/axios";
import { Button, useDisclosure } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import ModalCreateUser from "../../../components/modal/createUserModalComponent";

function ListaUser() {
    const [listUsers, setListUsers] = useState<UserProps[]>([]);
    const { isOpen, onOpen, onClose } = useDisclosure()

    async function loadUsers() {
        const res = await api.get('/user/admin', { withCredentials: true });

        if (res.status === 201) {
            setListUsers(res.data);
        } else {
            alert(res.statusText);
        }
    }

    return (
        <Layout>
            <ModalCreateUser isOpen={isOpen} onClose={onClose} loadUsers={loadUsers} />
            <CustomListSearch title='Lista de'
                title_sub='Usuários'
                placeHolder='Pesquise por um usuário'
                buttons={[
                    <Button 
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