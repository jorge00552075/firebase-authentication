import {
  Avatar,
  Container,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { ReactComponent as Logo } from "../assets/devchallenges.svg";
import { TriangleDownIcon } from "@chakra-ui/icons";
import { useContext } from "react";
import AuthContext from "../context/auth-context";

const Header = function () {
  const context = useContext(AuthContext);

  const handleClick = function () {
    context.logout();
  };

  return (
    <Container maxW="container.xl">
      <Flex
        as="header"
        justifyContent="space-between"
        alignItems="center"
        h={20}
        px={3}
      >
        <Logo />
        <HStack spacing={6}>
          <Avatar size="sm" src="" name="Dan Abramov" />
          <Text fontWeight="bold" fontSize="sm" lineHeight={5}>
            Dan Abramov
          </Text>
          <Menu>
            <MenuButton>
              <TriangleDownIcon />
            </MenuButton>
            <MenuList mt={4} p={4} borderRadius={12}>
              <MenuItem borderRadius={8}>My Profile</MenuItem>
              <MenuItem borderRadius={8}>Group Chat</MenuItem>
              <MenuDivider />
              <MenuItem
                borderRadius={8}
                textColor="red.500"
                onClick={handleClick}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Header;
