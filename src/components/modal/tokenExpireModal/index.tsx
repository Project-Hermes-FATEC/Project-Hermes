import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react"
import { useAuth } from "../../../hooks/authProvider";
import { useNavigate } from "react-router-dom";

function TokenExpire() {
  const { onClose } = useDisclosure()
  const auth = useAuth();  
  const navigate = useNavigate();

  return (
    <>
      <Modal isOpen={auth!.isExpired} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Token expirado</ModalHeader>
          <ModalBody>
            Seu token expirou!
            Você deseja continuar ou sair?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => {onClose; auth?.refreshToken; navigate('/home') }}>Continuar</Button>
            <Button colorScheme='red' onClick={() => {onClose; auth?.logOut; navigate('/') }}>Sair</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default TokenExpire;