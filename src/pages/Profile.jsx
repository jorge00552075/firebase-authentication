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

const Profile = function () {
  // maxW=1024px
  return (
    <Container maxW="container.lg" mt={4} textAlign="center">
      <Heading as="h1">Personal Info</Heading>
      <Text fontSize="lg">Basic info such as name and photo</Text>

      <VStack
        as="main"
        w={845}
        mx="auto"
        mt={8}
        p={8}
        border="1px"
        borderColor="gray.200"
        borderRadius={12}
        alignItems="stretch"
        divider={<StackDivider mt={12} borderColor="gray.200" />}
        spacing={5}
      >
        {/* heading */}
        <Flex justifyContent="space-between" alignItems="center">
          <Flex flexDirection="column" textAlign="left">
            <Text fontSize="2xl">Profile</Text>
            <Text fontSize="sm" letterSpacing="wide">
              Some info may be visible to other people
            </Text>
          </Flex>
          <Button variant="outline" colorScheme="blue" w={24}>
            Edit
          </Button>
        </Flex>
        {/* photo */}
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
            name="Dan Abramov"
            src="https://bit.ly/dan-abramov"
            borderRadius={8}
          />
        </Flex>
        {/* name */}
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
            Xanthe Neal
          </Text>
        </Flex>
        {/* bio */}
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
            I am a software developer and a big fan of devchallenges...
          </Text>
        </Flex>
        {/* phone */}
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
            908249274292
          </Text>
        </Flex>
        {/* email */}
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
            xanthe.neal@gmail.com
          </Text>
        </Flex>
        {/* password */}
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
            ************
          </Text>
        </Flex>
      </VStack>
    </Container>
  );
};

export default Profile;
