import React, { useRef, useState } from "react";
import {
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { Google, Facebook, Twitter, Github, Logo } from "../../assets/index";
import {
  createUser,
  signInUser,
  signInWithGoogle,
} from "../../firebaseConfig.js";

const AuthForm = function () {
  const [signup, setSignup] = useState(true);
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleGoogleAuth = async () => await signInWithGoogle();

  const handleClick = () => setSignup((v) => !v);

  const handleSubmit = async function (e) {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    // validate inputs

    try {
      if (signup) {
        await createUser(email, password);
      } else {
        await signInUser(email, password);
      }
    } catch (err) {
      switch (err.code) {
        case "auth/email-already-in-use":
          console.error("💥 auth/email-already-in-use");
          break;
        case "auth/user-not-found":
          console.error("💥 auth/user-not-found");
          break;
        case "auth/wrong-password":
          console.error("💥 auth/wrong-password");
          break;
        default:
          console.error("💥💥💥 ERROR", err.message);
          break;
      }
    }
  };

  return (
    <Container
      mt={32}
      p={14}
      border="1px"
      borderColor="gray.400"
      borderRadius="lg">
      <Logo />
      <Heading as="h1" mt={6} fontWeight={600} fontSize="lg" lineHeight="7">
        {signup ? "Join thousands of learners from around the world." : "Login"}
      </Heading>
      <Text mt={2}>
        {signup &&
          "Master web development by making real-life projects. There are multiple for you to choose."}
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
            minLength="6"
            size="lg"
            placeholder="password"
            ref={passwordRef}
            borderColor="gray.400"
          />
        </FormControl>
        <Button type="submit" w="full" mt={6} colorScheme="blue" size="lg">
          {signup ? "Start coding now" : "Login"}
        </Button>
      </form>
      <Text
        mt={6}
        fontSize="sm"
        textColor="gray.600"
        textAlign="center"
        letterSpacing="wide"
        lineHeight="5">
        or continue with these social profile.
      </Text>
      <Flex justifyContent="center" gap={6} mt={4}>
        <Button onClick={handleGoogleAuth}>
          <Google />
        </Button>
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
        lineHeight="5">
        {signup ? "Already a member " : "Don't have an account yet "}
        <Button
          colorScheme="blue"
          size="sm"
          variant="link"
          onClick={handleClick}>
          {signup ? "Login" : "Register"}
        </Button>
      </Text>
    </Container>
  );
};

export default AuthForm;
