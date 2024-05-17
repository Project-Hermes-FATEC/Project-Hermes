import { Button, useColorModeValue } from "@chakra-ui/react"

interface Props {
    title: string,
}

export default function ButtonCustom({ title }: Props) {
    return (
        <Button
            size="md"
            color={'black'}
            bgColor={useColorModeValue('green.500', 'green.600')}>
            {title}
        </Button>
    )
}