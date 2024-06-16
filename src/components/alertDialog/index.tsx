import { useDisclosure, Button, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter } from "@chakra-ui/react"
import React from "react"

interface Props {
    title: string
    description: string
    checkListId: number
    remove(id: number): void
    isOpen: boolean
    onClose(): void
}

export default function AlertDialogCustom({ title, description, checkListId, remove, isOpen, onClose }: Props) {
    const cancelRef = React.useRef(null);

    return (
        <>
            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered>
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader>{title}</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        {description}
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Não
                        </Button>
                        <Button colorScheme='red' ml={3} onClick={() => { remove(checkListId); onClose() }}>
                            Sim
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}