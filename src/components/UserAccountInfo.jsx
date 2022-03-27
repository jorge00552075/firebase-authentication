import { useContext } from "react";
import { Link as ReachLink } from "react-router-dom";
import {
  Avatar,
  Container,
  Flex,
  Heading,
  Link,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
  VStack,
} from "@chakra-ui/react";
import AuthContext from "../context/auth-context.jsx";

const UserAccountInfo = function () {
  const { user } = useContext(AuthContext);

  const StyledTableData = function ({ children }) {
    return (
      <Td
        fontWeight="medium"
        fontSize="sm"
        color="gray.500"
        letterSpacing="wide"
        textTransform="uppercase">
        {children}
      </Td>
    );
  };

  return (
    <>
      <VStack>
        <Heading as="h1">Personal Info</Heading>
        <Text fontSize="lg">Basic info such as name and photo</Text>
      </VStack>

      <Container
        maxW="container.lg"
        marginTop={12}
        border="1px"
        borderColor="gray.200"
        borderRadius="lg">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          padding={8}
          borderBottom="1px"
          borderColor="gray.100">
          <div>
            <Text fontSize="2xl">Profile</Text>
            <Text fontWeight="medium" fontSize="sm">
              Some info maybe visible to other people
            </Text>
          </div>

          <Link
            as={ReachLink}
            to="/account/update"
            fontWeight="medium"
            color="blue.500">
            Edit
          </Link>
        </Flex>

        {/* Table */}
        <Table variant="simple" size="lg">
          <Tbody>
            <Tr>
              <StyledTableData>Photo</StyledTableData>
              <Td>
                <Avatar
                  size="lg"
                  name={user.name}
                  src={user.photoURL}
                  borderRadius={8}
                />
              </Td>
            </Tr>
            <Tr>
              <StyledTableData>Name</StyledTableData>
              <Td fontWeight="medium" fontSize="lg">
                {user.displayName}
              </Td>
            </Tr>
            <Tr>
              <StyledTableData>Bio</StyledTableData>
              <Td fontWeight="medium" fontSize="lg">
                {user.bio}
              </Td>
            </Tr>
            <Tr>
              <StyledTableData>Phone</StyledTableData>
              <Td fontWeight="medium" fontSize="lg">
                {user.phoneNumber}
              </Td>
            </Tr>
            <Tr>
              <StyledTableData>Email</StyledTableData>
              <Td fontWeight="medium" fontSize="lg">
                {user.email}
              </Td>
            </Tr>
            <Tr>
              <StyledTableData>Password</StyledTableData>
              <Td fontWeight="medium" fontSize="lg">
                {user.password}
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Container>
    </>
  );
};

export default UserAccountInfo;
