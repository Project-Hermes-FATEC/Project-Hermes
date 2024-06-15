import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, Select } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import toastHandle from "../../toast";

interface Props {
    isOpen: boolean
    onClose(): void
    loadSales(): void
}

function ModalCreateProduct({ isOpen, onClose, loadSales }: Props) {
    const emptyProduct = { name: '', description: '', type: '', id: 0 };
    const [product, setProduct] = useState<ProductProps>(emptyProduct);
    const initialRef = React.useRef(null)
    const toast = toastHandle();

    useEffect(() => { loadSales(); setProduct(emptyProduct) }, [isOpen]);

    async function createProduct() {
        if (!product.name || !product.type || !product.description) return toast({ title: "Preencha os campos obrigatórios", status: "error" });
    
    }

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
                            <FormLabel>Nome do Produto</FormLabel>
                            <Input ref={initialRef} placeholder='Nome do Produto' onChange={e => setProduct({ ...product, name: e.target.value })} />
                        </FormControl>

                        <FormControl isRequired={true}>
                            <FormLabel>Descrição</FormLabel>
                            <Input ref={initialRef} placeholder='Descrição' onChange={e => setProduct({ ...product, description: e.target.value })} />
                        </FormControl>

                        <FormControl isRequired={true} mt={4}> <FormLabel>Produto</FormLabel>
                            <Select placeholder='Selecione o tipo do produto' onChange={e => setProduct({ ...product, type: e.target.value })} >
                                <option>Produto</option>
                                <option>Template</option>
                            </Select>
                        </FormControl>

                        <FormControl isRequired={true}>
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