import {
  Box,
  Button,
  Divider,
  Heading,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
  useColorModeValue,
  Image,
  Input,
  InputLeftElement,
  InputGroup,
  Icon
} from '@chakra-ui/react'
import { FaCheckCircle, FaRegCheckCircle, FaSearch } from 'react-icons/fa'
import Layout from '../../../components/layout'
import trator_img from '../../../assets/produtos/trator_example.png'
import ButtonCustom from '../../../components/button'
import { Link } from 'react-router-dom'

const options = [
  { id: 1, desc: 'Fábrica' },
  { id: 2, desc: 'Transporte' },
  { id: 3, desc: 'Chegada' },
]
interface PackageTierProps {
  title: string
  options: Array<{ id: number; desc: string }>
  typePlan: string
  checked?: boolean
}
const PackageTier = ({ title, options, typePlan, checked = false }: PackageTierProps) => {
  const colorTextLight = checked ? 'green.700' : 'green.600'
  const bgColorLight = checked ? 'green.400' : 'gray.300'

  const colorTextDark = checked ? 'green.700' : 'green.500'
  const bgColorDark = checked ? 'green.400' : 'gray.300'

  return (
    <Stack
      p={3}
      py={3}
      justifyContent={{
        base: 'flex-start',
        md: 'space-around',
      }}
      direction={{
        base: 'column',
        md: 'row',
      }}
      alignItems={{ md: 'center' }}>
      <Heading size={'md'}>{title}</Heading>
      <List spacing={3} textAlign="start">
        {options.map((desc, id) => (
          <ListItem key={desc.id}>
            <ListIcon as={id === 0 ? FaCheckCircle : FaRegCheckCircle} color="green.500" />
            {desc.desc}
          </ListItem>
        ))}
      </List>
      <Heading size={'xl'}>{typePlan}</Heading>
      <Image boxSize='150px' objectFit="contain" src={trator_img} alt="Tractor" />
      <Stack>
        <Link to='/produto/verificarEntrada'>
        <Button
          size="md"
          color={useColorModeValue(colorTextLight, colorTextDark)}
          bgColor={useColorModeValue(bgColorLight, bgColorDark)}>
          Verificar
        </Button>
        </Link>
      </Stack>
    </Stack>
  )
}

function ListaVendas() {
  return (
    <Layout>
      <Box py={6} px={5} width="full">
        <Stack spacing={4} width={'100%'} direction={'column'}>
          <Stack
            p={5}
            alignItems={'center'}
            justifyContent={{
              base: 'flex-start',
              md: 'space-around',
            }}
            direction={{
              base: 'column',
              md: 'row',
            }}>
            <Stack
              width={{
                base: '100%',
                md: '40%',
              }}
              textAlign={'center'}>
              <Heading size={'lg'}>
                Lista de <Text color="green.400">vendas</Text>
              </Heading>
            </Stack>
            <Stack
              width={{
                base: '100%',
                md: '60%',
              }}
              display={'grid'}
              gridTemplateRows={'auto auto'}
              gridTemplateColumns={'auto auto auto auto auto'}
              alignItems={'center'}
              alignContent={'space-between'}>
              <InputGroup>
                <InputLeftElement h={'full'}><Button variant={'ghost'}><Icon as={FaSearch} /></Button></InputLeftElement>
                <Input placeholder='Pesquisar número de venda' colorScheme='green' backgroundColor={'white'} type='text' />
              </InputGroup>
              <ButtonCustom title='Fábrica' />
              <ButtonCustom title='Transporte' />
              <ButtonCustom title='Completo' />
              <ButtonCustom title='Todos' />
            </Stack>
          </Stack>
          <Divider />
          <PackageTier title={'Venda 123132'} typePlan="Trator A" checked={true} options={options} />
          <Divider />
          <PackageTier
            title={'Venda 123132'}
            checked={true}
            typePlan="Trator B"
            options={options}
          />
          <Divider />
          <PackageTier title={'Venda 123132'} typePlan="Trator C" checked={true} options={options} />
        </Stack>
      </Box>
    </Layout>
  )
}

export default ListaVendas
