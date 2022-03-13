import { useContext } from "react";
import { Link as ReachLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";

import AuthContext from "../../context/auth/auth-context.jsx";
import Card from "../layout/Card.jsx";
import user from "../../data";

const ChangeForm = function () {
  const authContext = useContext(AuthContext);
  const { register, handleSubmit } = useForm();

  const onSubmit = function (data) {
    // console.log(data);
    authContext.updateUser(data);
  };

  return (
    <Container maxW="container.lg" mt={4}>
      <Link as={ReachLink} to={"/account"}>
        &larr; Back
      </Link>
      <Card>
        <Box>
          <Heading as="h1" fontWeight="medium" fontSize="2xl">
            Change Info
          </Heading>
          <Text
            mt={2}
            fontWeight="medium"
            fontSize="sm"
            textColor="gray.600"
            letterSpacing="wide"
          >
            Changes will be reflected to every service
          </Text>
        </Box>
        <Flex alignItems="center" gap={6}>
          <Avatar
            size="lg"
            name={user.name}
            src={user.avatar}
            borderRadius={8}
          />
          <Text
            fontWeight="medium"
            fontSize="sm"
            textColor="gray.400"
            letterSpacing="wide"
          >
            CHANGE PHOTO
          </Text>
        </Flex>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4} w={416}>
            <FormControl isRequired>
              <FormLabel htmlFor="name" fontSize="sm" letterSpacing="wide">
                Name
              </FormLabel>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                size="lg"
                borderColor="gray.400"
                {...register("name")}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="bio" fontSize="sm" letterSpacing="wide">
                Bio
              </FormLabel>
              <Textarea
                id="bio"
                placeholder="Enter your bio"
                size="lg"
                borderColor="gray.400"
                {...register("bio")}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="phone" fontSize="sm" letterSpacing="wide">
                Phone
              </FormLabel>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone"
                size="lg"
                borderColor="gray.400"
                {...register("phone")}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="email" fontSize="sm" letterSpacing="wide">
                Email
              </FormLabel>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                size="lg"
                borderColor="gray.400"
                {...register("email")}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="password" fontSize="sm" letterSpacing="wide">
                Password
              </FormLabel>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                size="lg"
                borderColor="gray.400"
                {...register("password")}
              />
            </FormControl>
          </VStack>
          <Button type="submit" colorScheme="blue" mt={4}>
            Save
          </Button>
        </form>
      </Card>
    </Container>
  );
};

export default ChangeForm;
