import { Box } from "@chakra-ui/react";

const FormWrapper = function ({ children }) {
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
      {children}
    </Box>
  );
};

export default FormWrapper;
