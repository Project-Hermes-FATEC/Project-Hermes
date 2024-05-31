import { Stack, Button, Text, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface Props {
    message: string
    type?: "success" | "fail"
}

function CardMessage({ message, type }: Props) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!message) {
            setVisible(false);
            return;
        }

        setVisible(true);

        const timer = setTimeout(() => {
            setVisible(false);
            window.history.replaceState("message", "");
        }, 5000);

        return () => clearTimeout(timer);
    }, [message]);

    const closeCard = () => {
        setVisible(false);
    }

    return (
        <>
            {visible &&
                <Stack p="4" boxShadow="lg" bgColor={ type === "success" ? useColorModeValue('green.100', 'green.200') : useColorModeValue('red.100', 'red.200') }
                 m="4" borderRadius="sm">
                    <Stack direction={{ base: 'column', md: 'row' }} justifyContent="space-between">
                        <Text fontWeight="bold" size="72px">
                            {message}
                        </Text>
                        <Stack direction={{ base: 'column', md: 'row' }}>
                            <Button onClick={closeCard} colorScheme="green">OK</Button>
                        </Stack>
                    </Stack>
                </Stack>
            }
        </>
    )
}

export default CardMessage;