import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// prettier-ignore
import { Avatar, Container, Flex, HStack, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { TriangleDownIcon } from "@chakra-ui/icons";
import AuthContext from "../context/auth-context";
import { ReactComponent as Logo } from "../assets/devchallenges.svg";
import { signOutUser } from "../firebaseConfig";

const Header = function () {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = function () {
    signOutUser();
    navigate("/auth", { replace: true });
  };

  return (
    <Container maxW="container.xl">
      <Flex
        as="header"
        justifyContent="space-between"
        alignItems="center"
        h={20}
        px={3}>
        <Logo />
        <HStack spacing={6}>
          <Avatar
            size="sm"
            src={currentUser.photoURL}
            name={currentUser.name}
          />
          <Text fontWeight="bold" fontSize="sm" lineHeight={5}>
            {currentUser.name}
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
                onClick={handleClick}>
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
