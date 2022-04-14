import { Avatar, Table, Tbody, Td, Tr } from "@chakra-ui/react";
import TableData from "./StyledTd";

const AccountTable = ({ documentData }) => {
  const { displayName, photoURL, bio, phoneNumber, email, password } =
    documentData;

  return (
    <Table variant="simple" size="lg">
      <Tbody>
        <Tr>
          <TableData>Photo</TableData>
          <Td>
            <Avatar
              size="lg"
              name={displayName}
              src={photoURL}
              borderRadius={8}
            />
          </Td>
        </Tr>
        <Tr>
          <TableData>Name</TableData>
          <Td fontWeight="medium" fontSize="lg">
            {displayName}
          </Td>
        </Tr>
        <Tr>
          <TableData>Bio</TableData>
          <Td fontWeight="medium" fontSize="lg">
            {bio}
          </Td>
        </Tr>
        <Tr>
          <TableData>Phone</TableData>
          <Td fontWeight="medium" fontSize="lg">
            {phoneNumber}
          </Td>
        </Tr>
        <Tr>
          <TableData>Email</TableData>
          <Td fontWeight="medium" fontSize="lg">
            {email}
          </Td>
        </Tr>
        <Tr>
          <TableData>Password</TableData>
          <Td fontWeight="medium" fontSize="lg">
            {password}
          </Td>
        </Tr>
      </Tbody>
    </Table>
  );
};

export default AccountTable;
