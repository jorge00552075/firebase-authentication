import { Container, Heading, Text } from "@chakra-ui/react";

const NotFound = function () {
  return (
    <Container textAlign="center">
      <Heading as="h1" size="4xl" mt={112} textColor="blue.500">
        404
      </Heading>
      <Text mt={4} fontSize="xl" textColor="blue.400">
        😅 Oops ! This page does not exist.
      </Text>
    </Container>
  );
};

export default NotFound;
