import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    Flex,
    useColorModeValue,
    Text,
    Container,
    AccordionIcon,
    Input,
    Checkbox,
    Box,
} from '@chakra-ui/react'
import ButtonCustom from '../button'

interface Props {
    content: Array<UserProps>
}

export default function Acordion({ content }: Props) {
    return (
        <Flex
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Container minH={'full'} minW={'full'}>
                <Accordion allowToggle minW={'full'} minH={'full'} rounded="lg">
                    {
                        content.map((user) => (
                            <AccordionItem>
                                <AccordionButton _expanded={{ bg: 'green.100' }}
                                    display="grid"
                                    alignItems="center"
                                    gridTemplateColumns={"25% 25% 25% 25%"}
                                    p={4}>
                                    <Text fontSize="md">{user.userId}</Text>
                                    <Text fontSize="md">{user.name}</Text>
                                    <Text fontSize="md">{user.email}</Text>
                                    <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel pb={4} bgColor={'wheat'}>
                                    <Text display={"flex"} justifyContent={"space-between"}>
                                        <Box p='7px'>
                                            E-mail
                                            <Input defaultValue={user.email} bgColor={"white"} width={"fit-content"} colorScheme='green' />
                                        </Box>
                                        <Box p='3px'>
                                            Telefone
                                            <Input defaultValue={user.phone} bgColor={"white"} width={"fit-content"} />
                                        </Box>
                                        <Checkbox colorScheme='green'>Admin</Checkbox>
                                    </Text>
                                    <Box m="10px" display="flex" justifyContent="space-evenly">
                                        <ButtonCustom title='Atualizar' />
                                        <ButtonCustom title='Excluir' />
                                    </Box>
                                </AccordionPanel>
                            </AccordionItem>
                        ))
                    }
                </Accordion>
            </Container>
        </Flex>
    )
}