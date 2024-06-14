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
    Box,
    FormLabel,
    FormControl,
    Divider,
    Badge,
    Textarea,
    Button,
} from '@chakra-ui/react'
import { MdOutlineAddCircleOutline } from 'react-icons/md';

interface Props {
    content: Array<ChecklistProps>
    refreshChecklist(): void
}

export default function AccordionChecklist({ content, refreshChecklist }: Props) {
    const accordColor = useColorModeValue('yellow.500', 'wheat.600');
    const addItem = useColorModeValue('green.500', 'green.600');

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
                                <AccordionButton key={'accordionButtonMain'}
                                    _expanded={{ bg: 'green.300' }}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent={'space-between'}
                                    py={4}>
                                    <Text fontSize="xl">{checklist.title}</Text>
                                    <Text fontSize="xl">{checklist.description}</Text>
                                    <AccordionIcon />
                                </AccordionButton>

                                <AccordionPanel bgColor={'green.600'} border={'2px solid'}>
                                    <Accordion allowToggle bgColor={'green.500'}>
                                        <AccordionItem key={checklist.description}>
                                            <AccordionButton key={'accordionButtonChilden'}
                                                _expanded={{ bg: 'green.300' }}
                                                display="flex"
                                                alignItems="center"
                                                justifyContent={'space-between'}
                                                py={4}>
                                                <Text fontSize="xl">Adicionar novo item</Text>
                                                <AccordionIcon as={MdOutlineAddCircleOutline} />
                                            </AccordionButton>
                                            <AccordionPanel key={'createCheckListItem'} pb={4} bgColor={addItem} display={'flex'} justifyContent={'space-between'}>
                                                <Box display={'grid'} justifyContent={'space-between'}>
                                                    <FormControl>
                                                        <Badge><Text fontSize={'2xl'}>Novo item</Text></Badge>
                                                    </FormControl>
                                                    <FormControl>
                                                        <FormLabel>Descrição</FormLabel>
                                                        <Textarea placeholder='Insira a descrição' bgColor={"white"} width={"lg"} />
                                                    </FormControl>                                                   
                                                </Box>
                                                <Button variant={'solid'} colorScheme='yellow'>Adicionar</Button>
                                            </AccordionPanel>
                                        </AccordionItem>
                                    </Accordion>
                                </AccordionPanel>

                                {checklist.items?.map((item, index) => (
                                    <AccordionPanel key={item.id} pb={4} bgColor={accordColor}>
                                        <Divider border='2px solid' color='green' />

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