import { useContext, useRef } from "react";
import { Link as ReachLink, useNavigate } from "react-router-dom";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
  useToast,
} from "@chakra-ui/react";

import FormWrapper from "../layout/FormWrapper.jsx";
import AuthContext from "../../context/auth/auth-context.jsx";

import { Google, Facebook, Twitter, Github, Logo } from "../../assets/index";

//////////////////////////////
const SignUpForm = function () {
  // hooks
  const authContext = useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const toast = useToast();

  // event handlers
  const handleSubmit = async function (e) {
    e.preventDefault();

    // validate inputs
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      authContext.signUp(email, password);

      toast({
        title: "Success",
        description: "Your account was successfully created 🎉",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // get user uid
      navigate("/account/0", { replace: true });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <FormWrapper>
      <Logo />
      <Heading as="h1" mt={6} fontWeight={600} fontSize="lg" lineHeight="7">
        Join thousands of learners from around the world.
      </Heading>
      <Text mt={2}>
        Master web development by making real-life projects. There are multiple
        paths for you to choose.
      </Text>
      <form onSubmit={handleSubmit} style={{ marginTop: "24px" }}>
        <FormControl isRequired>
          <FormLabel htmlFor="email" hidden>
            Email
          </FormLabel>
          <Input
            type="email"
            id="email"
            size="lg"
            placeholder="email"
            ref={emailRef}
            borderColor="gray.400"
          />
        </FormControl>
        <FormControl isRequired mt={4}>
          <FormLabel htmlFor="password" hidden>
            Password
          </FormLabel>
          <Input
            type="password"
            id="password"
            minLength="4"
            size="lg"
            placeholder="password"
            ref={passwordRef}
            borderColor="gray.400"
          />
        </FormControl>
        <Button type="submit" w="full" mt={6} colorScheme="blue" size="lg">
          Start coding now
        </Button>
      </form>
      <Text
        mt={6}
        fontSize="sm"
        textColor="gray.600"
        textAlign="center"
        letterSpacing="wide"
        lineHeight="5"
      >
        or continue with these social profile.
      </Text>
      <Flex justifyContent="center" gap={6} mt={4}>
        <Google />
        <Facebook />
        <Twitter />
        <Github />
      </Flex>
      <Text
        mt={6}
        fontSize="sm"
        textColor="gray.600"
        textAlign="center"
        letterSpacing="wide"
        lineHeight="5"
      >
        Already a member?
        <Link as={ReachLink} to="/login" color="blue.500">
          {" "}
          Login
        </Link>
      </Text>
    </FormWrapper>
  );
};

export default SignUpForm;
