import React, { useContext, useRef, useState } from 'react';
// prettier-ignore
import { Button, Flex, FormControl, FormLabel, Heading, Input, Text } from "@chakra-ui/react";
import FormWrapper from '../layout/FormWrapper.jsx';
import AuthContext from '../../context/auth-context.jsx';
import { Google, Facebook, Twitter, Github, Logo } from '../../assets/index';

const AuthForm = function () {
  const [signup, setSignup] = useState(true);
  const authContext = useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async function (e) {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (signup) {
      authContext.signUp(email, password);
    } else {
      authContext.login(email, password);
    }
  };

  return (
    <FormWrapper>
      <Logo />
      <Heading as="h1" mt={6} fontWeight={600} fontSize="lg" lineHeight="7">
        {signup ? 'Join thousands of learners from around the world.' : 'Login'}
      </Heading>
      <Text mt={2}>
        {signup &&
          'Master web development by making real-life projects. There are multiple for you to choose.'}
      </Text>
      <form onSubmit={handleSubmit} style={{ marginTop: '24px' }}>
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
          {signup ? 'Start coding now' : 'Login'}
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
        {signup ? 'Already a member ' : "Don't have an account yet "}
        <Button
          colorScheme="blue"
          size="sm"
          variant="link"
          onClick={() => setSignup((val) => !val)}
        >
          {signup ? 'Login' : 'Register'}
        </Button>
      </Text>
    </FormWrapper>
  );
};

export default AuthForm;
