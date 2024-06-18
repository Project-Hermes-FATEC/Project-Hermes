import { Badge, Box, Button, Card, CardBody, CardFooter, CardHeader, Divider, FormControl, FormLabel, Image, Select, SimpleGrid, Text, Textarea, keyframes, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import tractorExample from '../../../assets/produtos/trator_example.png'
import api from "../../../pages/helpers/axios";

interface Props {
    items?: ProductProps[]
    updateItem(id: number, changedItem: ProductProps): void
    removeItem(id: number): void
}

export default function ProductItemsCard({ items, updateItem, removeItem }: Props) {
    const emptyProduct: ProductProps = { name: '', description: '', type: '', id: 0 };
    const [itemId, setItemId] = useState<number | null>(null);
    const [changedItem, setchangedItem] = useState<ProductProps>(emptyProduct);
    const [checklist, setChecklist] = useState<ChecklistProps[]>();
    const toast = useToast();
    const pulse = keyframes`0% { box-shadow: 0 0 5px 2px green }
                            50% { box-shadow: 0 0 10px 7px green }
                            100% { box-shadow: 0 0 5px 2px green }`;

    function setEditableItem(id: number) {
        setItemId(itemId == id ? null : id);
    }

    async function loadChecklist() {
        await api.get('/checklist').then(res => {
            if (res.status == 200) return setChecklist(res.data);
        }).catch(e => {
            toast({ title: 'Problema ao carregar as checklists!', status: 'error' });
            console.log(e);
        });
    }

    return (
        <SimpleGrid w={'600'} spacing={10} p={10} templateColumns='repeat(auto-fill, minmax(20%, 1fr))'>
            {
                items?.sort((i, j) => { return i.id - j.id }).map((item) => (
                    <Card key={item.id}
                        _hover={{
                            animation: `${pulse} 1s infinite`,
                            w: 'full',
                            h: 'full',
                            top: -1,
                        }}>
                        <CardHeader>
                            <Badge colorScheme="green"><Text fontSize={'2xl'}>{item.name}</Text></Badge>
                        </CardHeader>
                        <CardBody>
                            <form>
                                <Divider mb={3} mt={3} />

                                <Image
                                    src={tractorExample}
                                    alt={item.name}
                                    borderRadius='lg' />

                                <Divider mb={3} mt={3} />

                                <FormControl>
                                    <FormLabel fontSize={'xl'}>Descrição</FormLabel>
                                    <Textarea
                                        fontSize={'lg'}
                                        id={item.id.toString()}
                                        border={itemId == item.id ? '2px' : ''}
                                        isReadOnly={itemId != item.id}
                                        pointerEvents={itemId != item.id ? 'none' : 'auto'}
                                        placeholder='Insira a descrição'
                                        defaultValue={item.description}
                                        onChange={e => setchangedItem({ ...changedItem, description: e.target.value })} />
                                </FormControl>

                                <Divider mb={3} mt={3} />

                                <FormControl>
                                    <FormLabel fontSize={'xl'}>
                                        Checklist Padrão
                                    </FormLabel>

                                    <Select
                                        onClick={loadChecklist}
                                        pointerEvents={itemId == item.id ? 'auto' : 'none'}
                                        border={itemId == item.id ? '2px' : ''}
                                        defaultValue={item.checklist?.title}
                                        onChange={(e) => { setchangedItem({ ...changedItem, checklist: { id: Number(e.target.value), title: '', description: '' } })}}
                                        fontSize={'lg'}>
                                        {
                                            itemId != item.id ?
                                                <option>{item.checklist?.title}</option>
                                                :
                                                checklist?.map(check => (
                                                    <option>{check.title}</option>
                                                ))
                                        }
                                    </Select>
                                </FormControl>

                                <Box visibility={itemId == item.id ? 'visible' : 'collapse'} m={'5px'} display={itemId == item.id ? 'flex' : 'none'} justifyContent={'space-between'}>
                                    <Button bg={'green'} onClick={() => { updateItem(item.id, changedItem); setchangedItem(emptyProduct); setEditableItem(item.id); }}><FaCheck /></Button>
                                    <Button bg={'red'} type="reset" onClick={() => { setEditableItem(item.id) }}><FaXmark /></Button>
                                </Box>
                            </form>
                        </CardBody>
                        <CardFooter justifyContent={'space-between'}>
                            <Button colorScheme="blue" isDisabled={itemId == item.id} onClick={() => setEditableItem(item.id)}>Alterar</Button>
                            {/* <Button colorScheme="red" onClick={() => removeItem(item.id)}>Excluir</Button> */}
                        </CardFooter>
                    </Card>
                ))
            }
        </SimpleGrid>
    )
}