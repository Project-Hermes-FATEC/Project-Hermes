import {
  Box,
  Button,
  Divider,
  Stack,
  useDisclosure,
} from '@chakra-ui/react'
import Layout from '../../../components/defaultLayout/layout'
import { ItemListaGenerica } from '../../../components/listaHorizontalGenerica/ItemLista'
import CustomListSearch from '../../../components/customListSearch'
import { useState } from 'react'
import api from '../../helpers/axios'
import toastHandle from '../../../components/toast'
import ModalCreateSales from '../../../components/modal/createSalesModal'
import { FaPlus } from 'react-icons/fa'

const options = [
  { id: 1, desc: 'Fábrica' },
  { id: 2, desc: 'Transporte' },
  { id: 3, desc: 'Chegada' },
]

function ListaVendas() {
  const [sales, setSales] = useState<SalesProps[]>([]);
  const {isOpen, onClose, onOpen} = useDisclosure();
  const toast = toastHandle();

  async function loadSales() {
    await api.get('/sales', { withCredentials: true }).then(res => {
      if (res.status === 200) {
        setSales(res.data);
      }
    }).catch(e => {
      toast({ title: "Não foi possível carregar as vendas", status: 'error' });
      console.log(e);
    })
  };

  return (
    <Layout>
      <ModalCreateSales key={'1223'} isOpen={isOpen} onClose={onClose} loadSales={loadSales} />
      <Box py={6} px={5} width="full" bgColor={"blue.100"} >
        <Stack spacing={4} width={'100%'} direction={'column'}>
          <CustomListSearch title='Lista de' 
          title_sub='Vendas' 
          placeHolder='Pesquisar por vendas' 
          buttons={[<Button key={'salesListButton'} onClick={onOpen} leftIcon={<FaPlus />} background={"green.300"}>Cadastrar venda</Button>]} />
          {
            sales.map(sell => (
              <>
                <Divider />
                <ItemListaGenerica key={sell.id} title={sell.salesNumber.toString()}
                  title2={sell.product?.name}
                  checked={true}
                  options={options} />
              </>
            ))
          }
        </Stack>
      </Box>
    </Layout>
  )
}

export default ListaVendas
