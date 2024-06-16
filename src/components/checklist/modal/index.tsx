import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, useToast } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import api from "../../../pages/helpers/axios"

interface Props {
    isOpen: boolean
    onClose(): void
    loadCheckList(): void
}

function ModalCreateCheckList({ isOpen, onClose, loadCheckList }: Props) {
    const emptyProduct = { id: 0, title: '', description: '' };
    const [checkList, setCheckList] = useState<ChecklistProps>(emptyProduct);
    const initialRef = React.useRef(null)
    const toast = useToast();

    useEffect(() => { loadCheckList(); setCheckList(emptyProduct) }, [isOpen]);

    async function createCheckList() {
        if (!checkList.title || !checkList.description) return toast({ title: "Preencha os campos obrigatórios", status: "error" });

        api.post('/checklist', checkList).then(res => {
            if (res.status == 201) {
                toast({ title: 'Check list criada com sucesso', status: 'success' });
                loadCheckList();
                onClose();
            }
        }).catch(e => {
            toast({ title: 'Não foi possível criar check list', status: 'error' });
            console.log(e);
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
                    <ModalHeader>Criar check list</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <form>
                            <FormControl isRequired={true}>
                                <FormLabel>Titulo da check list</FormLabel>
                                <Input ref={initialRef} placeholder='Título' onChange={e => setCheckList({ ...checkList, title: e.target.value })} />
                            </FormControl>

                            <FormControl isRequired={true}>
                                <FormLabel>Descrição</FormLabel>
                                <Input placeholder='Descrição' onChange={e => setCheckList({ ...checkList, description: e.target.value })} />
                            </FormControl>
                        </form>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='green' mr={3} onClick={createCheckList}>
                            Criar
                        </Button>
                        <Button onClick={onClose}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalCreateCheckList;