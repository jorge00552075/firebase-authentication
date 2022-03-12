import { useContext, useRef } from "react";
import { Link as ReachLink } from "react-router-dom";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";

import FormWrapper from "../layout/FormWrapper.jsx";
import AuthContext from "../../context/auth/auth-context.jsx";
import { Google, Facebook, Twitter, Github, Logo } from "../../assets/index";

//////////////////////////////
const LoginForm = function () {
  const emailRef = useRef();
  const passwordRef = useRef();
  const authContext = useContext(AuthContext);

  const handleSubmit = async function (e) {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    // validate inputs

    authContext.login(email, password);
  };

  return (
    <FormWrapper>
      <Logo />
      <Heading as="h1" mt={6} fontWeight={600} fontSize="lg" lineHeight="7">
        Login
      </Heading>
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
            id="password"
            type="password"
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
          Login
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
        Don't have an account yet ?
        <Link as={ReachLink} to="/signup" color="blue.500">
          {" "}
          Register
        </Link>
      </Text>
    </FormWrapper>
  );
};

export default LoginForm;
