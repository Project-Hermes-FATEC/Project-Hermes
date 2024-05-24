import {
  Box,
  Button,
  Divider,
  Heading,
  Stack,
  Text,
  Input,
  InputLeftElement,
  InputGroup,
  Icon
} from '@chakra-ui/react'
import { FaSearch } from 'react-icons/fa'
import Layout from '../../../components/layout'
import ButtonCustom from '../../../components/button'
import { ItemListaGenerica } from '../../../components/listaHorizontalGenerica/ItemLista'
import CustomListSearch from '../../../components/customListSearch'

const options = [
  { id: 1, desc: 'Fábrica' },
  { id: 2, desc: 'Transporte' },
  { id: 3, desc: 'Chegada' },
]

function ListaVendas() {
  return (
    <Layout>
      <Box py={6} px={5} width="full" bgColor={"blue.100"} >
        <Stack spacing={4} width={'100%'} direction={'column'}>
          <CustomListSearch title='Lista de' title_sub='Vendas' placeHolder='Pesquisar por vedas' buttons={['Fábrica', 'Transporte', 'Chegada', 'Todos']} />
          <Divider />
          <ItemListaGenerica title={'Venda 123132'} title2="Trator A" checked={true} options={options} />
          <Divider />
          <ItemListaGenerica title={'Venda 123132'} title2="Trator B" checked={true} options={options} />
          <Divider />
          <ItemListaGenerica title={'Venda 123132'} title2="Trator C" checked={true} options={options} />
        </Stack>
      </Box>
    </Layout>
  )
}

export default ListaVendas
