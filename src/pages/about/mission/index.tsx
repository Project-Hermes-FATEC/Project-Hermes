import { Box, Button, Flex, Heading, Text, Tooltip, VStack, useColorModeValue } from "@chakra-ui/react";
import Layout from "../../../components/defaultLayout/layout";
import { Link } from "react-router-dom";

export default function Mission() {
    return (
        <Layout>
            <Flex direction="column"
                alignItems="center"
                justifyContent="center"
                minHeight="calc(100vh - 108px)">
                <Heading marginBottom={5}>Missão, Visão e Objetivo Hermes</Heading>

                <Box rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={4}
                    marginBottom={8}
                    marginLeft={4}
                    marginRight={4}>
                    <Heading>Missão</Heading>
                    <Text>Desenvolver e implementar o sistema HERMES para otimizar o processo de vendas de maquinários da John Deere, assegurando a qualidade dos produtos desde a inspeção inicial até a entrega final em seus respectivos destinos.</Text>
                </Box>

                <Box rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={4}
                    marginBottom={8}
                    marginLeft={4}
                    marginRight={4}>
                    <Heading>Visão</Heading>
                    <Text>Ser reconhecido como um sistema inovador e essencial na gestão de qualidade de maquinários, utilizando tecnologias avançadas como JavaScript, TypeScript, HTML, CSS e integração com banco de dados para proporcionar eficiência e confiabilidade.</Text>
                </Box>

                <Box rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={4}
                    marginBottom={8}
                    marginLeft={4}
                    marginRight={4}>
                    <Heading>Objetivo</Heading>
                    <Text>Criar um ambiente digital seguro e integrado, que inclui o uso do data logger MSR 175 PLUS para monitorar e registrar dados durante o transporte, facilitando a identificação rápida e precisa das causas de eventuais danos aos maquinários, garantindo assim a satisfação dos clientes e a reputação de excelência da John Deere no mercado.</Text>
                </Box>
                <VStack spacing={4} align="stretch">
                <Tooltip hasArrow label="Voltar para Sobre" bg="green.600" placement='right' fontSize='medium'>
                <Link to={'/sobre'}>
                <Button bg="yellow.400" color="black" _hover={{ bg: 'yellow.500' }}>Voltar</Button>
                </Link>
                </Tooltip>
                </VStack>
            </Flex>
        </Layout>
    )
}

