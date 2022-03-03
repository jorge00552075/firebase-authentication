import { StackDivider, VStack } from "@chakra-ui/react";

const Card = function ({ children }) {
  return (
    <VStack
      as="main"
      w={845}
      m="32px auto 0"
      p={8}
      border="1px"
      borderColor="gray.200"
      borderRadius={12}
      alignItems="stretch"
      divider={<StackDivider mt={12} borderColor="gray.200" />}
      spacing={5}
    >
      {children}
    </VStack>
  );
};

export default Card;
