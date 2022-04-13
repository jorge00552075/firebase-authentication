import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import {
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useToast,
  IconButton,
  InputLeftElement,
  InputGroup,
} from "@chakra-ui/react";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
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
  const navigate = useNavigate();
  const toast = useToast();

  const handleGoogleAuth = async () => {
    const user = await signInWithGoogle();
    if (user) {
      navigate("/account", { replace: true });
    }
  };

  const handleClick = () => setSignup((v) => !v);

  const handleSubmit = async function (e) {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    // validate inputs

    try {
      // REFACTOR !!!
      if (signup) {
        const user = await createUser(email, password);

        if (user) {
          navigate("/account", { replace: true });
        }
      } else {
        const user = await signInUser(email, password);

        if (user) {
          navigate("/account", { replace: true });
        }
      }
    } catch (err) {
      toast({
        title: "Error",
        description: err.code,
        status: "error",
        position: "top-right",
      });
    }
  };

  return (
    <Container
      width={473}
      mt={32}
      p={14}
      border="1px"
      borderColor="gray.400"
      borderRadius="3xl">
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
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<EmailIcon color="gray.500" fontSize={20} mt={2} />}
            />
            <Input
              type="email"
              id="email"
              size="lg"
              placeholder="email"
              ref={emailRef}
              borderColor="gray.400"
            />
          </InputGroup>
        </FormControl>
        <FormControl isRequired mt={4}>
          <FormLabel htmlFor="password" hidden>
            Password
          </FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<LockIcon color="gray.500" fontSize={20} mt={2} />}
            />
            <Input
              type="password"
              id="password"
              minLength="6"
              size="lg"
              placeholder="password"
              ref={passwordRef}
              borderColor="gray.400"
            />
          </InputGroup>
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
        <IconButton
          aria-label="Sign in with Google"
          colorScheme="whiteAlpha"
          icon={<Google />}
          onClick={handleGoogleAuth}
        />
        <IconButton colorScheme="whiteAlpha" icon={<Facebook />} />
        <IconButton colorScheme="whiteAlpha" icon={<Twitter />} />
        <IconButton colorScheme="whiteAlpha" icon={<Github />} />
      </Flex>
      <Text
        mt={6}
        fontSize="sm"
        textColor="gray.600"
        textAlign="center"
        letterSpacing="wide"
        lineHeight="5">
        {signup ? "Already a member? " : "Don't have an account yet? "}
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
