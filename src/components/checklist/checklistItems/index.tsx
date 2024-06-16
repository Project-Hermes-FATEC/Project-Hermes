import { Badge, Box, Button, Card, CardBody, CardFooter, CardHeader, FormControl, FormLabel, SimpleGrid, Text, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

interface Props {
    items?: ItemChecklistProps[]
    removeItem(itemId: number, checklistid: number): void
    updateItem(itemId: number, checklistid: number, description: string): void
    checklistId: number
    children: React.ReactNode
}

export default function CheckListItems({ items, removeItem, updateItem, checklistId, children }: Props) {
    const [itemId, setItemId] = useState<number | null>(null);
    const [changedItem, setchangedItem] = useState('');

    function setEditableItem(id: number) {
        setItemId(itemId == id ? null : id);
    }

    return (
        <SimpleGrid w={'600'} spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
            {
                items?.sort((i, j) => { return i.id - j.id }).map((item, index) => (
                    <Card key={item.id}>
                        <CardHeader>
                            <Badge><Text fontSize={'2xl'}>Item {index + 1}</Text></Badge>
                        </CardHeader>
                        <CardBody>
                            <form>
                                <FormControl>
                                    <FormLabel>Descrição</FormLabel>
                                    <Textarea
                                        id={item.id.toString()}
                                        border={itemId == item.id ? '2px' : '1px'}
                                        isReadOnly={itemId != item.id}
                                        pointerEvents={itemId != item.id ? 'none' : 'auto'}
                                        placeholder='Insira a descrição'
                                        defaultValue={item.description}
                                        onChange={e => setchangedItem(e.target.value)} />
                                </FormControl>
                                <Box visibility={itemId == item.id ? 'visible' : 'collapse'} m={'5px'} display={itemId == item.id ? 'flex' : 'none'} justifyContent={'space-between'}>
                                    <Button bg={'green'} onClick={() => { updateItem(item.id, checklistId, changedItem); setchangedItem(''); setEditableItem(item.id); }}><FaCheck /></Button>
                                    <Button bg={'red'} type="reset" onClick={() => { setEditableItem(item.id) }}><FaXmark /></Button>
                                </Box>
                            </form>
                        </CardBody>
                        <CardFooter justifyContent={'space-between'}>
                            <Button colorScheme="blue" onClick={() => setEditableItem(item.id)}>Alterar</Button>
                            <Button colorScheme="red" onClick={() => removeItem(item.id, checklistId)}>Excluir</Button>
                        </CardFooter>
                    </Card>
                ))
            }
            {children}
        </SimpleGrid>
    )
}