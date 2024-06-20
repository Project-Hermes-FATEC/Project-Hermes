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

  async function loadProducts() {
    await api.get('/product', { withCredentials: true }).then(res => {
      if (res.status == 201) {
        const products: ProductProps[] = res.data; 

        setProducts(products.sort((a, b) => { return b.id - a.id }));
      }
    }).catch(e => {
      toast({ title: "Não foi possível carregar os produtos", status: 'error', id: Date.now() });
      console.log(e);
    });
  }

  async function updateItem(id: number, changedItem: ProductProps) {
    if (!id || !changedItem.name && !changedItem.description && !changedItem.checklist && !changedItem.image) return toast({ title: "Nenhum campo alterado!", status: 'error' });

    await api.put(`/product/${id}`, changedItem).then(res => {
      if (res.status == 200) {
        loadProducts();
        return toast({ title: "Produto atualizado com sucesso!", status: 'success' });
      }
    }).catch(e => {
      toast({ title: "Não foi possível atualizar o produto", status: 'error' });
      console.log(e);
    });
  }

  async function removeItem(id: number) {
    if (!id) return toast({ title: "Preencha os campos necessários!", status: 'error' });

    await api.delete(`/product/${id}`).then(res => {
      if (res.status == 200) {
        loadProducts();
        return toast({ title: "Produto deletado com sucesso!", status: 'success' })
      };
    }).catch(e => {
      toast({ title: "Não foi possível deletar o produto", status: 'error' });
      console.log(e);
    });
  }

  return (
    <Layout>
      <ModalCreateProduct isOpen={isOpen} onClose={onClose} loadProducts={loadProducts} />
      <Box py={6} px={5} width="full" bgColor={"yellow.100"} >
        <Stack spacing={4} width={'100%'} direction={'column'}>
          <CustomListSearch title='Lista de'
            title_sub='Produtos'
            placeHolder='Pesquisar por produtos'
            buttons={[<Button key={'productListButton'} onClick={onOpen} leftIcon={<FaPlus />} background={"green.300"}>Cadastrar novo produto</Button>]} />
          {
            <ProductItemsCard items={product} removeItem={removeItem} updateItem={updateItem} />
          }
        </Stack>
      </Box>
    </Layout>
  )
}

export default Produto;
