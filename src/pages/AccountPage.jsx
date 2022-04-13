import React, { useContext } from "react";
import Header from "../components/Header.jsx";
import UserAccountInfo from "../components/UserAccountInfo.jsx";
import AuthContext from "../context/auth-context.jsx";

const AccountPage = function () {
  const { documentData } = useContext(AuthContext);

  if (!documentData) {
    return <h1>LOADING...</h1>;
  }

  return (
    <>
      <Header />
      <main>
        <UserAccountInfo />
      </main>
    </>
  );
};

export default AccountPage;
