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
    Badge,
    Textarea,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    useToast,
    useDisclosure,
} from '@chakra-ui/react'
import { useState } from 'react';
import api from '../../../pages/helpers/axios';
import CheckListItems from '../checklistItems';
import { FaPlus } from 'react-icons/fa';
import AlertDialogCustom from '../../alertDialog';

interface Props {
    content: Array<ChecklistProps>
    refreshChecklist(): void
}

export default function AccordionChecklist({ content, refreshChecklist }: Props) {
    const [checklistItem, setChecklistItem] = useState<ItemChecklistProps>({ description: '', id: 0 });
    const [removeCheckListId, setRemoveCId] = useState<number>(0);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast();
    const accordColor = useColorModeValue('yellow.500', 'wheat.600');

    async function createItem(checklistId: number) {
        if (checklistItem?.description == '') return toast({ title: 'Preencha a descrição do item', status: 'error' });

        await api.post(`/checklist/item/${checklistId}`, checklistItem).then(res => {
            if (res.status == 201) {
                toast({ title: 'Novo item inserido na checklist', status: 'success' });
                refreshChecklist();
            }
        }).catch(e => {
            toast({ title: 'Não foi possível inserir item', status: 'error' });
            console.log(e);
        });

        setChecklistItem({ description: '', id: 0 })
    }

    async function updateItem(itemId: number, checklistId: number, description: string) {
        if (!itemId || !checklistId || !description) return toast({ title: 'Preencha todos os campos', status: 'error' });

        api.put(`/checklist/${checklistId}/${itemId}`, { description: description }).then(res => {
            if (res.status == 200) {
                toast({ title: 'Item alterado com sucesso', status: 'success' });
            }
        }).catch(e => {
            toast({ title: 'Não foi possível alterar o item', status: 'error' });
            console.log(e);
        }).finally(() => {
            refreshChecklist();
        });
    }

    async function removeItem(itemId: number, checklistId: number) {
        if (!itemId || !checklistId) return;

        api.delete(`/checklist/${checklistId}/${itemId}`).then(res => {
            if (res.status == 200) {
                toast({ title: 'Item removido com sucesso', status: 'success' });
                refreshChecklist();
            }
        }).catch(e => {
            toast({ title: 'Não foi possível remover item', status: 'error' });
            console.log(e);
        });
    }

    async function removeCheckList(checklistid: number) {
        if (!checklistid) return;

        api.delete(`/checklist/${checklistid}`).then(res => {
            if (res.status == 200) {
                toast({ title: 'Checklist removido com sucesso', status: 'success' });
                refreshChecklist();
            }
        }).catch(e => {
            toast({ title: 'Não foi possível remover checklist', status: 'error' });
            console.log(e);
        });;
    }

    return (
        <Flex
            align={'center'}
            justify={'center'}
            bg={'green.800'}
            borderRadius={'5px'}>

            <AlertDialogCustom title='Você deseja excluir essa check list?' description='Ao excluir essa check list, você também apaga todos os seus itens' 
            onClose={onClose} 
            isOpen={isOpen} 
            remove={removeCheckList} 
            checkListId={removeCheckListId} />

            <Container minH={'full'} minW={'full'}>
                <Accordion key={'checklistAccordion'} bg={useColorModeValue('gray.50', 'gray.800')} allowToggle minW={'full'} minH={'full'}>
                    {
                        content.map((checklist) => (
                            <AccordionItem key={checklist.id}>
                                <AccordionButton key={'accordionButtonMain'}
                                    _expanded={{ bg: 'green.400' }}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent={'space-between'}
                                    py={4}
                                    fontWeight={'bold'}>
                                    <Text textStyle={'b'} fontSize="2xl">{checklist.title}</Text>
                                    <Text fontSize="md">{checklist.description}</Text>
                                    <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                                        <Button mr={'30px'} colorScheme='red' onClick={() => { setRemoveCId(checklist.id); onOpen(); console.log('tet') }}>Apagar</Button>
                                        <AccordionIcon />
                                    </Box>
                                </AccordionButton>

                                <AccordionPanel key={'itemsChecklist'} pb={4} bgColor={accordColor}>
                                    <CheckListItems
                                        items={checklist.items}
                                        updateItem={updateItem}
                                        removeItem={removeItem}
                                        checklistId={checklist.id}>
                                        <form>
                                            <Card bgColor={'green.100'}>
                                                <CardHeader>
                                                    <Badge colorScheme='brown'><Text fontSize={'2xl'}>Novo Item</Text></Badge>
                                                </CardHeader>
                                                <CardBody w={'fit-content'}>
                                                    <FormControl isRequired>
                                                        <FormLabel>Descrição</FormLabel>
                                                        <Textarea border={'green 1px groove'} placeholder='Insira a descrição' onChange={e => { setChecklistItem({ ...checklistItem, description: e.target.value }) }} />
                                                    </FormControl>
                                                </CardBody>
                                                <CardFooter justifyContent={'space-between'}>
                                                    <FormControl>
                                                        <Button type='reset' colorScheme="green" leftIcon={<FaPlus />} onClick={() => createItem(checklist.id)}>Adicionar</Button>
                                                    </FormControl>
                                                </CardFooter>
                                            </Card>
                                        </form>
                                    </CheckListItems>
                                </AccordionPanel>
                            </AccordionItem>
                        ))
                    }
                </Accordion>
            </Container>
        </Flex>
    )
}