import { useParams } from "react-router-dom";
import { Avatar, Container, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { Link as ReachLink } from "react-router-dom";
import Card from "../components/Card";
import user from "../data/data";

const Account = function () {
  const { id } = useParams();

  return (
    <Container maxW="container.lg" mt={4} textAlign="center">
      <Heading as="h1">Personal Info</Heading>
      <Text fontSize="lg">Basic info such as name and photo</Text>
      <Card>
        <Flex justifyContent="space-between" alignItems="center">
          <Flex flexDirection="column" textAlign="left">
            <Text fontSize="2xl">Account</Text>
            <Text fontSize="sm" letterSpacing="wide">
              Some info may be visible to other people
            </Text>
          </Flex>
          <Link
            as={ReachLink}
            to={`/${id}/edit`}
            fontWeight="medium"
            color="blue.500"
          >
            Edit
          </Link>
        </Flex>
        <Flex alignItems="center" textAlign="left">
          <Text
            w="33.3%"
            fontWeight="medium"
            fontSize="sm"
            textColor="gray.400"
            letterSpacing="wide"
          >
            PHOTO
          </Text>
          <Avatar
            size="lg"
            name={user.name}
            src={user.avatar}
            borderRadius={8}
          />
        </Flex>
        <Flex alignItems="center" textAlign="left">
          <Text
            w="33.3%"
            fontWeight="medium"
            fontSize="sm"
            textColor="gray.400"
            letterSpacing="wide"
          >
            NAME
          </Text>
          <Text fontWeight="medium" fontSize="lg">
            {user.name}
          </Text>
        </Flex>
        <Flex alignItems="center" textAlign="left">
          <Text
            w="33.3%"
            fontWeight="medium"
            fontSize="sm"
            textColor="gray.400"
            letterSpacing="wide"
          >
            BIO
          </Text>
          <Text fontWeight="medium" fontSize="lg">
            {user.bio}
          </Text>
        </Flex>
        <Flex alignItems="center" textAlign="left">
          <Text
            w="33.3%"
            fontWeight="medium"
            fontSize="sm"
            textColor="gray.400"
            letterSpacing="wide"
          >
            PHONE
          </Text>
          <Text fontWeight="medium" fontSize="lg">
            {user.phone}
          </Text>
        </Flex>
        <Flex alignItems="center" textAlign="left">
          <Text
            w="33.3%"
            fontWeight="medium"
            fontSize="sm"
            textColor="gray.400"
            letterSpacing="wide"
          >
            EMAIL
          </Text>
          <Text fontWeight="medium" fontSize="lg">
            {user.email}
          </Text>
        </Flex>
        <Flex alignItems="center" textAlign="left">
          <Text
            w="33.3%"
            fontWeight="medium"
            fontSize="sm"
            textColor="gray.400"
            letterSpacing="wide"
          >
            PASSWORD
          </Text>
          <Text fontWeight="medium" fontSize="lg">
            {user.password}
          </Text>
        </Flex>
      </Card>
    </Container>
  );
};

export default Account;
