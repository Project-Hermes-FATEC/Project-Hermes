import { Box, Button, Flex, Heading, Text, Tooltip, VStack, useColorModeValue } from "@chakra-ui/react"
import Layout from "../../components/layout"
import { Link } from 'react-router-dom'

function Home() {
  return (
    <Layout>
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        minHeight="calc(100vh - 108px)">
        <Heading textColor='yellow' marginBottom={10}>Página Inicial</Heading>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Text marginBottom={5} fontSize="large" textAlign="center" color={'black'}>
            Escolha a página desejada para acessar:
          </Text>
          <VStack spacing={4} align="stretch">
          <Tooltip hasArrow label="Verificar vendas, detalhes de venda e acesso aos checklists." bg="green.400" placement='right' fontSize='medium'>
              <Link to={'/vendas/listar'}><Button bg="yellow.400" color="black" _hover={{ bg: 'yellow.500' }} width="100%">Lista de vendas</Button></Link>
            </Tooltip>
            <Tooltip hasArrow label="Inserção de uma nova venda para que ela seja verificada e registrada." bg="green.400" placement='right' fontSize='medium'>
              <Link to={'/vendas/cadastrar'}><Button bg="yellow.400" color="black" _hover={{ bg: 'yellow.500' }} width="100%">Criar verificação</Button></Link>
            </Tooltip>
            <Tooltip hasArrow label="Conhecer os membros responsáveis pelo projeto." bg="green.400" placement='right' fontSize='medium'>
              <Link to={'/Sobre'}><Button bg="yellow.400" color="black" _hover={{ bg: 'yellow.500' }} width="100%">Equipe Hermes</Button></Link>
            </Tooltip>
            <Tooltip hasArrow label="Fazer Logout e voltar a página de Login." bg="green.400" placement='right' fontSize='medium'>
              <Link to="/autenticacao/login"><Button bg="yellow.400" color="black" _hover={{ bg: 'yellow.500' }} width="100%">Sair</Button></Link>
            </Tooltip>
          </VStack>
        </Box>
      </Flex>
    </Layout>
  );
}

export default Home