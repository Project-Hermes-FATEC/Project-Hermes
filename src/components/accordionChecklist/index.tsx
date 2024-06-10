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
    Box,
    Button,
    Select,
    FormLabel,
    FormControl,
    Divider,
    Badge,
    Textarea,
} from '@chakra-ui/react'

interface Props {
    content: Array<ChecklistProps>
    refreshChecklist(): void
}

export default function AccordionChecklist({ content, refreshChecklist }: Props) {
    return (
        <Flex
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Container minH={'full'} minW={'full'}>
                <Box display="flex"
                    alignItems="center"
                    justifyContent={'space-between'}
                    bgColor={useColorModeValue('green.100', 'green.400')}
                    p={4}>
                    <Text colorScheme='yellow' fontSize='3xl'>Titulo</Text>
                    <Text fontSize='3xl'>Descrição</Text>
                    <Text></Text>
                </Box>
                <Accordion key={'checklistAccordion'} allowToggle minW={'full'} minH={'full'}>
                    {
                        content.map((checklist) => (
                            <AccordionItem key={checklist.id}>
                                <AccordionButton _expanded={{ bg: 'green.300' }}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent={'space-between'}
                                    py={4}>
                                    <Text fontSize="xl">{checklist.title}</Text>
                                    <Text fontSize="xl">{checklist.description}</Text>
                                    <AccordionIcon />
                                </AccordionButton>

                                {checklist.items?.map((item, index) => (
                                    <AccordionPanel pb={4} bgColor={useColorModeValue('yellow.500', 'wheat.600')}>
                                        <Divider />

                                        <Box display={"flex"}>
                                            <FormControl>
                                                <Badge><Text fontSize={'2xl'}>Item {index + 1}</Text></Badge>
                                            </FormControl>
                                            <FormControl>
                                                <FormLabel>Descrição</FormLabel>
                                                <Textarea isReadOnly={true} defaultValue={item.description} bgColor={"white"} width={"lg"} />
                                            </FormControl>
                                        </Box>
                                    </AccordionPanel>
                                ))}
                            </AccordionItem>
                        ))
                    }
                </Accordion>
            </Container>
        </Flex>
    )
}