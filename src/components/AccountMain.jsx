import React, { Fragment, useContext } from "react";
import { Link as ReachLink } from "react-router-dom";
import { Container, Flex, Heading, Link, Text } from "@chakra-ui/react";
import AuthContext from "../context/auth-context.jsx";
import AccountTable from "./AccountTable";

const AccountMain = function () {
  const { documentData } = useContext(AuthContext);

  return (
    <Fragment>
      <Heading as="h1" textAlign="center">
        Personal Info
      </Heading>
      <Container
        maxW="container.lg"
        marginTop={12}
        border="1px"
        borderColor="gray.200"
        borderRadius="xl">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          padding={8}
          borderBottom="1px"
          borderColor="gray.100">
          <div>
            <Text fontSize="2xl" fontWeight="medium">
              Profile
            </Text>
            <Text>Some info maybe visible to others.</Text>
          </div>
          <Link as={ReachLink} to="/MyAccount/update" fontWeight="medium">
            Edit
          </Link>
        </Flex>
        {/* Table */}
        <AccountTable documentData={documentData} />
      </Container>
    </Fragment>
  );
};

export default AccountMain;
