import Acordion from "../../components/acordionUsers";
import CustomListSearch from "../../components/customListSearch";
import Layout from "../../components/layout";

function ListaUser() {

    const users = [ { userId: 'ABC123', name: 'Carlos', email: 'carlos@email'},
                    { userId: 'DEF456', name: 'Arthur', email: 'arthur@email'},
                    { userId: 'ADA232', name: 'Bruno', email: 'bruno@email', telefone: ['1233124']},
                    { userId: 'ARH312', name: 'Wendel', email: 'wendel@email'}, 
                ];

    return (
        <Layout>
            <CustomListSearch  title='Lista de' title_sub='Usuários' placeHolder='Pesquise por um usuário' />
            <Acordion content={users} />
        </Layout>
    )
}

export default ListaUser;