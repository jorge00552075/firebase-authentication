import React, { useContext } from "react";
import { Center, Spinner } from "@chakra-ui/react";

import AuthContext from "../context/auth-context";
import Header from "../components/Header";
import ChangeForm from "../components/form/ChangeForm.jsx";

const ProfileUpdate = function () {
  const { user } = useContext(AuthContext);

  if (user.providerId === "firebase") {
    console.log("providerId: ", user.providerId);
    // originally set to the value "user" from onAuthStateChanged
    // but re-assigned to data from database
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
