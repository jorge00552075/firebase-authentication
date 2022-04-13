import { useContext } from "react";
import { Link as ReachLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
  Textarea,
  VStack,
  useToast,
  Flex,
} from "@chakra-ui/react";
import AuthContext from "../../context/auth-context.jsx";
import Card from "../layout/Card.jsx";
import { updateUser, uploadPhoto } from "../../firebaseConfig";

const UpdateForm = function () {
  const { documentData } = useContext(AuthContext);
  const navigate = useNavigate();
  const toast = useToast();

  const defaultValues = {
    photoURL: documentData.photoURL,
    displayName: documentData.displayName,
    bio: documentData.bio,
    phoneNumber: documentData.phoneNumber,
    email: documentData.email,
    password: documentData.password,
  };

  const { register, handleSubmit } = useForm({ defaultValues });

  const onSubmit = async (data) => {
    await updateUser(documentData.uid, data);
    // ** add transition animation **
    navigate("/account", { replace: true });
    toast({
      status: "success",
      title: "Successfully updated account.",
      position: "top-right",
    });
  };

  const handleChange = async (event) => {
    const file = event.target.files[0];
    await uploadPhoto(documentData.uid, file);
    // ADD LOADING SPINNER !!!
  };

  return (
    <Container maxW="container.lg" mt={4}>
      <Link as={ReachLink} to={"/account"}>
        &larr; Back
      </Link>
      <Card>
        <Box>
          <Heading as="h1" fontWeight="medium" fontSize="2xl">
            Change Info
          </Heading>
          <Text
            mt={2}
            fontWeight="medium"
            fontSize="sm"
            textColor="gray.600"
            letterSpacing="wide">
            Changes will be reflected to every service
          </Text>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4} w={416} alignItems="flex-start">
            <Flex alignItems="center" gap={6}>
              <Avatar
                width={"72px"}
                height={"72px"}
                name={documentData.displayName}
                src={documentData.photoURL}
                borderRadius={8}
              />
              <FormControl>
                <FormLabel
                  htmlFor="file"
                  margin={0}
                  fontWeight="medium"
                  fontSize="sm"
                  color="gray.600"
                  letterSpacing="wide"
                  cursor="pointer"
                  _hover={{ textDecoration: "underline" }}>
                  CHOOSE IMAGE
                </FormLabel>
                <Input
                  type="file"
                  id="file"
                  name="file"
                  onChange={handleChange}
                  display="none"
                />
              </FormControl>
            </Flex>
            <FormControl>
              <FormLabel
                htmlFor="displayName"
                fontSize="sm"
                letterSpacing="wide">
                Name
              </FormLabel>
              <Input
                id="displayName"
                type="text"
                placeholder="Enter your name"
                size="lg"
                borderColor="gray.600"
                {...register("displayName")}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="bio" fontSize="sm" letterSpacing="wide">
                Bio
              </FormLabel>
              <Textarea
                id="bio"
                placeholder="Enter your bio"
                size="lg"
                borderColor="gray.600"
                {...register("bio")}
              />
            </FormControl>
            <FormControl>
              <FormLabel
                htmlFor="phoneNumber"
                fontSize="sm"
                letterSpacing="wide">
                Phone
              </FormLabel>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="Enter your phone"
                size="lg"
                borderColor="gray.600"
                {...register("phoneNumber")}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email" fontSize="sm" letterSpacing="wide">
                Email
              </FormLabel>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                size="lg"
                borderColor="gray.600"
                disabled
                {...register("email")}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password" fontSize="sm" letterSpacing="wide">
                Password
              </FormLabel>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                size="lg"
                borderColor="gray.600"
                disabled
                {...register("password")}
              />
            </FormControl>
          </VStack>
          <Button type="submit" colorScheme="blue" mt={4}>
            Save
          </Button>
        </form>
      </Card>
    </Container>
  );
};

export default UpdateForm;
