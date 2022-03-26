import { useContext } from "react";
import { Link as ReachLink } from "react-router-dom";
import { useForm } from "react-hook-form";
// prettier-ignore
import { Avatar, Box, Button, Container, FormControl, FormLabel, Heading, Input,Link, Text, Textarea,VStack } from '@chakra-ui/react';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import AuthContext from "../../context/auth-context.jsx";
import Card from "../layout/Card.jsx";

const ChangeForm = function () {
  const { user, updateUser } = useContext(AuthContext);

  const defaultValues = {
    photoURL: user.photoURL,
    displayName: user.displayName,
    bio: user.bio,
    phoneNumber: user.phoneNumber,
    email: user.email,
    password: user.password,
  };

  const { register, handleSubmit } = useForm({ defaultValues });

  const onSubmit = function (data) {
    updateUser(data);
  };

  const handleChange = async function (e) {
    const file = e.target.files[0];
    const firebaseStorage = getStorage();
    const storageReference = ref(
      firebaseStorage,
      `avatars/${user.uid}${Date.now()}`
    );
    await uploadBytes(storageReference, file);
    const downloadURL = await getDownloadURL(storageReference);

    updateUser({ ...user, photoURL: downloadURL });
  };

  return (
    <Container maxW="container.lg" mt={4}>
      <Link as={ReachLink} to={"/profile"}>
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
            <Avatar
              width={"72px"}
              height={"72px"}
              name={user.displayName}
              src={user.photoURL}
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
                cursor="pointer">
                Upload a new photo
              </FormLabel>
              <Input
                type="file"
                id="file"
                name="file"
                onChange={handleChange}
                display="none"
              />
              {/* IMAGE URL */}
              <Input
                type="text"
                placeholder="Or provide an image URL"
                {...register("photoURL")}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="name" fontSize="sm" letterSpacing="wide">
                Name
              </FormLabel>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                size="lg"
                borderColor="gray.600"
                {...register("name")}
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
              <FormLabel htmlFor="phone" fontSize="sm" letterSpacing="wide">
                Phone
              </FormLabel>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone"
                size="lg"
                borderColor="gray.600"
                {...register("phone")}
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

export default ChangeForm;
