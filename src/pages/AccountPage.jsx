import React from "react";
import Header from "../components/Header.jsx";
import UserAccountInfo from "../components/UserAccountInfo.jsx";

const AccountPage = function () {
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
