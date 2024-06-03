import { Stack, Heading, InputGroup, InputLeftElement, Button, Icon, Input, Text } from "@chakra-ui/react"
import { FaSearch } from "react-icons/fa"
import { ReactElement } from "react"

interface Props {
    title: string
    title_sub: string
    placeHolder: string
    buttons?: Array<ReactElement>
}

function CustomListSearch({ title, title_sub, placeHolder, buttons }: Props){
    return(
        <Stack
            p={5}
            alignItems={'center'}
            justifyContent={{
              base: 'flex-start',
              md: 'space-around',
            }}
            direction={{
              base: 'column',
              md: 'row',
            }}>
            <Stack
              width={{
                base: '100%',
                md: '40%',
              }}
              textAlign={'center'}>
              <Heading size={'lg'}>
                {title} <Text color="green.400">{title_sub}</Text>
              </Heading>
            </Stack>
            <Stack
              width={{
                base: '100%',
                md: '60%',
              }}
              display={'grid'}
              gridTemplateRows={'auto auto'}
              gridTemplateColumns={'auto auto auto auto auto'}
              alignItems={'center'}
              alignContent={'space-between'}>
              <InputGroup>
                <InputLeftElement h={'full'}><Button variant={'ghost'}><Icon as={FaSearch} /></Button></InputLeftElement>
                <Input placeholder={placeHolder} colorScheme='green' backgroundColor={'white'} type='text' />
              </InputGroup>
              {
                buttons?.map((button) => (
                    button
                ))
              }
            </Stack>
          </Stack>
    )
}

export default CustomListSearch