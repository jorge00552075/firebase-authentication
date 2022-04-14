import React, { useContext } from "react";

import AuthContext from "../context/auth-context";
import Header from "../components/Header";
import UpdateForm from "../components/UpdateForm.jsx";
import LoadingSpinner from "../components/LoadingSpinner";

const UpdateAccountPage = function () {
  const { documentData } = useContext(AuthContext);

  if (!documentData) return <LoadingSpinner />;
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
