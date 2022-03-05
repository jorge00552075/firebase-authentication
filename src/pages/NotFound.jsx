import { Container, Heading, Text, Link } from "@chakra-ui/react";
import { Link as ReachLink } from "react-router-dom";

const NotFound = function () {
  return (
    <Container textAlign="center">
      <Heading as="h1" size="4xl" mt={112}>
        404
      </Heading>
      <Text mt={4} fontSize="xl">
        Oops! This page does not exist. 😅
      </Text>

      <Link as={ReachLink} to="/" display="inline-block" mt={4} fontSize="xl">
        &larr; Home
      </Link>
    </Container>
  );
};

export default NotFound;
