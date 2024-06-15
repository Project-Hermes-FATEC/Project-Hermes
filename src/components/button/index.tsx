import { Button, useColorModeValue } from "@chakra-ui/react"

export default function ButtonCustom() {
    return (
        <Button
            size="md"
            color={'black'}
            bgColor={useColorModeValue('green.500', 'green.600')}>
        </Button>
    )
}