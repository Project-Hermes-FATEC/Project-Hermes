import { Table, Thead, Tr, Th, Tbody, Td, Button, Input } from "@chakra-ui/react";

function TableVerify() {
    return (
        <Table variant="simple">
            <Thead>
                <Tr>
                    <Th>Tarefas / Pontos de Verificação</Th>
                    <Th>Comentários</Th> 
                    <Th>Imagem</Th>
                </Tr>
            </Thead>
            <Tbody>
                <Tr>
                    <Td>Verificar pontos A-C</Td>
                    <Td><Button colorScheme="purple" size="sm">Verificado</Button></Td>
                    <td> <Input type="file"></Input> </td>
                </Tr>
                <Tr>
                    <Td>Verificar pontos D-F</Td>
                    <Td><Button colorScheme="purple" size="sm">Verificado</Button></Td>
                    <td> <Input type="file"></Input> </td>
                </Tr>
                <Tr>
                    <Td>Verificar pontos G-I</Td>
                    <Td><Button colorScheme="purple" size="sm">Verificado</Button></Td>
                    <td> <Input type="file"></Input> </td>
                </Tr>
                <Tr>
                    <Td>Verificar pontos J-L</Td>
                    <Td><Button colorScheme="purple" size="sm">Verificado</Button></Td>
                    <td> <Input type="file"></Input> </td>
                </Tr>
            </Tbody>
        </Table>
    )
}

export default TableVerify