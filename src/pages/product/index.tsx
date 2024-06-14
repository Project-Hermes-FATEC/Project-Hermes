import {
    Box,
    Button,
    Divider,
    Stack,
    useDisclosure,
  } from '@chakra-ui/react'
  import Layout from '../../components/defaultLayout/layout'
  import { ItemListaGenerica } from '../../components/listaHorizontalGenerica/ItemLista'
  import CustomListSearch from '../../components/customListSearch'
  import { useState } from 'react'
  import api from '../helpers/axios'
  import toastHandle from '../../components/toast'
  import { FaPlus } from 'react-icons/fa'
import ModalCreateProduct from '../../components/modal/productModal'
  
  function Produto() {
    const [product, setProducts] = useState<ProductProps[]>([]);
    const {isOpen, onClose, onOpen} = useDisclosure();
    const toast = toastHandle();
  
    async function loadSales() {
      await api.get('/product', { withCredentials: true }).then(res => {
        if (res.status == 201) {
          setProducts(res.data);
        }
      }).catch(e => {
        toast({ title: "Não foi possível carregar os produtos", status: 'error' });
        console.log(e);
      })
    };
  
    return (
      <Layout>
        <ModalCreateProduct isOpen={isOpen} onClose={onClose} loadSales={loadSales} />
        <Box py={6} px={5} width="full" bgColor={"blue.100"} >
          <Stack spacing={4} width={'100%'} direction={'column'}>
            <CustomListSearch title='Lista de' 
            title_sub='Produtos' 
            placeHolder='Pesquisar por produtos' 
            buttons={[<Button key={'productListButton'} onClick={onOpen} leftIcon={<FaPlus />} background={"green.300"}>Cadastrar novo produto</Button>]} />
            {
              product.map(produc => (
                <>
                  <Divider />
                  <ItemListaGenerica key={'itemList'} title={produc.name.toString()}
                    title2={produc.description}
                    checked={true}
                    options={[]} />
                </>
              ))
            }
          </Stack>
        </Box>
      </Layout>
    )
  }
  
  export default Produto;
  