import { Container, Heading, Text, VStack } from "@chakra-ui/react";
import Card from "../components/Card";

const ChangeInfo = function () {
  return (
    <Container maxW="container.lg" mt={4}>
      <Card divider>
        <Heading as="h1" fontSize="2xl">
          Change Info
        </Heading>
        <Text fontWeight="medium" fontSize="sm" letterSpacing="wide">
          Changes will be reflected to every service
        </Text>
      </Card>
    </Container>
  );
};

export default ChangeInfo;
