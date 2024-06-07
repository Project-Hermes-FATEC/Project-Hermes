import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { FaChevronCircleDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface Props {
    title: string;
    link?: string;
    items?: Array<{ value: string; link: string }>
}

function SimpleMenu({ title, items }: Props) {
    const navigate = useNavigate();

    return (
        <Menu>
            <MenuButton
                as={Button}
                rightIcon={<FaChevronCircleDown />}
                _hover={{ bg: 'green.400' }}
                _expanded={{ bg: 'green.200' }}
                _focus={{ boxShadow: 'outline' }}>
                {title}
            </MenuButton>
            <MenuList>
                {!items ? 'teste' : items.map(item => (
                    <MenuItem onClick={() => { navigate(item.link) }}>
                        {item.value}
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
}

export default SimpleMenu;