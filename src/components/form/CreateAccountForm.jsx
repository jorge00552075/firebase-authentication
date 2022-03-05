import { useRef, useContext } from "react";
import { Link as ReachLink, useNavigate } from "react-router-dom";
import FormWrapper from "./FormWrapper.jsx";
import AuthContext from "../../context/auth-context.js";
import { Google, Facebook, Twitter, Github, Logo } from "../../assets/index";
// prettier-ignore
import {
  Button, Flex, FormControl, FormLabel, Heading, Input, Link, Text, useToast
} from "@chakra-ui/react";

//////////////////////////////
const CreateAccountForm = function () {
  const emailRef = useRef();
  const passwordRef = useRef();
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async function (e) {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    // check if valid

    try {
      const response = await fetch("/api/v1/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok !== true) {
        const data = await response.json();
        throw Error(data.message);
      }

      const data = await response.json();
      // context.login(data.idToken);
      context.login(data.user);

      toast({
        title: "Success",
        description: "Your account was successfully created 🎉",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate(`/my-account/${data.user.id}`, { replace: true });
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
        <FormControl>
          <FormLabel htmlFor="email" hidden>
            Email
          </FormLabel>
          <Input
            type="email"
            id="email"
            name="email"
            required
            size="lg"
            placeholder="email"
            ref={emailRef}
            borderColor="gray.400"
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel htmlFor="password" hidden>
            Password
          </FormLabel>
          <Input
            type="password"
            id="password"
            name="password"
            required
            minLength="4"
            maxLength="60"
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

export default CreateAccountForm;
