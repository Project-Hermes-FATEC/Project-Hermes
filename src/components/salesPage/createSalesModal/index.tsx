import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, Select, useToast } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import api from "../../../pages/helpers/axios"

interface Props {
    isOpen: boolean
    onClose(): void
    onOpen(): void
    loadSales(): void
}

function ModalCreateSales({ isOpen, onClose, onOpen, loadSales }: Props) {
    const emptySales: SalesProps = { id: 0, salesNumber: 0 };
    const [sales, setSales] = useState<SalesProps>(emptySales);
    const [selectChecklist, setSelectChecklist] = useState<ChecklistProps>();
    const [products, setProducts] = useState<ProductProps[]>();
    const [checklists, setChecklists] = useState<ChecklistProps[]>();
    const initialRef = React.useRef(null)
    const toast = useToast();

    useEffect(() => { loadSales(); setSales(emptySales) }, [isOpen]);
    useEffect(() => { loadProducts(), loadChecklists() }, [onOpen]);

    async function createSales() {
        if (!sales.salesNumber || !sales.product?.id || !sales.product?.checklist) return toast({ title: "Preencha os campos obrigatórios", status: "error" });
    }

    async function loadProducts() {
        await api.get('/product', { withCredentials: true }).then(res => {
            if (res.status == 201 || res.status == 200 && res.data) {
                setProducts(res.data);
            }
        }).catch(e => {
            toast({ title: "Não foi possível carregar os produtos", status: 'error', id: Date.now() });
            console.log(e);
        });
    }

    async function loadChecklists() {
        await api.get('/checklist', { withCredentials: true }).then(res => {
            if (res.status == 200) {
                setChecklists(res.data);
            }
        }).catch(e => {
            toast({ title: "Não foi possível carregar as checklists", status: 'error', id: Date.now() });
            console.log(e);
        })
    };

    return (
        <>
            <Modal
                initialFocusRef={initialRef}
                isOpen={isOpen}
                onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Cadastrar venda</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl isRequired={true}>
                            <FormLabel>Número da venda</FormLabel>
                            <Input ref={initialRef} placeholder='Número da venda' onChange={e => setSales({ ...sales, salesNumber: Number(e.target.value) })} /> </FormControl>

                        <FormControl isRequired={true} mt={4}> <FormLabel>Produto</FormLabel>
                            {
                                <Select onChange={e => setSales({ ...sales, product: { id: Number(e.target.value), name: '', type: '', description: '' } })}>
                                    {
                                        products && products.length > 0 ?

                                            products.map((item) => (
                                                <option value={item.id}>{item.name}</option>
                                            ))

                                            :

                                            <option value={''}>Não há produtos cadastrados</option>
                                    }
                                </Select>
                            }
                        </FormControl>

                        <FormControl isRequired={true} mt={4}> <FormLabel>Check List</FormLabel>
                            <Select placeholder='Selecione a check list' onChange={e => setSelectChecklist({ ...selectChecklist, id: Number(e.target.value), description: '', title: '' })}>
                                {
                                    checklists?.map((item) => (
                                        <option value={item.id}>{item.title}</option>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='green' mr={3} onClick={createSales}>
                            Criar
                        </Button>
                        <Button onClick={onClose}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalCreateSales;