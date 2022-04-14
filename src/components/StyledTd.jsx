import { Td } from "@chakra-ui/react";

const StyledTd = function ({ children }) {
  return (
    <Td
      fontWeight="medium"
      fontSize="sm"
      color="gray.500"
      letterSpacing="wide"
      textTransform="uppercase">
      {children}
    </Td>
  );
};

export default StyledTd;
