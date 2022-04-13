import React, { useContext } from "react";
import Header from "../components/Header";
import UpdateForm from "../components/form/UpdateForm.jsx";
import AuthContext from "../context/auth-context";

const UpdateAccountPage = function () {
  const { documentData } = useContext(AuthContext);

  if (!documentData) {
    return <h1>LOADING...</h1>;
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
