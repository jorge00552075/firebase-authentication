import { useRef } from "react";
import { Link as ReachLink } from "react-router-dom";
// prettier-ignore
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Link, Text } from "@chakra-ui/react";

import { ReactComponent as Google } from "../assets/Google.svg";
import { ReactComponent as Facebook } from "../assets/Facebook.svg";
import { ReactComponent as Twitter } from "../assets/Twitter.svg";
import { ReactComponent as Github } from "../assets/Github.svg";
import { ReactComponent as Logo } from "../assets/devchallenges.svg";

const Home = function () {
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = function (e) {
    e.preventDefault();
    console.log(emailRef.current.value);
    console.log(passwordRef.current.value);
  };

  return (
    <Box
      as="main"
      w={474}
      minH={544}
      mt={28}
      mx="auto"
      p={14}
      border="1px"
      borderColor="gray.400"
      borderRadius="3xl"
    >
      <Logo />
      <Box mt={6}>
        <Heading as="h1" fontWeight={600} fontSize="lg" lineHeight="7">
          Join thousands of learners from around the world.
        </Heading>
        <Text mt={2}>
          Master web development by making real-life projects. There are
          multiple paths for you to choose.
        </Text>
      </Box>

      <form onSubmit={handleSubmit} style={{ marginTop: "24px" }}>
        <FormControl>
          <FormLabel htmlFor="email" hidden>
            Email
          </FormLabel>
          <Input
            id="email"
            type="email"
            placeholder="email"
            ref={emailRef}
            size="lg"
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
            placeholder="password"
            ref={passwordRef}
            size="lg"
            borderColor="gray.400"
          />
        </FormControl>
        <Button type="submit" width="full" mt={6} colorScheme="blue" size="lg">
          Start coding now
        </Button>
      </form>

      <Box marginTop={6}>
        <Text
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
      </Box>

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
    </Box>
  );
};

export default Home;
