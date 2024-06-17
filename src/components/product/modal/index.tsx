import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, Select, useToast } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import api from "../../../pages/helpers/axios"

interface Props {
    isOpen: boolean
    onClose(): void
    loadSales(): void
}

function ModalCreateProduct({ isOpen, onClose, loadSales }: Props) {
    const emptyProduct = { name: '', description: '', type: '', id: 0 };
    const [product, setProduct] = useState<ProductProps>(emptyProduct);
    const [checklists, setChecklists] = useState<ChecklistProps[]>();
    const initialRef = React.useRef(null)
    const toast = useToast();

    useEffect(() => { loadSales(); loadChecklists(); setProduct(emptyProduct); }, [isOpen]);

    async function createProduct() {
        if (!product.name || !product.type || !product.description) return toast({ title: "Preencha os campos obrigatórios", status: "error" });

        await api.post('/product', product).then(res => {
            if (res.status == 201) {
                toast({ title: 'Produto criado com sucesso!', status: 'success' });
                onClose();
            }
        }).catch(e => {
            toast({ title: 'Não foi possível cadastrar o produto', status: 'error' });
        });
    }

    async function loadChecklists() {
        await api.get('/checklist').then(res => {
            if(res.status == 200){
                setChecklists(res.data);
            }
        });
    }

    return (
        <>
            <Modal
                initialFocusRef={initialRef}
                isOpen={isOpen}
                onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Cadastrar produto</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl isRequired={true} mt={3}>
                            <FormLabel>Nome do Produto</FormLabel>
                            <Input ref={initialRef} placeholder='Nome do Produto' onChange={e => setProduct({ ...product, name: e.target.value })} />
                        </FormControl>

                        <FormControl isRequired={true} mt={3}>
                            <FormLabel>Descrição</FormLabel>
                            <Input ref={initialRef} placeholder='Descrição' onChange={e => setProduct({ ...product, description: e.target.value })} />
                        </FormControl>

                        <FormControl isRequired={true} mt={3}>
                            <FormLabel>Produto</FormLabel>
                            <Select placeholder='Selecione o tipo do produto' onChange={e => setProduct({ ...product, type: e.target.value })} >
                                <option>Produto</option>
                                <option>Transporte</option>
                            </Select>
                        </FormControl>

                        <FormControl isRequired={true} mt={3}>
                            <FormLabel>Cheklist</FormLabel>
                            <Select
                                placeholder='Selecione uma checklist para o produto'
                                onChange={e => setProduct({ ...product, checklist: { id: Number(e.target.value), title: '', description: '' }})}>
                                {checklists?.map(item => (
                                    <option key={item.id} value={item.id}>{item.title}</option>
                                ))}                                
                            </Select>
                        </FormControl>

                        <FormControl p={3} mt={3}>
                            <FormLabel>Imagem do produto</FormLabel>
                            <Input ref={initialRef} placeholder='Imagem' type="file" />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='green' mr={3} onClick={createProduct}>
                            Criar
                        </Button>
                        <Button onClick={onClose}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalCreateProduct;