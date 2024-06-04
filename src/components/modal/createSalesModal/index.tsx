import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, Select, InputRightElement, InputGroup } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import toastHandle from "../../toast";
import api from "../../../pages/helpers/axios";

interface Props {
    isOpen: boolean
    onClose(): void
    loadSales(): void
}

function ModalCreateSales({ isOpen, onClose, loadSales }: Props) {
    const emptySales = { salesNumber: '', productId: '', userId: '', checklist: '' };
    const [sales, setSales] = useState(emptySales);
    const [show, setShow] = React.useState(false)
    const initialRef = React.useRef(null)
    const toast = toastHandle();

    useEffect(() => {loadSales(); setSales(emptySales)}, [isOpen]);

    async function createSales() {
        if(!sales.salesNumber) return toast({ title: "Preencha os campos obrigatórios", status: "error" });
    }

    return (
        <>
            <Modal
                initialFocusRef={initialRef}
                isOpen={isOpen}
                onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Cadastrar usuário</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl isRequired={true}> 
                        <FormLabel>Número da venda</FormLabel> 
                        <Input ref={initialRef} placeholder='Número da venda' onChange={e => setSales({...sales, salesNumber: e.target.value })} /> </FormControl>

                        <FormControl isRequired={true} mt={4}> <FormLabel>Produto</FormLabel>
                            <Select placeholder='Selecione o produto' onChange={e => setSales({...sales, productId: e.target.value})} >
                                <option>Trator 7E</option>
                                <option>Trator 9A</option>
                            </Select>
                        </FormControl>

                        <FormControl isRequired={true} mt={4}> <FormLabel>Check List</FormLabel>
                            <Select placeholder='Selecione a check list' onChange={e => setSales({...sales, checklist: e.target.value})} >
                                <option>Check list Trator 7E</option>
                                <option>Check list  Trator 9A</option>
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