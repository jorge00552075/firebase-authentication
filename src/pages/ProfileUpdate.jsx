import React, { useContext } from "react";
import { Center, Spinner } from "@chakra-ui/react";
import AuthContext from "../context/auth-context";
import Header from "../components/Header";
import ChangeForm from "../components/form/ChangeForm.jsx";

const ProfileUpdate = function () {
  const { user } = useContext(AuthContext);

  if (!user.firestore) {
    // needed for defaultValues to be set
    return (
      <Center h="50vh">
        <Spinner thickness="4px" color="blue.500" size="xl" />
      </Center>
    );
  }
  return (
    <React.Fragment>
      <Header />
      <ChangeForm />
    </React.Fragment>
  );
};

export default ProfileUpdate;
