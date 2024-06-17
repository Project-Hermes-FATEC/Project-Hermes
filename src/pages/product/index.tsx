import {
  Box,
  Button,
  Stack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import Layout from '../../components/defaultLayout/layout'
import CustomListSearch from '../../components/customListSearch'
import { useState } from 'react'
import api from '../helpers/axios'
import { FaPlus } from 'react-icons/fa'
import ModalCreateProduct from '../../components/product/modal'
import ProductItemsCard from '../../components/product/productItemsCard'

function Produto() {
  const [product, setProducts] = useState<ProductProps[]>([]);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const toast = useToast();

  async function loadSales() {
    await api.get('/product', { withCredentials: true }).then(res => {
      if (res.status == 201) {
        setProducts(res.data);
      }
    }).catch(e => {
      toast({ title: "Não foi possível carregar os produtos", status: 'error', id: Date.now() });
      console.log(e);
    })
  };

  return (
    <Layout>
      <ModalCreateProduct isOpen={isOpen} onClose={onClose} loadSales={loadSales} />
      <Box py={6} px={5} width="full" bgColor={"yellow.100"} >
        <Stack spacing={4} width={'100%'} direction={'column'}>
          <CustomListSearch title='Lista de'
            title_sub='Produtos'
            placeHolder='Pesquisar por produtos'
            buttons={[<Button key={'productListButton'} onClick={onOpen} leftIcon={<FaPlus />} background={"green.300"}>Cadastrar novo produto</Button>]} />
          {
            <ProductItemsCard items={product} />
            /* product.map(produc => (
              <Box key={produc.id}>
                <Divider />
                <ItemListaGenerica
                  title={produc.name.toString()}
                  title2={produc.description}
                  checked={true}
                  options={[]} />
              </Box>
            )) */
          }
        </Stack>
      </Box>
    </Layout>
  )
}

export default Produto;
