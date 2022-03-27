import React, { useContext } from "react";
import { Center, Spinner } from "@chakra-ui/react";
import AuthContext from "../context/auth-context";
import Header from "../components/Header";
import UpdateForm from "../components/form/UpdateForm.jsx";

const UpdateAccountPage = function () {
  const { user } = useContext(AuthContext);

  // needed for defaultValues to be set
  if (!user.firestore) {
    return (
      <Center h="50vh">
        <Spinner thickness="4px" color="blue.500" size="xl" />
      </Center>
    );
  }

  return (
    <>
      <Header />
      <main>
        <UpdateForm />
      </main>
    </>
  );
};

export default UpdateAccountPage;
