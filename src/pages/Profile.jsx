import {
  Avatar,
  Button,
  Container,
  Flex,
  Heading,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import Card from "../components/Card";

const user = {
  avatar: "https://bit.ly/dan-abramov",
  name: "Dan Abramov",
  bio: "I am a software developer and a big fan of devchallenges...",
  phone: "908249274292",
  email: "dan.abramov@gmail.com",
  password: "************",
};

const Profile = function () {
  const handleClick = function () {
    console.log("click");
  };

  return (
    <Container maxW="container.lg" mt={4} textAlign="center">
      <Heading as="h1">Personal Info</Heading>
      <Text fontSize="lg">Basic info such as name and photo</Text>

      <Card>
        <Flex justifyContent="space-between" alignItems="center">
          <Flex flexDirection="column" textAlign="left">
            <Text fontSize="2xl">Profile</Text>
            <Text fontSize="sm" letterSpacing="wide">
              Some info may be visible to other people
            </Text>
          </Flex>
          <Button
            variant="outline"
            colorScheme="blue"
            w={24}
            onClick={handleClick}
          >
            Edit
          </Button>
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

      {/* <VStack
        as="main"
        w={845}
        m="32px auto 0"
        p={8}
        border="1px"
        borderColor="gray.200"
        borderRadius={12}
        alignItems="stretch"
        divider={<StackDivider mt={12} borderColor="gray.200" />}
        spacing={5}
      ></VStack> */}
    </Container>
  );
};

export default Profile;
