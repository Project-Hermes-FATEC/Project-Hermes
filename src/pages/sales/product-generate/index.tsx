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
} from '@chakra-ui/react';

import trator_img from '../../../assets/produtos/trator_example.png'
import Layout from '../../../components/layout';
import TableVerify from '../../../components/salesPage/productVerify/tableVerify';

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
                    <TableVerify />
                </Center>
                <Center mt={5}>
                    <Button colorScheme="yellow" size="lg">Gerar</Button>
                </Center>
            </Box>
        </Layout>
    );
};

export default VerificaProduto;
