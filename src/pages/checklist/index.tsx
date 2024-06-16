import {
  Box,
  Button,
  Stack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import Layout from '../../components/defaultLayout/layout'
import CustomListSearch from '../../components/customListSearch'
import { useState } from 'react'
import api from '../helpers/axios'
import { FaPlus } from 'react-icons/fa'
import AccordionChecklist from '../../components/checklist/accordionChecklist'
import ModalCreateCheckList from '../../components/checklist/modal'

function Checklist() {
  const [checkList, setChecklist] = useState<ChecklistProps[]>([]);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const toast = useToast();

  async function loadChecklists() {
    await api.get('/checklist', { withCredentials: true }).then(res => {
      if (res.status == 200) {
        setChecklist(res.data);
      }
    }).catch(e => {
      toast({ title: "Não foi possível carregar os produtos", status: 'error', id: Date.now() });
      console.log(e);
    })
  };

  return (
    <Layout>
      <ModalCreateCheckList isOpen={isOpen} onClose={onClose} loadCheckList={loadChecklists} />
      <Box py={6} px={5} width="full" bgColor={"blue.100"} >
        <Stack spacing={4} width={'100%'} direction={'column'}>
          <CustomListSearch title='Lista de'
            title_sub='Check Lists'
            placeHolder='Pesquisar por check list'
            buttons={[<Button key={'checklistListButton'} onClick={onOpen} leftIcon={<FaPlus />} background={"green.300"}>Cadastrar novo check list</Button>]} />
          <AccordionChecklist content={checkList} refreshChecklist={loadChecklists} />
        </Stack>
      </Box>
    </Layout>
  )
}

export default Checklist;
