import { Box, Button, Flex, Heading, VStack, Text, useColorModeValue, Tooltip, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Layout from "../../components/defaultLayout/layout";
import Anneteste from "../../assets/members/Anneteste.jpg"
import CarlosFiori from "../../assets/members/CarlosFiori.jpg"
import ArthurSilva from "../../assets/members/ArthurSilva.jpg"
import MaiconBruno from "../../assets/members/MaiconBruno.jpg"
import ThiagoNogueira from "../../assets/members/ThiagoNogueira.jpg"

export default function Sobre() {
  return (
    <Layout>
      <Flex direction="column"
            alignItems="center"
            justifyContent="center"
            minHeight="calc(100vh - 108px)">
        <Heading textColor='yellow' marginBottom={5}>Equipe Hermes</Heading>
        <Box rounded={'lg'}
             bg={useColorModeValue('white', 'gray.700')}
             boxShadow={'lg'}
             p={4}
             marginBottom={8}>
          {/* Lista de membros da equipe */}
          {[
            { name: "Arthur Gonçalves Silva", image: ArthurSilva },
            { name: "Carlos Eduardo Fiori dos Santos", image: CarlosFiori },
            { name: "Anne Caroline dos Santos", image: Anneteste },
            { name: "Thiago Nogueira", image: ThiagoNogueira },
            { name: "Maicon Bruno Oliveira", image: MaiconBruno }
          ].map((member, index) => (
            <Flex key={index} align="center" marginBottom={4}>
              <Image src={member.image} borderRadius='full' boxSize='80px' marginRight={4} objectFit="contain" />
              <Text fontSize="large">{member.name}</Text>
            </Flex>
          ))}
          <VStack spacing={4} align="stretch" marginTop={5}>
            <Tooltip hasArrow label="Voltar para a página inicial" bg="green.400" placement='right' fontSize='medium'>
              <Link to={'/Home'}>
                <Button bg="yellow.400" color="black" _hover={{ bg: 'yellow.500' }} width="100%">Voltar</Button>
              </Link>
            </Tooltip>
          </VStack>
        </Box>
      </Flex>
    </Layout>
  );
}
