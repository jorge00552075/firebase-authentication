import { Center, Heading, Text, Link } from "@chakra-ui/react";
import { Link as ReachLink } from "react-router-dom";

const NotFound = function () {
  return (
    <Center
      flexDirection="column"
      h="100vh"
      bgColor="blue.500"
      textColor="white"
      gap={1}
    >
      <Heading as="h1" fontSize="128px" lineHeight="1">
        404
      </Heading>
      <Text fontSize="xl" fontWeight="medium">
        We couldn't find that page!
      </Text>

      <Link as={ReachLink} to="/signup" fontSize="xl" fontWeight="medium">
        &larr; Home
      </Link>
    </Center>
  );
};

export default NotFound;
