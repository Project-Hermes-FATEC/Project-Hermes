import { useToast } from "@chakra-ui/react";

function toastHandle() {
    return useToast({
        position: 'top',
        title: "",
        status: "info",
        duration: 2000,
        isClosable: true,
        containerStyle: {
            maxWidth: '100%'
        }
    });
}

export default toastHandle;