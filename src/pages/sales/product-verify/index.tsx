import {
    Box,
    Button,
    Center,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    Image,
    Input,
    Select,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';

import trator_img from '../../../assets/trator_example.png'
import Layout from '../../../components/layout';



function VerificaProduto() {
    return (
        <Layout>
            <Box p={5}>
                <Center bg="white" p={5} rounded="md" boxShadow="md">
                    <Grid templateColumns={'1fr 1fr'} templateRows={'auto auto'} width="full">
                        <GridItem rowSpan={1} colSpan={1}>
                            <Image boxSize='500px' objectFit="contain" src={trator_img} alt="Tractor" />
                        </GridItem>
                        <GridItem display={'flex'} flexDirection="column" justifyContent="center" rowSpan={1} colSpan={1}>
                            <FormControl mb={3}>
                                <FormLabel>Nome da máquina</FormLabel>
                                <Select placeholder="Selecione a máquina">
                                    <option value="6150M">6150M</option>
                                </Select>
                            </FormControl>
                            <FormControl mb={3}>
                                <FormLabel>Código da máquina / Serial Number</FormLabel>
                                <Input placeholder="Digite o código" />
                            </FormControl>
                            <FormControl mb={3}>
                                <FormLabel>Código da compra</FormLabel>
                                <Input placeholder="Digite o código de compra" />
                            </FormControl>
                        </GridItem>
                    </Grid>
                </Center>
                <Center mt={5} bg="white" p={5} rounded="md" boxShadow="md">
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Tarefas / Pontos de Verificação</Th>
                                <Th>Comentários</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>Verificar pontos A-C</Td>
                                <Td><Button colorScheme="purple" size="sm">Verificado</Button></Td>
                            </Tr>
                            <Tr>
                                <Td>Verificar pontos D-F</Td>
                                <Td><Button colorScheme="purple" size="sm">Verificado</Button></Td>
                            </Tr>
                            <Tr>
                                <Td>Verificar pontos G-I</Td>
                                <Td><Button colorScheme="purple" size="sm">Verificado</Button></Td>
                            </Tr>
                            <Tr>
                                <Td>Verificar pontos J-L</Td>
                                <Td><Button colorScheme="purple" size="sm">Verificado</Button></Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </Center>
                <Center mt={5}>
                    <Button colorScheme="yellow" size="lg">Emitir resultados</Button>
                </Center>
            </Box>
        </Layout>
    );
};

export default VerificaProduto;
